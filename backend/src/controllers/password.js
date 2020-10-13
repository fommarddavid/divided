import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models';


const transporter =  nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});
// console.log(transporter);

const getPasswordResetURL = (username, token) => `${process.env.URL_FRONT}/password/reset/${username}/${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🌻 D/v/ded Password Reset 🌻"
  const html = `
  <p>Hey ${user.username},</p>
  <p>We heard that you lost your D/v/ded password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 15 min, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at D/v/ded</p>
  `

  return { from, to, subject, html }
}

const forgot = async(req, res) => {
  try {
    const results = validationResult(req);
    if(! results.isEmpty()){
      return res.status(400).json({
        error: true,
        messages: results.array(),
      })
    }

    const user = await User.findOne({ where: {email: req.body.email}});

    const secret = user.password + '-' + user.updatedAt;
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: 900 });
    const newToken = token.replace(/\./g, '/');
    const url = getPasswordResetURL(user.username, newToken);
    const emailTemplate = resetPasswordTemplate(user, url);

    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).json({
            error: true,
            msg: err
          })
        }
        return res.status(200).json({
          success: true,
          message: `Un mail a été envoyé à l'adresse ${info.accepted} pour réinitialiser votre mot de passe`
        });
      })
    }
    sendEmail()

  } catch (error) {
    console.log(error);
    res.status(500).json(error.name);
  }
};

const reset = async(req, res) => {
  try {
    const results = validationResult(req);
    if(! results.isEmpty()){
      res.status(400).json({
        error: true,
        messages: results.array()
      })
    }

    const user = await User.findOne({ where: {username: req.body.username } });
    
    const secret = user.password + '-' + user.updatedAt;
    const payload = jwt.verify(req.body.token, secret, async (err, decoded) => {
      if(err) {
        console.log('NOK: ', err.message);
        res.status(400).json({
          error: true,
          messages:[{
            value: uuidv4(),
            msg: err.message,
            param: err.name,
            location: err.name,
          }]
        });
      } else {
        console.log(decoded);
        if (decoded.username === user.username) {
          user.password = await argon2.hash(req.body.password);
          await user.save();
          res.status(200).json({
            success: true,
            message: 'Votre mot de passe a été modifié'
          });
        }
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error.name);
  }
}

export default {
  forgot,
  reset,
};
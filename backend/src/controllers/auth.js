import 'dotenv/config';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { User } from '../models';

const register = async(req, res) => {
  try{
    const results = validationResult(req);
    // console.log('results: ', JSON.stringify(results));

    if(results.isEmpty()) {
      const hashedPassword = await argon2.hash(req.body.password);
      const newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
      });
      return res.status(200). json({
        message: 'User created',
        email: req.body.email,
        username: req.body.username
      });
    } else {
      return res.status(400).json({
        error: true,
        messages: results.array()
      });
    }
  } catch(error) {
    res.status(500).json(error.name);
  }
};

const login = async(req, res) => {
  try {
    const results = validationResult(req);

    if(results.isEmpty()) {
      const user = await User.findOne({
        where: { email: req.body.email }
      });
      if(! await argon2.verify(user.password, req.body.password)){
        return res.status(400).json({
          error: true,
          messages: [{
            value: req.body.email,
            msg: "Mauvais mot de passe",
            param: "password",
            location: "body"
          }],
        });
      } else {
        const token = jwt.sign({
          id: user.id,
          email: user.email,
          username: user.username
        },process.env.SECRET, { expiresIn: '3h' });
        return res.status(200).json({
          user: {
            email: user.email,
            username: user.username,
          },
          token: token
        });
      }
    } else {
      return res.status(400).json({
        error: true,
        messages: results.array()
      });
    }
  } catch(error) {
    res.status(500).json(error.name);
  }
};



export default {
  register,
  login,
};
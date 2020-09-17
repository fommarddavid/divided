import 'dotenv/config';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const register = async(req, res) => {
  const users = await User.findAll({
    attributes: ['email']
  });
  const user = users.find(u => u.email === req.body.email);

  if(!user){
    if(req.body.password !== req.body.confirmedPassword){
      return res.status(400).json({
        message: 'Password and confirmedPassword must be the same'
      });
    }
    if(req.body.password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long'
      });
    };
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
    return res.status(500).json({ message: 'User already exist' });
  }
};

const login = async(req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    if(!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }
    if(! await argon2.verify(user.password, req.body.password)){
      return res.status(400).json({
        message: 'Wrong password'
      });
    }
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
  } catch(error) {
    res.status(500).json(error);
  }
}

export default {
  register,
  login,
};
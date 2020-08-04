import argon2 from 'argon2';

import { User } from '../models';

const register = async(req, res) => {
  const users = await User.findAll({
    attributes: ['email']
  });
  const user = users.find(u => u.email === req.body.email);

  if(!user){

    if(req.body.password.length <= 8) {
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

export default {
  register
};
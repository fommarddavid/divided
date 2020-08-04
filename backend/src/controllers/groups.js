import jwt, { decode } from 'jsonwebtoken';

import { Group, Member } from '../models';
import middlewares from '../middlewares';

const getGroups = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);
  
  const groups = await Group.findAll({
    where: {
      userId: decoded.id
    }
  });

  res.status(200).json({
    email: decoded.email,
    username: decoded.username,
    groups: groups
  });
};

const setGroups = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);

  const newGroup = await Group.create({
    name: req.body.name,
    userId: decoded.id
  });

  return res.status(200).json({
    message: `Group ${req.body.name} added for ${decoded.username}`
  })
};

const getMembers = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);

  try{
    const group = await Group.findOne({
      where: {
        id: req.params.groupId,
        userId: decoded.id
      }
    });
  
    const members = await Member.findAll({
      where: {
        groupId: req.params.groupId,
        userId: decoded.id,
      }
    });
  
    res.json({
      groupName: group.name,
      members: members
    });
  } catch(error){
    return res.status(400).json({
      message: 'access denied'
    });
  }
}

const setMembers = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);

  const group = await Group.findOne({
    where: {
      id: req.params.groupId
    }
  });

  const members = await Member.findAll({
    where: {
      groupId: req.params.groupId,
    }
  });
  const sameName = members.find(m => m.name === req.body.name);
  if(sameName) {
    return res.status(400).json({
      message: `${req.body.name} already exists in ${group.name}`
    })
  };
  if(group.userId === decoded.id){
    const newMember = await Member.create({
      name: req.body.name,
      groupId: req.params.groupId,
      userId: decoded.id
    });

    return res.json({
      message: `${req.body.name} added to ${group.name} by ${decoded.username}`
    })
  } else {
    return res.status(400).json({
      message:'Acces denied'
    });
  };
};

export default {
  getGroups,
  setGroups,
  setMembers,
  getMembers,
}
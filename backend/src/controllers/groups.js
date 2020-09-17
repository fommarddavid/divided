import jwt, { decode } from 'jsonwebtoken';

import { Group, Member, Expense } from '../models';
import middlewares from '../middlewares';

const getGroups = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);
  
  const groups = await Group.findAll({
    attributes:['id','name'],
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

const deleteGroup = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);

  await Group.destroy({
    where: {
      id: req.params.groupId
    }
  });

  return res.status(200).json({
    message: `DELETE HTTP method on api/groups/${req.params.groupId}`,
    deletedGroupId: req.params.groupId,
  });

};

const getDetails = async(req, res) => {
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
      attributes: ['id','name'],
      where: {
        groupId: req.params.groupId,
        userId: decoded.id,
      }
    });
    // console.log(members);

    const expenses = await Expense.findAll({
      attributes: ['id','name', 'value', 'memberId'],
      where: {
        groupId: req.params.groupId,
      }
    });
    console.log(expenses);
    const getMemberName = (id) => (
      members.find((member) => (id === member.id)).name
    );

    const expensesToSend = expenses.map((expense) => ({
      ...expense,
      memberId: getMemberName(expense.memberId)
    }));

    const totalExpense = await Expense.sum('value', {
      where: {
        groupId: req.params.groupId,
      }
    });
    const perPaxExpense = totalExpense/members.length;

    res.json({
      groupName: group.name,
      members: members,
      expenses: expensesToSend,
      totalExpense: totalExpense,
      perPaxExpense: perPaxExpense,
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

  const name = req.body.name;
  if(name === '') {
    return res.status(400).json({
      message: 'Empty field for new member name'
    })
  };
  
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

const setExpenses = async(req, res) => {
  const token = middlewares.auth.getTokenFromHeader(req);
  const decoded = jwt.decode(token);

  const newExpenseName = req.body.newExpenseName;
  const newExpenseValue = req.body.newExpenseValue;
  const memberId = req.body.memberId;

  if(newExpenseName === '' || newExpenseValue === '') {
    return res.status(400).json({
      message: 'Error : newExpenseName or newExpenseValue is empty'
    });
  }

  const group = await Group.findOne({
    where: {
      id: req.params.groupId
    }
  });

  const newExpense = await Expense.create({
    name: newExpenseName,
    value: newExpenseValue,
    groupId: req.params.groupId,
    memberId: memberId,
  });

  return res.status(200).json({
    message: `Expense ${newExpenseName} added for the group ${group.name}`
  })
};

export default {
  getGroups,
  setGroups,
  deleteGroup,
  setMembers,
  getDetails,
  setExpenses,
}
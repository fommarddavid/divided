import jwt, { decode } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

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
  // console.log(JSON.stringify(groups));

  res.status(200).json({
    email: decoded.email,
    username: decoded.username,
    groups: groups
  });
};

const setGroups = async(req, res) => {
  try{
    const token = middlewares.auth.getTokenFromHeader(req);
    const decoded = jwt.decode(token);

    const results = validationResult(req);
    // console.log('results: ', results);
    
    if(results.isEmpty()){
      const newGroup = await Group.create({
        name: req.body.name,
        userId: decoded.id
      });
      return res.status(200).json({
        success: true, 
        messages: `Le group ${req.body.name} a été créé par ${decoded.username}`
      })
    } else {
      res.status(400).json({
        error: true,
        messages: results.array()
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json(error.name);
  }
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

  const group = await Group.findOne({
    where: {
      id: req.params.groupId,
      userId: decoded.id
    },
    include: [
      {
        model: Member,
        attributes: ['id','name'],
      },
      {
        model: Expense,
        attributes: ['id','name', 'value', 'memberId'],
      }
    ]
  });
  // console.log('Group : ', JSON.stringify(group));

  const getMemberName = (id) => (
    group.Members.find((member) => (id === member.id)).name
  );

  const expensesToSend = group.Expenses.map((expense) => ({
    ...expense,
    memberId: getMemberName(expense.memberId)
  }));

  const totalExpense = await Expense.sum('value', {
    where: {
      groupId: req.params.groupId,
    }
  });

  const perPaxExpense = totalExpense/group.Members.length;
  // console.log('perPaxExpense: ', perPaxExpense);

  const members = group.Members;
  const balances = await Promise.all(members.map(async(member) => {
    return {
      memberId: member.id,
      memberName: getMemberName(member.id),
      memberExpense: await Expense.sum('value', { where: { memberId: member.id } }),
      balance: await Expense.sum('value', { where: { memberId: member.id } }) - perPaxExpense,
    }
  }));
  // console.log('balances: ', balances);
  // console.log('reduce : ', balances.reduce((a, b) => (a + b, 0)));

  const getDebts = (balances) => {
    const negBalances = balances.filter((member) => (member.balance < 0)).sort((a, b) => (a.balance - b.balance));
    // console.log('negBalances: ', negBalances);
    const posBalances = balances.filter((member) => (member.balance >= 0)).sort((a, b) => (a.balance - b.balance));
    // console.log('posBalances: ', posBalances);

    if(posBalances.length === 1) {
      const [lender] = posBalances;
      return negBalances.map((m) => ({
        id: uuidv4(),
        borrower: m.memberName,
        value: Math.abs(m.balance),
        lender: lender.memberName
      }))
    }
    if(negBalances.length === 1) {
      const [borrower] = negBalances;
      return posBalances.map((m) => ({
        id: uuidv4(),
        borrower: borrower.memberName,
        value: m.balance,
        lender: m.memberName
      }))
    }
    if(negBalances.length > 1 && posBalances.length > 1) {
      const debts = [];
      let i = 0;
      while(posBalances.length !== 1) {
        // console.log('i: ', i);
        const min = Math.min(Math.abs(negBalances[0].balance), posBalances[0].balance);
        // console.log('min: ', min);
        debts[i] = {
          id: uuidv4(),
          borrower: negBalances[0].memberName,
          value: min,
          lender: posBalances[0].memberName,
        };
        // console.log('debts: ', debts);
        if( min === posBalances[0].balance) {
          negBalances[0] = {
            memberId: negBalances[0].memberId,
            memberName: negBalances[0].memberName,
            memberExpense: negBalances[0].memberExpense + min,
            balance: negBalances[0].balance + min
          };
          posBalances.splice(0, 1);
        } else {
          negBalances.splice(0, 1);
          posBalances[0] = {
            memberId: posBalances[0].memberId,
            memberName: posBalances[0].memberName,
            memberExpense: posBalances[0].memberExpense - min,
            balance: posBalances[0].balance - min
          };
        }
        
        // console.log('negBalances: ', negBalances);
        // console.log('posBalances: ', posBalances);
        i++;
      }

      const [lastLender] = posBalances;
      for(let i = 0; i < negBalances.length; i++ ) {
        debts.push({
          id: uuidv4(),
          borrower: negBalances[i].memberName,
          value: Math.abs(negBalances[i].balance),
          lender: lastLender.memberName,
        })
      }
      // console.log(debts);
      for (const index in debts) {
        if(debts[index].value === 0) {
          debts.splice(index, 1);
        }
      }
      return debts;
    }
  }
  const debts = getDebts(balances);
  //console.log('debts: ', debts);

  res.json({
    groupName: group.name,
    members: group.Members,
    expenses: expensesToSend,
    totalExpense: totalExpense,
    perPaxExpense: perPaxExpense,
    balances: balances,
    debts: (debts === undefined) ? [] : debts,
  });
}

const setMembers = async(req, res) => {
  try{
    const token = middlewares.auth.getTokenFromHeader(req);
    const decoded = jwt.decode(token);

    const results = validationResult(req);
    // console.log('results: ', results);

    if(results.isEmpty()) {
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

      if(group.userId === decoded.id){
        const newMember = await Member.create({
          name: req.body.name,
          groupId: req.params.groupId,
          userId: decoded.id
        });
        return res.json({
          succes: true,
          messages: `${req.body.name} a été ajouté au groupe ${group.name} par ${decoded.username}`
        })
      } else {
        return res.status(400).json({
          error: true,
          messages:[{
            value: decoded.id,
            msg: 'Accès non autorisé',
            param: 'userId',
            location: 'params'
          }]
        });
      };
    } else {
      return res.status(400).json({
        error: true,
        messages: results.array()
      });
    }
  } catch(error){
    // console.log(error);
    res.status(500).json(error.name);
  }
};

const setExpenses = async(req, res) => {
  try {
    const token = middlewares.auth.getTokenFromHeader(req);
    const decoded = jwt.decode(token);
  
    const results = validationResult(req);
    // console.log('results: ', results);
  
    const newExpenseName = req.body.newExpenseName;
    const newExpenseValue = req.body.newExpenseValue;
    const memberId = req.body.memberId;
  
    if(! results.isEmpty()){
      return res.status(400).json({
        error: true,
        messages: results.array()
      });
    }
  
    const group = await Group.findOne({
      where: {
        id: req.params.groupId
      },
      include: [
        {
          model: Member,
          attributes: ['id','name'],
        }
      ]
    });
  
    const newExpense = await Expense.create({
      name: newExpenseName,
      value: newExpenseValue,
      groupId: req.params.groupId,
      memberId: memberId,
    });
  
    return res.status(200).json({
      success: true,
      messages: `Expense ${newExpenseName} added for the group ${group.name}`
    })
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  getGroups,
  setGroups,
  deleteGroup,
  setMembers,
  getDetails,
  setExpenses,
}
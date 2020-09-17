import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { PlusCircle } from 'react-feather';

import TrashedModal from '../../containers/TrashedModal';
import GroupDetailsStyle from './GroupDetailsStyle';

const GroupDetails = ({
  selectedGroupId,
  saveSelectedId,
  loadGroupDetails,
  groupIsDeleted,
  setGroupIsDeleted,
  newMemberIsAdded,
  setNewMemberIsAdded,
  groupName,
  members,
  expenses,
  totalExpense,
  perPaxExpense,
  getGroupDetails,
}) => {
  useEffect(() => {
    saveSelectedId(selectedGroupId);
    loadGroupDetails();
    if (groupIsDeleted) {
      setGroupIsDeleted(true);
    }
    if (newMemberIsAdded) {
      setNewMemberIsAdded(true);
    }
  }, []);

  const handleClick = () => {
    getGroupDetails('', [], [], 0, 0);
  };

  const getMemberExpenses = (id) => (
    expenses.filter((expense) => (expense.dataValues.memberId === id))
  );

  const getSumMemberExpenses = (id) => (
    getMemberExpenses(id).reduce((a, b) => a + b.dataValues.value, 0)
  );
  console.log('getSumMemberExpenses(5): ', getSumMemberExpenses(5));
  console.log('getSumMemberExpenses(6): ', getSumMemberExpenses(6));
  console.log('getSumMemberExpenses(7): ', getSumMemberExpenses(7));
  console.log('getSumMemberExpenses(8): ', getSumMemberExpenses(8));
  const getMemberBalance = (id) => (
    (getSumMemberExpenses(id) - perPaxExpense).toFixed(2)
  );

  const newMembers = members.map((member) => ({
    ...member,
    balance: getMemberBalance(member.id),
  })).sort((a, b) => (a.balance - b.balance));

  console.log(newMembers);

  const negBalanceMembers = newMembers.filter((member) => (member.balance <= 0));
  console.log('negBalanceMembers: ', negBalanceMembers);
  const posBalanceMembers = newMembers.filter((member) => (member.balance > 0));
  console.log('posBalanceMembers: ', posBalanceMembers);
  const sum = posBalanceMembers.reduce((a, b) => a + Number(b.balance), 0);
  console.log(sum);

  return (
    <GroupDetailsStyle>
      <div className="group-card">
        <div className="group-title">
          <h1 className="groupName">{groupName}</h1>
          {groupIsDeleted ? <Redirect to="/dashboard" /> : <TrashedModal />}
        </div>
        <div className="group-member">
          <h1 className="group-member-title">
            <div>Membres</div>
            <div>Balances</div>
          </h1>
          <ul className="group-member-list">
            {members.map((member) => (
              <li key={member.id} className="group-member-list-item">
                <div className="group-member-list-item-name">
                  {member.name}
                </div>
                <div className="group-member-list-item-balance">
                  {getMemberBalance(member.id)}
                </div>
              </li>
            ))}
          </ul>
          <div className="group-member-add">
            <Link to={`/${selectedGroupId}/members/add`}>
              <PlusCircle color="#fe9801" size={18} />
            </Link>
          </div>
        </div>
        <div className="group-expense">
          <h1 className="group-expense-title">Dépenses</h1>
          <ul className="group-expense-list">
            {expenses.map((expense) => (
              <li key={expense.dataValues.id} className="group-expense-list-item">
                <div className="group-expense-list-itemNameValue">
                  <div className="group-expense-list-itemNameValue-name">{expense.dataValues.name}
                  </div>
                  <div className="group-expense-list-itemNameValue-value">{expense.dataValues.value} €</div>
                </div>
                <div className="group-expense-list-itemPayer">
                  payé par {expense.memberId}
                </div>
              </li>
            ))}
          </ul>
          <div className="group-expense-resume">
            <h1 className="group-expense-title">Total Dépense</h1>
            <div>{Number(totalExpense).toFixed(2)}€</div>
          </div>
          <div className="group-expense-resume">
            <h1 className="group-expense-title">Total par personne</h1>
            <div>{Number(perPaxExpense).toFixed(2)}€</div>
          </div>
          <div className="group-expense-add">
            <Link to={`/${selectedGroupId}/expense/add`}>
              <PlusCircle color="#fe9801" size={18} />
            </Link>
          </div>
        </div>
        <div className="group-debt">
          <h1 className="group-debt-title">Dettes</h1>
          <ul className="group-debt-details">
            {negBalanceMembers.length === 1 && (
              posBalanceMembers.map((member) => (
                <li key={member.id}>
                  {negBalanceMembers[0].name} doit {member.balance} € à {member.name}
                </li>
              ))
            )}
            {posBalanceMembers.length === 1 && (
              negBalanceMembers.map((member) => (
                <li key={member.id}>
                  {member.name} doit {member.balance} € à {posBalanceMembers[0].name}
                </li>
              ))
            )}
            {(negBalanceMembers.length > 1 && posBalanceMembers.length > 1) && (
              negBalanceMembers.map((negMember) => {
                let paidDebt = 0;
                const [first] = posBalanceMembers;
                return (
                  posBalanceMembers.map((posMember) => {
                    if (paidDebt + Number(posMember.balance) - negMember.balance < perPaxExpense) {
                      paidDebt = Number(posMember.balance);
                    }
                    else {
                      paidDebt = (perPaxExpense - getSumMemberExpenses(negMember.id) - first.balance).toFixed(2);
                    }
                    return (
                      <li>{negMember.name} doit {paidDebt}€ à {posMember.name}</li>
                    );
                  })
                );
              })
            )}
          </ul>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/dashboard" onClick={handleClick}>
          back to dashboard
        </Link>
      </div>
    </GroupDetailsStyle>
  );
};

GroupDetails.propTypes = {
  selectedGroupId: PropTypes.number.isRequired,
  saveSelectedId: PropTypes.func.isRequired,
  loadGroupDetails: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
  groupIsDeleted: PropTypes.bool.isRequired,
  setGroupIsDeleted: PropTypes.func.isRequired,
  newMemberIsAdded: PropTypes.bool.isRequired,
  setNewMemberIsAdded: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  getGroupDetails: PropTypes.func.isRequired,
  totalExpense: PropTypes.number.isRequired,
  perPaxExpense: PropTypes.number.isRequired,
};

export default GroupDetails;

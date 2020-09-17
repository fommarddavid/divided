import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import MemberAdd from '../components/MemberAdd';

// Action Creators
import { changeValue, addNewMember } from '../actions/groups';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  newMemberName: state.groups.newMemberName,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  addNewMember: () => {
    dispatch(addNewMember());
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const MemberAddContainer = connect(mapStateToProps, mapDispatchToProps)(MemberAdd);

export default MemberAddContainer;

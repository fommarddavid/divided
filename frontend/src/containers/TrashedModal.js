import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import TrashedModal from '../components/TrashedModal';

// Action Creators
import { deleteGroup } from '../actions/groups';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  groupName: state.groups.groupName,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  deleteGroup: () => {
    dispatch(deleteGroup());
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const TrashedModalContainer = connect(mapStateToProps, mapDispatchToProps)(TrashedModal);

export default TrashedModalContainer;

import React, { useState } from 'react';
import Modal from 'styled-react-modal';
import { Trash2 } from 'react-feather';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

const StyledModal = Modal.styled`
  width: 80%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.border};

  .modal-title {
    font-family: ${theme.font.title};
    font-size: 1em;
    color : ${theme.color.active};
  }

  .modal-buttons {
    button {
      margin: 1em;
      padding: 0.5em;
      font-family: ${theme.font.section};
      border: none;

      &:hover {
        background-color: ${theme.color.active};
        color: ${theme.color.font};
      }
    }
  }
`;

const TrashedModal = ({ groupName, deleteGroup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    deleteGroup();
  };

  return (
    <div>
      <Trash2 onClick={toggleModal} size={18} />
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <div className="modal-title">
          <h1>Supprimer {groupName} </h1>
        </div>
        <div className="modal-buttons">
          <button type="button" onClick={handleClick}>Supprimer</button>
          <button type="button" onClick={toggleModal}>Annuler</button>
        </div>
      </StyledModal>
    </div>
  );
};

TrashedModal.propTypes = {
  groupName: PropTypes.string.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

export default TrashedModal;

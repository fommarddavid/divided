import React, { useState } from 'react';
import Modal from 'styled-react-modal';
import { Trash2 } from 'react-feather';
import PropTypes from 'prop-types';

const StyledModal = Modal.styled`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .modal-title {
    font-family: 'Sunflower', sans-serif;
    font-size: 1em;
    color : #fe9801;
  }

  .modal-buttons {
    button {
      margin: 1em;
      padding: 0.5em;
      font-family: 'Sunflower', sans-serif;
      border: none;

      &:hover {
        background-color: #fe9801;
        color: #fff;
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

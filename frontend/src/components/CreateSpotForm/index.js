import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm'

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className = "becomeHostButton" onClick={() => setShowModal(true)}>Become a host</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm closeProp = {closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
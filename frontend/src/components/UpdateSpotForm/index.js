import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateSpotForm from './UpdateSpotForm'

function UpdateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className = 'updateSpotButton' onClick={() => setShowModal(true)}>Update Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpotForm closeProp = {closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotFormModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateReviewForm from './UpdateReviewForm'

function UpdateReviewFormModal({currReview}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className = 'deleteReviewButton' onClick={() => setShowModal(true)}>Update Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm closeProp = {closeModal} currReview = {currReview}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewFormModal;
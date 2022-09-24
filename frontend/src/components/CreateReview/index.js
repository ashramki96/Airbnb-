import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
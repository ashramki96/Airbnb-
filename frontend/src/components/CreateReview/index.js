import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  // return (
  //   <>
  //     <button onClick={() => setShowModal(true)}>Create a Review</button>
  //     {showModal && (
  //       <Modal onClose={() => setShowModal(false)}>
  //         <CreateReview />
  //       </Modal>
  //     )}
  //   </>
  // );

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <CreateReview closeProp = {closeModal}/>
        </Modal >
      )}
    </>
  );
}

export default CreateReviewModal;
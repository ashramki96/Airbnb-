import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateBookingForm from './UpdateBookingForm'

function UpdateBookingFormModal({currBooking}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className = 'deleteBookingButton' onClick={() => setShowModal(true)}>Update Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBookingForm closeProp = {closeModal} currBooking = {currBooking}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingFormModal;
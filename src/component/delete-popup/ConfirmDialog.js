import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const ConfirmDialog = ({ open, onClose, onConfirm, message }) => {
  const handleConfirm = () => {
    onConfirm();
    toast.success('Task deleted successfully!', {
      style: { backgroundColor: 'green', color: 'white' },
    });
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Cancel Task</Modal.Title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        >
          <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0-83-31.5-156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="no-btn" onClick={onClose}>
          No
        </Button>
        <Button className="task-btn" onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;

'use client';

import AddPotForm from './AddPotForm';
import Button from './Button';
import Modal from './Modal';

export default function AddPot() {
  return (
    <Modal>
      <Modal.Open opens="add-pot">
        <div>
          <Button>+ Add New Pot</Button>
        </div>
      </Modal.Open>

      <Modal.Window name="add-pot">
        <AddPotForm />
      </Modal.Window>
    </Modal>
  );
}

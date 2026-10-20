'use client';

import Button from '../Button';
import Modal from '../Modal';
import AddPotForm from './AddPotForm';

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

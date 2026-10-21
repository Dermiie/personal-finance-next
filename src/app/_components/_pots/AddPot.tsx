'use client';

import Button from '../Button';
import Modal, { ModalOpen, ModalWindow } from '../Modal';
import AddPotForm from './AddPotForm';

export default function AddPot() {
  return (
    <Modal>
      <ModalOpen opens="add-pot">
        <div>
          <Button>+ Add New Pot</Button>
        </div>
      </ModalOpen>

      <ModalWindow name="add-pot">
        <AddPotForm />
      </ModalWindow>
    </Modal>
  );
}

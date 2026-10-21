'use client';

import Button from '../Button';
import Modal, { ModalOpen, ModalWindow } from '../Modal';
import AddBudgetForm from './AddBudgetForm';

export default function AddBudget() {
  return (
    <Modal>
      <ModalOpen opens="add-budget">
        <div>
          <Button>+ Add New Budget</Button>
        </div>
      </ModalOpen>

      <ModalWindow name="add-budget">
        <AddBudgetForm />
      </ModalWindow>
    </Modal>
  );
}

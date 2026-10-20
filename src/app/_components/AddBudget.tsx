'use client';

import AddBudgetForm from './AddBudgetForm';
import Button from './Button';
import Modal from './Modal';

export default function AddBudget() {
  return (
    <Modal>
      <Modal.Open opens="add-budget">
        <div>
          <Button>+ Add New Budget</Button>
        </div>
      </Modal.Open>

      <Modal.Window name="add-budget">
        <AddBudgetForm />
      </Modal.Window>
    </Modal>
  );
}

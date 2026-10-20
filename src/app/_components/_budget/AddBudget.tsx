'use client';

import Button from '../Button';
import Modal from '../Modal';
import AddBudgetForm from './AddBudgetForm';

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

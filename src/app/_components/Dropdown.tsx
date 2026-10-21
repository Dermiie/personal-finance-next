'use client';

import DeleteModal from './DeleteModal';
import Modal, { ModalOpen, ModalWindow } from './Modal';
import EditBudgetForm from './_budget/EditBudgetForm';
import EditPotForm from './_pots/EditPotForm';

interface Props {
  name: string;
  type: 'pot' | 'budget';
  isOpen: boolean;
  onClose: () => void;
}

export default function Dropdown({ name, type, isOpen, onClose }: Props) {
  return (
    <Modal>
      <div
        role="menu"
        className={`absolute text-nowrap font-normal text-preset-4 right-0 top-full z-10 mt-2 min-w-36 rounded-lg bg-white p-4 space-y-2 shadow-lg ${isOpen ? '' : 'hidden'}`}
      >
        <ModalOpen opens="edit">
          <button
            type="button"
            role="menuitem"
            onClick={onClose}
            className="block w-full border-b border-beige-100 pb-2 text-left"
          >
            Edit {name}
          </button>
        </ModalOpen>
        <ModalOpen opens="delete">
          <button
            type="button"
            role="menuitem"
            onClick={onClose}
            className="block w-full text-left text-red"
          >
            Delete {name}
          </button>
        </ModalOpen>
      </div>
      <ModalWindow name="delete">
        <DeleteModal name={name} />
      </ModalWindow>
      <ModalWindow name="edit">
        {type === 'pot' ? <EditPotForm /> : <EditBudgetForm />}
      </ModalWindow>
    </Modal>
  );
}

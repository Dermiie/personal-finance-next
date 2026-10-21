'use client';

import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useCloseModal } from '../hooks/useCloseModal';

type ModalContextType = {
  open: (name: string) => void;
  close: () => void;
  openName: string;
};

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalOpen({
  children,
  opens: modalContent,
}: {
  children: React.ReactElement<{ onClick?: () => void }>;
  opens: string;
}) {
  const modal = useContext(ModalContext);

  if (!modal) return null;

  return cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      modal.open(modalContent);
    },
  });
}

export function ModalWindow({
  children,
  name,
}: {
  children: React.ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}) {
  const modal = useContext(ModalContext);
  const ref = useCloseModal(modal ? modal.close : () => {});

  if (!modal) return null;

  const { openName, close } = modal;

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] h-screen w-full bg-grey-900/40 backdrop-blur-sm transition-all duration-500">
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-500 py-400 shadow-lg transition-all duration-500"
      >
        <button
          onClick={close}
          className="absolute right-250 top-150 translate-x-100 rounded-sm p-50 transition-all duration-200 hover:bg-grey-100"
          type="button"
        >
          <X className="h-300 w-300 text-grey-500" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

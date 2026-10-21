import Button from '../Button';

import { IPot } from '../../_types/pots';
import MenuButton from '../MenuButton';
import Modal, { ModalOpen, ModalWindow } from '../Modal';
import AddToSavingsModal from './AddToSavingsModal';
import WithdrawFromSavingsModal from './WithdrawFromSavingsModal';

interface Prop {
  pot: IPot;
}

export default function PotCard({ pot }: Prop) {
  const percent = pot.total > pot.target ? 100 : (pot.total / pot.target) * 100;

  return (
    <div className="bg-white p-5 rounded-lg relative space-y-10">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: pot.theme }}
          ></div>
          <h3 className="text-lg font-bold text-grey-900">{pot.name}</h3>
        </div>
        <MenuButton name="pot" pot={pot} />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-grey-500">Total Saved</p>
          <p className="text-grey-900 text-preset-2">${pot.total.toFixed(2)}</p>
        </div>

        <div
          role="progressbar"
          aria-label={`${pot.name} budget used`}
          aria-valuemin={0}
          aria-valuemax={pot.target}
          aria-valuenow={pot.total}
          className="h-2 rounded-lg bg-beige-100 "
        >
          <div
            className="h-full min-w-2 rounded-md transition-[width] duration-500"
            style={{
              width: `${percent}%`,
              backgroundColor: pot.theme,
            }}
          />
        </div>

        <div className="flex justify-between">
          <p className="text-grey-500">{Math.round(percent)}% of target</p>
          <p className="text-grey-500">Target of ${pot.target.toFixed(2)}</p>
        </div>
      </div>
      <div className="w-full gap-3 flex">
        <Modal>
          <ModalOpen opens="savings">
            <Button variant="secondary">+ Add Money</Button>
          </ModalOpen>
          <ModalWindow name="savings">
            <AddToSavingsModal name={pot.name} pot={pot} />
          </ModalWindow>
        </Modal>
        <Modal>
          <ModalOpen opens="withdraw">
            <Button variant="secondary">Withdraw Money</Button>
          </ModalOpen>
          <ModalWindow name="withdraw">
            <WithdrawFromSavingsModal name={pot.name} pot={pot} />
          </ModalWindow>
        </Modal>
      </div>
    </div>
  );
}

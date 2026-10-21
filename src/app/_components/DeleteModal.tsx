import React from 'react';
import Button from './Button';

interface Props {
  name: string;
  onCloseModal?: () => void;
}

export default function DeleteModal({ name, onCloseModal }: Props) {
  return (
    <div className="space-y-4 max-w-lg text-grey-900">
      <h2 className="text-preset-2">Delete {`'${name}`} ?</h2>
      <p>
        Are you sure you want to delete this {name}? This action cannot be
        reversed, and all the data inside it will be removed forever
      </p>

      <Button variant="destructive">Yes, Confirm Deletion</Button>

      <Button variant="ghost" onClick={onCloseModal}>
        No, Go Back
      </Button>
    </div>
  );
}

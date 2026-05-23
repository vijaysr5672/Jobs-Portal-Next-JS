'use client';

import Modal from './Modal';

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal onClose={onCancel}>
      <h2>{title}</h2>
      <p>{message}</p>

      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={onConfirm}
          style={{ background: 'red', color: '#fff', padding: '8px' }}
        >
          Confirm
        </button>

        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}
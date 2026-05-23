'use client';

import Modal from './Modal';

export default function ViewJobModal({
  job,
  onClose,
}: {
  job: any;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <h2>Job Details</h2>

      <p><b>Title:</b> {job.title}</p>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary:</b> {job.salary}</p>
    </Modal>
  );
}
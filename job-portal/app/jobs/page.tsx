'use client';

import { useEffect, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import AlertBanner from '@/components/AlertBanner';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();
  const [message, setMessage] =
    useState('');

  const [messageType,
    setMessageType] =
    useState<'success' | 'error'>(
      'success'
    );

  const [viewJob,
    setViewJob] =
    useState<any>(null);

  const [editJob,
    setEditJob] =
    useState<any>(null);

  const [deleteJob,
    setDeleteJob] =
    useState<any>(null);

  // LOAD JOBS
  const loadJobs = async () => {
    try {
      const res =
        await fetch('/api/jobs');

      const data =
        await res.json();

      setJobs(data);
    } catch {
      setMessage(
        'Failed to load jobs'
      );

      setMessageType(
        'error'
      );
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // DELETE JOB
  const handleDelete =
    async (id: number) => {
      try {
        const response =
          await fetch(
            `/api/jobs/${id}`,
            {
              method:
                'DELETE',
            }
          );

        const data =
          await response.json();

        if (data.success) {
          setJobs((prev) =>
            prev.filter(
              (job) =>
                job.id !== id
            )
          );

          setDeleteJob(null);

          setMessage(
            'Job deleted successfully'
          );

          setMessageType(
            'success'
          );
        }
      } catch {
        setMessage(
          'Delete failed'
        );

        setMessageType(
          'error'
        );
      }
    };

  // UPDATE JOB
  const handleEditSave =
    async () => {
      try {
        const response =
          await fetch(
            `/api/jobs/${editJob.id}`,
            {
              method:
                'PUT',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body:
                JSON.stringify(
                  editJob
                ),
            }
          );

        if (
          response.ok
        ) {
          const updated =
            await response.json();

          setJobs((prev) =>
            prev.map(
              (job) =>
                job.id ===
                  updated.id
                  ? updated
                  : job
            )
          );

          setEditJob(null);

          setMessage(
            'Job updated successfully'
          );

          setMessageType(
            'success'
          );
        }
      } catch {
        setMessage(
          'Update failed'
        );

        setMessageType(
          'error'
        );
      }
    };

  return (
    <div
      style={{
        padding: '30px',
        background:
          '#f4f7fb',
        minHeight:
          '100vh',
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom:
            '20px',
        }}
      >
        Jobs Dashboard
      </h1>

      <button
        onClick={() =>
          router.push('/add-job')
        }
        style={{
          border: 'none',
          background: '#2563eb',
          color: 'white',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Plus size={28} />
      </button>

      <AlertBanner
        message={message}
        type={messageType}
      />

      {/* JOB GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill,minmax(260px,1fr))',
          gap: '20px',
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background:
                'white',
              borderRadius:
                '16px',
              padding: '20px',
              boxShadow:
                '0 8px 20px rgba(0,0,0,0.08)',
            }}
          >
            <h3>
              {job.title}
            </h3>

            <p>
              {
                job.company
              }
            </p>

            <p>
              {
                job.location
              }
            </p>

            <p>
              ₹
              {
                job.salary
              }
            </p>

            <div
              style={{
                display:
                  'flex',
                gap: '10px',
                marginTop:
                  '15px',
              }}
            >
              <button
                onClick={() =>
                  setViewJob(
                    job
                  )
                }
                style={btnBlue}
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() =>
                  setEditJob({
                    ...job,
                  })
                }
                style={btnGreen}
              >
                <Pencil
                  size={18}
                />
              </button>

              <button
                onClick={() =>
                  setDeleteJob(
                    job
                  )
                }
                style={btnRed}
              >
                <Trash2
                  size={18}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW */}
      {viewJob && (
        <Modal
          onClose={() =>
            setViewJob(
              null
            )
          }
        >
          <h2>
            Job Details
          </h2>

          <p>
            <b>
              Title:
            </b>{' '}
            {
              viewJob.title
            }
          </p>

          <p>
            <b>
              Company:
            </b>{' '}
            {
              viewJob.company
            }
          </p>

          <p>
            <b>
              Location:
            </b>{' '}
            {
              viewJob.location
            }
          </p>

          <p>
            <b>
              Salary:
            </b>{' '}
            ₹
            {
              viewJob.salary
            }
          </p>
        </Modal>
      )}

      {/* EDIT */}
      {editJob && (
        <Modal
          onClose={() =>
            setEditJob(
              null
            )
          }
        >
          <h2>
            Edit Job
          </h2>

          <input
            style={
              inputStyle
            }
            value={
              editJob.title
            }
            onChange={(
              e
            ) =>
              setEditJob(
                {
                  ...editJob,
                  title:
                    e
                      .target
                      .value,
                }
              )
            }
          />

          <input
            style={
              inputStyle
            }
            value={
              editJob.company
            }
            onChange={(
              e
            ) =>
              setEditJob(
                {
                  ...editJob,
                  company:
                    e
                      .target
                      .value,
                }
              )
            }
          />

          <input
            style={
              inputStyle
            }
            value={
              editJob.location
            }
            onChange={(
              e
            ) =>
              setEditJob(
                {
                  ...editJob,
                  location:
                    e
                      .target
                      .value,
                }
              )
            }
          />

          <input
            style={
              inputStyle
            }
            value={
              editJob.salary
            }
            onChange={(
              e
            ) =>
              setEditJob(
                {
                  ...editJob,
                  salary:
                    e
                      .target
                      .value,
                }
              )
            }
          />

          <button
            onClick={
              handleEditSave
            }
            style={
              saveBtn
            }
          >
            Save
          </button>
        </Modal>
      )}

      {/* DELETE */}
      {deleteJob && (
        <Modal
          onClose={() =>
            setDeleteJob(
              null
            )
          }
        >
          <h2>
            Confirm
            Delete
          </h2>

          <p>
            Delete{' '}
            <b>
              {
                deleteJob.title
              }
            </b>
            ?
          </p>

          <button
            onClick={() =>
              handleDelete(
                deleteJob.id
              )
            }
            style={
              dangerBtn
            }
          >
            Delete
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: any) {
  return (
    <div
      style={
        overlay
      }
    >
      <div
        style={box}
      >
        <button
          style={
            closeBtn
          }
          onClick={
            onClose
          }
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

const overlay = {
  position:
    'fixed' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent:
    'center',
  alignItems:
    'center',
};

const box = {
  background:
    'white',
  padding: '25px',
  borderRadius:
    '14px',
  width: '400px',
  position:
    'relative' as const,
};

const closeBtn = {
  position:
    'absolute' as const,
  right: '10px',
  top: '10px',
  border: 'none',
  background:
    'transparent',
  cursor:
    'pointer' as const,
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '10px',
};

const saveBtn = {
  marginTop: '15px',
  background:
    '#2563eb',
  color: 'white',
  border: 'none',
  padding: '10px',
  width: '100%',
};

const btnBlue = {
  color: '#2563eb',
};

const btnGreen = {
  color: '#16a34a',
};

const btnRed = {
  color: '#dc2626',
};

const dangerBtn = {
  marginTop: '15px',
  background:
    '#dc2626',
  color: 'white',
  border: 'none',
  padding: '10px',
  width: '100%',
};
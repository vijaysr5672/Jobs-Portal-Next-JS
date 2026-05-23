'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertBanner from '@/components/AlertBanner';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditJobPage({ params }: Props) {

  const router = useRouter();

  const [id, setId] = useState('');

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const [errors, setErrors] = useState<any>({});

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors: any = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!company.trim()) newErrors.company = 'Company is required';
    if (!location.trim()) newErrors.location = 'Location is required';

    if (!salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (!/^\d+$/.test(salary)) {
      newErrors.salary = 'Salary must be numeric';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------- LOAD JOB ----------------
  useEffect(() => {
    async function loadJob() {
      const { id } = await params;

      setId(id);

      const response = await fetch('/api/jobs');
      const jobs = await response.json();

      const job = jobs.find(
        (j: any) => j.id === Number(id)
      );

      if (job) {
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary);
      }
    }

    loadJob();
  }, [params]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('/api/jobs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          title,
          company,
          location,
          salary,
        }),
      });

      if (response.ok) {
        setMessage('Job updated successfully');
        setMessageType('success');

        setTimeout(() => {
          router.push('/jobs');
        }, 1200);

      } else {
        setMessage('Failed to update job');
        setMessageType('error');
      }

    } catch (error) {
      setMessage('Something went wrong');
      setMessageType('error');
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="page-container">

      <div className="form-card">

        <h1 className="form-title">Edit Job</h1>
        <p className="form-subtitle">
          Update job details
        </p>

        <AlertBanner
          message={message}
          type={messageType}
        />

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {errors.title}
            </p>
          </div>

          {/* COMPANY */}
          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              className="form-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {errors.company}
            </p>
          </div>

          {/* LOCATION */}
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              className="form-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {errors.location}
            </p>
          </div>

          {/* SALARY */}
          <div className="form-group">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-input"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {errors.salary}
            </p>
          </div>

          {/* BUTTON */}
          <button className="btn-primary">
            Update Job
          </button>

        </form>

      </div>
    </div>
  );
}
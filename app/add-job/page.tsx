'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertBanner from '@/components/AlertBanner';

export default function AddJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<'success' | 'error'>('success');

  const validateForm = () => {
    const newErrors: any = {};

    if (!title.trim()) newErrors.title = 'Job Title is Required';
    if (!company.trim()) newErrors.company = 'Company Name is Required';
    if (!location.trim()) newErrors.location = 'Location is Required';
    if (!salary.trim()) newErrors.salary = 'Salary is Required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          company,
          location,
          salary,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Job Added Successfully');
        setMessageType('success');

        setTimeout(() => {
          router.push('/jobs');
        }, 1200);
      } else {
        setMessage('Failed to add job');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Something went wrong');
      setMessageType('error');
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">

        <h1 className="form-title">Add Job</h1>
        <p className="form-subtitle">Fill job details below</p>

        <AlertBanner message={message} type={messageType} />

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.title}</p>
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.company}</p>
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.location}</p>
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.salary}</p>
          </div>

          <button className="btn-primary">
            Save Job
          </button>

        </form>
      </div>
    </div>
  );
}
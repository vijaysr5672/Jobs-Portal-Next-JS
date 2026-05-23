type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getJobs() {

  const response = await fetch(
    'http://localhost:3000/api/jobs',
    {
      cache: 'no-store',
    }
  );

  return response.json();
}

export default async function JobDetails({
  params,
}: Props) {

  const { id } = await params;

  const jobs = await getJobs();

  const job = jobs.find(
    (job: any) =>
      job.id === Number(id)
  );

  if (!job) {
    return (
      <h1>
        Job Not Found
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Job Details
      </h1>

      <p>
        <strong>Title:</strong>
        {' '}
        {job.title}
      </p>

      <p>
        <strong>Company:</strong>
        {' '}
        {job.company}
      </p>

      <p>
        <strong>Location:</strong>
        {' '}
        {job.location}
      </p>

      <p>
        <strong>Salary:</strong>
        {' '}
        {job.salary}
      </p>
    </div>
  );
}
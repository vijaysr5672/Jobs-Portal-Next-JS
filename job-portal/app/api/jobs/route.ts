import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET ALL JOBS
export async function GET() {
  const jobs =
    await prisma.job.findMany();

  return NextResponse.json(
    jobs
  );
}

// CREATE JOB
export async function POST(
  req: Request
) {
  const body =
    await req.json();

  const job =
    await prisma.job.create({
      data: {
        title:
          body.title,
        company:
          body.company,
        location:
          body.location,
        salary: Number(
          body.salary
        ),
      },
    });

  return NextResponse.json(
    job
  );
}
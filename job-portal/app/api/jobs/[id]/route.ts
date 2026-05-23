import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET SINGLE JOB
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const job =
    await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
    });

  return NextResponse.json(
    job
  );
}

// UPDATE JOB
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const body =
    await request.json();

  const updatedJob =
    await prisma.job.update({
      where: {
        id: Number(id),
      },
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
    updatedJob
  );
}

// DELETE JOB
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  await prisma.job.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}
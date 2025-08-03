import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, skills } = body;

    const newIntern = await prisma.intern.create({
      data: { name, email, phone, skills },
    });

    return Response.json(newIntern, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error saving intern data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const interns = await prisma.intern.findMany();
    return Response.json(interns, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error fetching interns' }, { status: 500 });
  }
}

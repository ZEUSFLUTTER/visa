import { NextResponse } from 'next/server';
import { getCancers, createCancer } from '@/lib/db';

export async function GET() {
  try {
    const cancers = await getCancers();
    return NextResponse.json(cancers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch cancers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cancer = await createCancer({
      ...body,
      id: body.id || body.name.toLowerCase().replace(/\s+/g, '-')
    });
    return NextResponse.json(cancer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create cancer' }, { status: 500 });
  }
}

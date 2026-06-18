import { NextResponse } from 'next/server';
import { getCancerById, updateCancer, deleteCancer } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cancer = await getCancerById(id);
    if (!cancer) {
      return NextResponse.json({ error: 'Cancer not found' }, { status: 404 });
    }
    return NextResponse.json(cancer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch cancer' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cancer = await updateCancer(id, body);
    return NextResponse.json(cancer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update cancer' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteCancer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete cancer' }, { status: 500 });
  }
}

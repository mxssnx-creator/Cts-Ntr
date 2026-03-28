import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/dashboard';

export async function GET() {
  try {
    const data = await getDashboardData();
    if (!data) {
      return NextResponse.json(
        { error: 'No user data available' },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { dbService } from '@/lib/database';

export async function GET() {
  try {
    // Test database connection by querying the users table
    const result = dbService.rawDB().prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Database connection successful',
      userCount: result.count 
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 500 }
    );
  }
}
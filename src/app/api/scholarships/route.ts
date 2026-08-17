import { SCHOLARSHIPS_DB } from '@/lib/scholarships';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const category = searchParams.get('category');

    let results = SCHOLARSHIPS_DB;

    if (search) {
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.description.toLowerCase().includes(search)
      );
    }

    if (category) {
      results = results.filter((s) => s.category === category);
    }

    return NextResponse.json({
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Scholarships error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scholarships' },
      { status: 500 }
    );
  }
}

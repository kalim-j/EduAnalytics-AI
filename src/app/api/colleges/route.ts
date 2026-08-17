import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('colleges')
      .select('*')
      .order('nirf_rank', { ascending: true })
      .range(offset, offset + limit - 1);

    if (state) {
      query = query.eq('state', state);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      hasMore: count ? offset + limit < count : false,
    });
  } catch (error) {
    console.error('Colleges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}

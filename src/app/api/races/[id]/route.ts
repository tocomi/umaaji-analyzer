import { getRaceDetail } from '@/modules/netkeiba-scraper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const result = await getRaceDetail(Number(id));

  return new NextResponse(JSON.stringify(result));
}

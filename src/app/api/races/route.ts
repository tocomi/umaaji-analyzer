import { NextRequest, NextResponse } from 'next/server';
import { getRaceSummaries } from '../../modules/netkeiba-scraper';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await getRaceSummaries();

  return new NextResponse(JSON.stringify(result));
}

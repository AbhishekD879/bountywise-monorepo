import { NextResponse } from 'next/server'

export async function GET() {
   
  return NextResponse.json({
    build: '1.0.0',
    message: 'Build info',
    tagService: '/dev/api/tag/',
    bountyService: '/dev/api/bounty/'
  })
}

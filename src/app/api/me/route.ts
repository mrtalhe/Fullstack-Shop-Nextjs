// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../../server/users';


export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json(user);
}
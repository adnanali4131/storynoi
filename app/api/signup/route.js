import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';
import pool from '@/db';

export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();
  console.log({
    firstName,
    lastName,
    email,
  })
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email format' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, hashedPassword]);

  return NextResponse.json({ message: 'User created' });
}

import { NextApiRequest, NextApiResponse } from 'next';

const { neon } = require('@neondatabase/serverless');

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const sql = neon(process.env.DATABASE_URL);

  const { email } = req.body;
  if (!email) {
    return new Response('email param is required', { status: 400 });
  }

  const result = await sql`insert into divvy_early_access (person_identifier) values (${email})`;

  console.log(result);

  return res.status(200).json({ message: 'Success', statusText: result[0] });
}

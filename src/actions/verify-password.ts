'use server';

import * as z from 'zod';

const passwordSchema = z.string().min(1, { message: 'Password is required.' });

export async function verifyPassword(password: string) {
  const validatedFields = passwordSchema.safeParse(password);
  
  if (!validatedFields.success) {
    return { success: false, message: 'Invalid password format.' };
  }

  const serverPassword = process.env.CONTENT_UPDATE_PASSWORD;

  if (!serverPassword || serverPassword === "replace-with-your-secret-password") {
    return { success: false, message: 'Content update password is not configured on the server.' };
  }

  if (password === serverPassword) {
    return { success: true, message: 'Login successful.' };
  } else {
    return { success: false, message: 'Invalid password.' };
  }
}

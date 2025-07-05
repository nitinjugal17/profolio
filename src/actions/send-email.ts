'use server';

import * as z from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500),
});

export async function sendEmail(values: z.infer<typeof contactFormSchema>) {
    
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid form data.' };
  }
    
  const { name, email, message } = validatedFields.data;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL, SMTP_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM_EMAIL || !SMTP_TO_EMAIL) {
    console.error("Missing SMTP environment variables. Email will not be sent.");
    return { success: false, message: 'Server is not configured to send emails. Please contact the administrator.' };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${SMTP_FROM_EMAIL}>`,
      to: SMTP_TO_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <h1>New Message from Profolio Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return { success: true, message: "Thanks for reaching out. I'll get back to you shortly." };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Sorry, something went wrong and your message could not be sent. Please try again later.' };
  }
}

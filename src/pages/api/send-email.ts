import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Check if SMTP is configured
    if (!process.env.EMAIL_HOST || process.env.EMAIL_HOST === 'smtp.example.com') {
      console.log('----------------------------------------');
      console.log('⚠️ SMTP not configured. Simulating email send:');
      console.log(`To: ${process.env.CONTACT_EMAIL}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Message: ${message}`);
      console.log('----------------------------------------');
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(200).json({ status: 'success', message: 'Email simulated' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address must be the authenticated user
      replyTo: email, // Reply to the customer
      to: process.env.CONTACT_EMAIL,
      subject: `New contact form submission from ${name}`,
      text: message,
      html: `<p>You have a new contact form submission from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
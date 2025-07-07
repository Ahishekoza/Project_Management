// app/api/send-email/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhishekoza11@gmail.com',
        pass: 'sppk otzj sbps jtvu'
      },
      secure:true
    });

    // Email options
    const mailOptions = {
      from: `"${name}" 'abhishekoza11@gmail.com'`,
      to: email,
      replyTo: email, // So you can reply directly to the sender
      subject: `New message from ${name}`,
      text: message,
      html: `
        <div>
          <h2>New Message from ${name}</h2>
          <p>${message}</p>
          <p><strong>Sender's email:</strong> ${email}</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send email' 
      },
      { status: 500 }
    );
  }
}
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { emailTemplates } from '@/app/constants/utils';

export async function POST(req) {
  try {
    const { template, name, email, password, projectName, designerName } = await req.json();

    console.log(template,name)

    // Validate input
    if (!emailTemplates[template]) {
      return NextResponse.json(
        { success: false, error: 'Invalid Templated' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.EMAIL_PASS),
      },
      secure: true,
    });

    // Email options
    const mailOptions = {
      from: `"Project Management Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: email,
      subject: emailTemplates[template].subject(name, projectName),
      text: emailTemplates[template].text(name, email, password, projectName, designerName),
      html: emailTemplates[template].html(name, email, password, projectName, designerName),
    };

    console.log(mailOptions)
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
        error: error.message || 'Failed to send email',
      },
      { status: 500 }
    );
  }
}
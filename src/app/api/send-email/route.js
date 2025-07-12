import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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
      subject: `Welcome to Project Management Platform, ${name}!`,
      text: `
Welcome to the Project Management Platform, where you can manage and track projects with ease!

Dear ${name},

You have been registered on our platform. You can log in using the following credentials:

- Email: ${email}
- Temporary Password: ${password}

Please use the temporary password to log in. You can change your password after logging in by visiting the settings page.

Best regards,
The Project Management Platform Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #2c3e50;">Welcome to Project Management Platform!</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Dear ${name},<br><br>
            We're excited to have you on board! Our platform allows you to manage and track projects with ease. You have been successfully registered as a vendor.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            You can log in using the following credentials:
          </p>
          <ul style="font-size: 16px; line-height: 1.5;">
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Temporary Password:</strong> ${password}</li>
          </ul>
          <p style="font-size: 16px; line-height: 1.5;">
            Please use the temporary password to log in. You can change your password after logging in by visiting the <strong>Settings</strong> page.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            If you have any questions, feel free to reply to this email or contact our support team.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            Best regards,<br>
            The Project Management Platform Team
          </p>
          <hr style="border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #777;">
            This is an automated email. Please do not reply directly unless necessary.
          </p>
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
        error: error.message || 'Failed to send email',
      },
      { status: 500 }
    );
  }
}
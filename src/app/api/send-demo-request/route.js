// File: app/api/send-demo-request/route.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  // Get form data from the request body
  const formData = await request.json();

  // Create a transporter object using Gmail SMTP
  // We use environment variables to keep credentials secure
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  // Construct the email message
  const mailOptions = {
    from: `"Demo Request Form" <${process.env.GMAIL_USER}>`,
    to: process.env.MAIL_TO, // The address that receives the notification
    replyTo: formData.email, // Set the 'reply-to' to the user's email
    subject: `New Demo Request from ${formData.parentFirstName}`,
    html: `
      <h1>New Demo Request</h1>
      <p>A new form has been submitted on your website. Here are the details:</p>
      <ul>
        <li><strong>Parent's First Name:</strong> ${formData.parentFirstName}</li>
        <li><strong>Parent's Last Name:</strong> ${formData.parentLastName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Kid's Name:</strong> ${formData.kidsName}</li>
        <li><strong>Kid's Age:</strong> ${formData.kidsAge}</li>
        <li><strong>Country:</strong> ${formData.country}</li>
        <li><strong>Prior Experience:</strong> ${formData.experience}</li>
      </ul>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    // Return a success response
    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    // Return an error response
    return NextResponse.json(
      {
        error:
          "Sorry, there was an error submitting your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

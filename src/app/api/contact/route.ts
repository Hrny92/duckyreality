import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Chybí povinná pole.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // port 465 = SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_FROM}>`,
    replyTo: email,
    to: process.env.MAIL_TO,
    subject: `Nová poptávka z webu — ${name}`,
    text: [
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || '—'}`,
      '',
      `Zpráva:`,
      message,
    ].join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#D4AF37;margin-bottom:1.5rem;">Nová poptávka z webu</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:120px;">Jméno</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#D4AF37;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Telefon</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
        </table>
        <hr style="margin:1.5rem 0;border:none;border-top:1px solid #eee;" />
        <p style="color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}

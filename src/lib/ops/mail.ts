import { getPrisma } from '@/lib/db';

export async function queuePortalMail(toEmail: string, subject: string, body: string) {
  const row = await getPrisma().outboxEmail.create({
    data: { toEmail, subject, body },
  });

  try {
    const sentVia = await deliverMail(toEmail, subject, body);
    if (sentVia) {
      await getPrisma().outboxEmail.update({
        where: { id: row.id },
        data: { sentAt: new Date(), sentVia, error: null },
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Mail send failed';
    await getPrisma().outboxEmail.update({
      where: { id: row.id },
      data: { error: message.slice(0, 500) },
    });
  }
}

export function portalInviteBody(role: string, email: string, password: string) {
  return [
    `Your Fused Productions ${role} portal is ready.`,
    ``,
    `Login: ${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'}/login`,
    `Email: ${email}`,
    `Temporary password: ${password}`,
    ``,
    `Change the password after you sign in.`,
  ].join('\n');
}

function mailFrom() {
  return process.env.MAIL_FROM || process.env.SMTP_FROM || 'Fused Productions <support@fusedproductions.com>';
}

async function deliverMail(to: string, subject: string, text: string): Promise<string | null> {
  const from = mailFrom();
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });
    if (!res.ok) {
      throw new Error(`Resend ${res.status}: ${await res.text()}`);
    }
    return 'resend';
  }

  const smtpUrl = process.env.SMTP_URL;
  if (smtpUrl) {
    const nodemailer = await import('nodemailer');
    await nodemailer.createTransport(smtpUrl).sendMail({ from, to, subject, text });
    return 'smtp';
  }

  if (process.env.SMTP_HOST) {
    const nodemailer = await import('nodemailer');
    const port = Number(process.env.SMTP_PORT || 587);
    await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === '1' || port === 465,
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
      })
      .sendMail({ from, to, subject, text });
    return 'smtp';
  }

  return null;
}

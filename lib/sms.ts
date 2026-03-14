export async function sendSMS(to: string, message: string) {
  const response = await fetch("https://api.sms.to/sms/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SMS_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      message,
      to,
      sender_id: process.env.SMS_SENDER_ID || "Seguridad Social",
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `Error enviando SMS (${response.status})`
    );
  }

  return data;
}
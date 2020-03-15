import load from "process-env-loader"
load("../../server")
import { promisify } from "util"
import mailgun from "mailgun-js"
import { Worker } from "bullmq"

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!
})

const sendEmail = promisify(mg.messages().send)

const worker = new Worker("reset_password_email", async job => {
  const data = {
    from: "noreply@appizzas.com",
    to: job.data.to,
    subject: "Appizzas recuperação de senha",
    html: `Reseta ai gente fina: ${job.data.link}`
  }

  await sendEmail(data)
})

worker.on("failed", job =>
  console.error(`Failed to send email to ${job.data.to}`)
)

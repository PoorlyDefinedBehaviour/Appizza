import load from "process-env-loader"
load("../../server")
import Queue from "bull"
import mailgun from "mailgun-js"

const emailQueue = new Queue("email_password_reset")

emailQueue.process((job, done) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY!,
    domain: process.env.MAILGUN_DOMAIN!
  })

  const data = {
    from: "noreply@appizzas.com",
    to: job.data.to,
    subject: "Appizzas recuperação de senha",
    html: `Reseta ai gente fina: ${job.data.link}`
  }

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(`Failed to send email to ${job.data.to}`)
      console.error(error)
    } else {
      console.log(body)
    }
    done()
  })
})

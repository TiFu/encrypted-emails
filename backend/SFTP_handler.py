import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class MailSender():
    def send_email(self, content, subject, recipients, sender, hostname, user, password, port=587):
        smtp_connection = smtplib.SMTP(host=hostname, port=port)
        smtp_connection.starttls()
        smtp_connection.login(user, password)

        status = ""

        for email in recipients:
            msg = MIMEMultipart()

            msg["From"] = sender
            msg["To"] = email
            msg["Subject"] = subject

            #TODO: CHECK IF USER HAS PUB KEY
            #TODO: ENCRYPT MESSAGE
            msg.attach(MIMEText(content, "plain"))
            try:
                smtp_connection.send_message(msg)
                status = "success"
            except:
                status = "Failed to send email to: " + str(email)

            del msg

        smtp_connection.quit()

        return status

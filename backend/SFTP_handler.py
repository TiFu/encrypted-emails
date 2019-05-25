import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from firebase_handler import dbQuerier
from gpg_handler import encryptString


class MailSender():
    def send_email(self, content, subject, recipients, sender, hostname, user, password, port=587):
        smtp_connection = smtplib.SMTP(host=hostname, port=port)
        smtp_connection.starttls()
        smtp_connection.login(user, password)

        _content=content
        d = dbQuerier()

        status = ""
        recipients = recipients[1:-1].split(",")

        for email in recipients:
            msg = MIMEMultipart()

            msg["From"] = sender
            msg["To"] = email
            msg["Subject"] = subject

            #print(d.userExists(email))
            if(d.userExists(email)):
                _content = encryptString(_content, d.get_public_key(email))

            msg.attach(MIMEText(str(_content), "plain"))
            try:
                smtp_connection.send_message(msg)
                status = "success"
            except:
                status = "Failed to send email to: " + str(email)

            del msg

        smtp_connection.quit()

        return status

import email
import imaplib
import mailparser
from gpg_handler import decryptString
import re

class MailBox():

    def __init__(self, hostname, user, password, port=993):
        self.MAX_MAIL = 20

        self.connection = imaplib.IMAP4_SSL(hostname, port=port)
        self.connection.login(user, password)
        self.password=password
        self.port=port
        self.user=user
        self.hostname=hostname

        # create list of mailboxes
        self.mailboxes = []
        self.detect_mailboxes()

    def detect_mailboxes(self):
        self.mailboxes = []
        for i in self.connection.list()[1]:
            l = re.compile(" \".\" ").split(i.decode())

            print(l)
            if not "Calendar" in i.decode() and not "Noselect" in i.decode():
                self.mailboxes.append(l[-1])

    def get_n_emails(self, mailbox):
        _, byteno = self.connection.select(mailbox, readonly=True)
        (retcode, messages) = self.connection.search(None, 'ALL')
        print(messages)
        return int(byteno[0].decode())

    def is_read(self, email_id):
        unseen_list = self.connection.search(
            None, 'UNSEEN')[1][0].decode().split()
        if email_id in unseen_list:
            return False
        else:
            return True

    def refresh_mailbox(self, mailbox):
        emails = []
        self.connection.select(mailbox, readonly=True)
        self.connection.search(None, 'ALL')
        # print(self.get_n_emails(mailbox))
        for i in range(1, self.get_n_emails(mailbox) + 1):
            _, msg_data = self.connection.fetch(str(i), "RFC822")
            mail = mailparser.parse_from_bytes(msg_data[0][1])
            encrypted = False
            if (len(mail.text_plain) > 0) and "BEGIN PGP MESSAGE" in mail.text_plain[0]:
                encrypted = True
            emails.append({"id": str(i),
                           "date": str(mail.date),
                           "delivered_to": mail.delivered_to,
                           "from": mail.from_,
                           "subject": mail.subject,
                           "to": mail.to,
                           "timezone": mail.timezone,
                           "read": self.is_read(str(i)),
                           "encrypted:": encrypted})
        from pprint import pprint
        pprint(emails)
        return emails

    def refresh_all(self):
        self.connection.logout()
        self.connection = imaplib.IMAP4_SSL(self.hostname, port=self.port)
        self.connection.login(self.user, self.password)
        self.detect_mailboxes()
        mail_preview_list = {}
        print(self.mailboxes)

        for m in self.mailboxes:
            print("Refreshing " + str(m))
            mail_preview_list[m] = self.refresh_mailbox(m)
        return mail_preview_list

    def get_payload(self, mail: mailparser.MailParser):
        if(len(mail.text_html) != 0):
            return mail.text_html[0]
        #print("RECEIVED MESSAGE TEXT " + str(mail.text_plain[0]))
        #print("Password: " + str(self.password))
        if "BEGIN PGP MESSAGE" in mail.text_plain[0]:
            return str(decryptString(mail.text_plain[0], self.password))
        return mail.text_plain[0]

    def get_mail(self, id, mailbox):
        self.connection.select(mailbox)
        _, msg_data = self.connection.fetch(id, "RFC822")
        mail = mailparser.parse_from_bytes(msg_data[0][1])
        return self.get_payload(mail)

    def __del__(self):
        self.connection.logout()

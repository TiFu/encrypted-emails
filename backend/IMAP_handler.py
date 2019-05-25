import email
import imaplib
import mailparser
from gpg_handler import decryptString


class MailBox():

    def __init__(self, hostname, user, password, port=993):
        self.MAX_MAIL = 20

        self.connection = imaplib.IMAP4_SSL(hostname, port=port)
        self.connection.login(user, password)
        self.password=password

        # create list of mailboxes
        self.mailboxes = []
        for i in self.connection.list()[1]:
            l = i.decode().split(' "/" ')
            if not "Calendar" in l[1] and not "Noselect" in l[0]:
                self.mailboxes.append(l[1])

    def get_n_emails(self, mailbox):
        _, byteno = self.connection.select(mailbox, readonly=True)
        return min(self.MAX_MAIL, int(byteno[0].decode()))

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
        # print(self.get_n_emails(mailbox))
        for i in range(1, self.get_n_emails(mailbox) + 1):
            _, msg_data = self.connection.fetch(str(i), "RFC822")
            mail = mailparser.parse_from_bytes(msg_data[0][1])
            emails.append({"id": str(i),
                           "date": str(mail.date),
                           "delivered_to": mail.delivered_to,
                           "from": mail.from_,
                           "subject": mail.subject,
                           "to": mail.to,
                           "timezone": mail.timezone,
                           "read": self.is_read(str(i))})
        return emails

    def refresh_all(self):
        mail_preview_list = {}
        print(self.mailboxes)

        for m in self.mailboxes:
            print("Refreshing " + str(m))
            mail_preview_list[m] = self.refresh_mailbox(m)
        return mail_preview_list

    def get_payload(self, mail: mailparser.MailParser):
        if(len(mail.text_html) != 0):
            return mail.text_html[0]
        if "-----BEGIN PGP MESSAGE-----" in mail.text_plain[0]:
            return decryptString(mail.text_plain[0], self.password)
        return mail.text_plain[0]

    def get_mail(self, id, mailbox):
        self.connection.select(mailbox)
        _, msg_data = self.connection.fetch(id, "RFC822")
        mail = mailparser.parse_from_bytes(msg_data[0][1])
        return self.get_payload(mail)

    def __del__(self):
        self.connection.logout()

import email
import imaplib
import mailparser

class MailBox():

    def __init__(self, hostname, user, password, port=993):
        self.MAX_MAIL=100

        self.connection = imaplib.IMAP4_SSL(hostname, port=port)
        self.connection.login(user, password)
        
        #create list of mailboxes
        self.mailboxes=[]
        for i in self.connection.list()[1]:
            l = i.decode().split(' "/" ')
            if not "Calendar" in l[1]:
                self.mailboxes.append(l[1])

    def get_n_emails(self, mailbox):
        _ , byteno = self.connection.select(mailbox, readonly=True)
        return int(byteno[0].decode())

    def is_read(self, email_id):
        unseen_list = self.connection.search(None, 'UNSEEN')[1][0].decode().split()
        if email_id in unseen_list:
            return False
        else:
            return True

    def refresh_mailbox(self, mailbox):
        emails = []


    def refresh_all(self):
        for 

    def get_payload(self, mail: mailparser.MailParser):
        if(len(mail.text_html) == 0):
            return mail.text_html[0]
        return mail.text_plain[0]

    def __del__(self):
        self.connection.logout()
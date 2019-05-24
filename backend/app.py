from flask import Flask, jsonify, request
from email_handler import MailBox
import json

mail_box=None

app = Flask(__name__)

@app.route('/cryptomail/api/v1.0/CreateKeys', methods = ["POST"])
def getKeys():
    data = request.get_json()

    return "Hello, World!"

@app.route('/cryptomail/api/v1.0/LogIn', methods = ["POST"])
def logIn():
    global mail_box
    data = request.get_json()
    mail_box = MailBox(data["hostname"], data["user"], data["password"], data["port"])
    return "success"

@app.route('/cryptomail/api/v1.0/RefreshAll', methods = ["GET"])
def refreshAll():
    global mail_box
    if not mail_box:
        return "Please log in before requesting emails."
    
    return json.dumps(mail_box.refresh_all())#

@app.route('/cryptomail/api/v1.0/GetMail', methods = ["POST"])
def getMail():
    global mail_box
    if not mail_box:
        return "Please log in before requesting emails."
    
    data = request.get_json()
    payload = mail_box.get_mail(data["id"], data["mailbox"])
    return payload

if __name__ == '__main__':
    app.run(debug=True)
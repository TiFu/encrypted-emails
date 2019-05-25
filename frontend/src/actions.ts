import { userInfo } from "os";

declare var $: any;

export function showSendEMailModal(recipients: string[], subject: string, content: string, dispatch: any) {
    dispatch({
        type: "SHOW_SENDING_MODAL",
        payload: {
            recipients: recipients,
            subject: subject,
            content: content
        }
    })
}
export function sendEMail(sender: string, password: string, recipients: string[], content: string, subject: string, smtpHostname: string, smtpPort: string, dispatch: any): void {
    dispatch({
        type: "SENDING_EMAIL",
        payload: null
    })
    let data = JSON.stringify({
        "content": content,
        "subject": subject,
        "recipients": recipients.reduce((prev, next) => !prev ? "[" + next : prev + ", " + next, "") + "]",
        "sender": sender,
        "user": sender,
        "password": password,
        "hostname": smtpHostname,
        "port": smtpPort
    })
    console.log("Data", data)
    $.ajax("http://localhost:5000/cryptomail/api/v1.0/SendMail", {
        method: "POST",
        contentType: "application/json",
        dataType: "text",
        data: data
    }).then((result: any) => {
        dispatch({
            type: "SENT_EMAIL",
            payload: {
                success: true
            }
        })
    }).catch((err: any) => {
        dispatch({
            type: "SENT_EMAIL",
            payload: {
                success: false
            }
        })
    })
}

export function loginToEMail(hostname: string, port: string, user:string, password: string, smtpHost: string, smtpPort: string, dispatch: any) {
    dispatch({
        type: "LOGGING_IN",
        payload: null
    })
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/LogIn', {
        method: 'POST',
        contentType: 'application/json',
        dataType: "text",
        data: JSON.stringify({
            hostname: hostname,
            port: port,
            user: user,
            password: password
        })
    })
    .then((result: any) => {
        dispatch({
            type: "LOGGED_IN",
            payload: {
                success: result == "success",
                email: result == "success" ? user : null,
                password: result == "success" ? password : null,
                imapHost: result == "success" ? hostname : null,
                imapPort: result == "success" ? port : null,
                smtpPort: result == "success" ? smtpPort : null,
                smtpHost: result == "success" ? smtpHost : null
            }
        })
        refreshAllBoxes(dispatch)
    }).catch((err: any) => {
        console.log("ERROR ", err)
        dispatch({
            type: "LOGGED_IN",
            payload: {
                success: false,
                email: false ? user : null,
                password: false ? password : null,
                imapHost: false ? hostname : null,
                imapPort: false ? port : null,
                smtpPort: false ? smtpPort : null,
                smtpHost: false ? smtpHost : null
            }
        })
    });
}

export function getEMailContent(emailId: string, mailbox: string, dispatch: any){ 
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/GetMail', {
        method: 'POST',
        contentType: 'application/json',
        dataType: "text",
        data: JSON.stringify({
            id: emailId,
            mailbox: mailbox
        })
    })
    .then((result: any) => {
        console.log("Refreshed all boxes");
        console.log(result);
        dispatch({
            type: "GET_MAIL",
            payload: {
                content: result,
                id: emailId,
                mailbox: mailbox
            }
        })
    });
}

export function refreshAllBoxes(dispatch: any) {
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/RefreshAll', {
        dataType: "json",
        method: 'GET'
    })
    .then((result: any) => {
        console.log("Refreshed all boxes");
        console.log(result);
        dispatch({
            type: "REFRESH_BOXES",
            payload: result
        })
    });
}

export function selectEMail(email: string, dispatch: any) {
    dispatch({
        type: "SELECT_EMAIL",
        payload: email
    })
}


export function selectMailbox(mailbox: string, dispatch: any) {
    dispatch({
        type: "SELECT_MAILBOX",
        payload: mailbox
    })
}
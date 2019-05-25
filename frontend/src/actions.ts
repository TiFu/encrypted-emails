declare var $: any;

export function loginToEMail(hostname: string, port: string, user:string, password: string, smtpHost: string, smtpPort: string, dispatch: any) {
    dispatch({
        type: "LOGGING_IN",
        payload: null
    })
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/LogIn', {
        method: 'POST',
        contentType: 'application/json',
        dataType: "json",
        data: {
            hostname: hostname,
            port: port,
            user: user,
            password: password
        }
    })
    .then((result: any) => {
        console.log("Refreshed all boxes");
        console.log(result);
        dispatch({
            type: "LOGGED_IN",
            payload: {
                success: result == "success",
                username: result == "success" ? user : null,
                password: result == "success" ? password : null,
                imapHost: result == "success" ? hostname : null,
                imapPort: result == "success" ? port : null,
                smtpPort: result == "success" ? smtpPort : null,
                smtpHost: result == "success" ? smtpHost : null
            }
        })
    }).catch((err: any) => {
        dispatch({
            type: "LOGGED_IN",
            payload: {
                success: false,
                username: false ? user : null,
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
        method: 'GET',
        contentType: 'application/json',
        dataType: "text",
        data: {
            id: emailId,
            mailbox: mailbox
        }
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
        method: 'POST'
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
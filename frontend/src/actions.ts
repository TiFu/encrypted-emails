declare var $: any;

export function loginToEMail(hostname: string, port: number, user:string, password: string, dispatch: any) {
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/LogIn', {
        method: 'POST',
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
            type: "GET_MAIL",
            payload: {
                success: result == "success"
            }
        })
    });
}

export function getEMailContent(emailId: string, mailbox: string, dispatch: any){ 
    $.ajax('http://localhost:5000/cryptomail/api/v1.0/GetMail', {
        method: 'POST',
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
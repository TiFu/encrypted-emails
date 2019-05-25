import { stat } from "fs";

export type Store = {
    componentState: {
        selectedMailbox: string | null,
        selectedEMail: string | null,
        imapHost: string | null,
        imapPort: string | null,
        smtpHost: string | null,
        smtpPort: string | null,
        loggingIn: boolean,
        failedLogin: boolean
    },
    errorMessage: {
        error: string | null,
        active: boolean
    },
    user: {
        email: string | null,
        password: string | null
    },
    mailboxes: { [key: string]: {
            id: string,
            date: string,
            delivered_to: string,
            from: string,
            subject: string,
            to: string,
            timezone: string,
            read: boolean
        }[]
    },
    mailContents: {
        [key: string]: string
    }

}

let initialState = {
    componentState: {
        selectedEMail: null,
        selectedMailbox: null,
        loggingIn: false,
        failedLogin: false,
        imapHost: null,
        imapPort: null,
        smtpHost: null,
        smtpPort: null
    },
    errorMessage: {
        error: null,
        active: false
    },
    user: {
        email: null,
        password: null
    },
    mailboxes: {},
    mailContents: {}
}
/*let initialState: Store = {
    componentState: {
        selectedMailbox: "Test",
        selectedEMail: "1"
    },
    errorMessage: {
        error: null,
        active: false
    },
    user: {
        email: null,
        password: null
    },
    mailboxes: {  "Test": [ {
        id: "1",
        read: false,
        date: "23.01.2019",
        delivered_to: "Tino",
        from: "Sebastian",
        to: "tino-fuhrmann@web.de",
        timezone: "",
        subject: "Your new job"
    }, {
        id: "2",
        read: false,
        date: "23.01.2019",
        delivered_to: "Tino",
        from: "Sebastian",
        to: "tino-fuhrmann@web.de",
        timezone: "",
        subject: "Your new job"
    }, {
        id: "3",
        read: true,
        date: "23.01.2019",
        delivered_to: "Tino",
        from: "Sebastian",
        to: "tino-fuhrmann@web.de",
        timezone: "",
        subject: "Your new job"
    } ],
    "Test2": [ {
            id: "4",
            read: false,
            date: "29.01.2019",
            delivered_to: "Tino",
            from: "Sebastian",
            to: "tino-fuhrmann@web.de",
            timezone: "",
            subject: "Yoiaeiaeiaeiur new job"
        }, {
            id: "5",
            read: false,
            date: "30.01.2019",
            delivered_to: "Tino",
            from: "Sebastian",
            to: "tino-fuhrmann@web.de",
            timezone: "",
            subject: "Your new jovleeeeeeeeeeeeeeeb"
        }, {
            id: "6",
            read: true,
            date: "05.02.2019",
            delivered_to: "Tino",
            from: "Sebastian",
            to: "tino-fuhrmann@web.de",
            timezone: "",
            subject: "Your newvleeeeeee job"
        }
    ]
    },
    mailContents: {
        "1": "Sehr geehrte Frau A, \n bitten treten sie zurück.\n Viele Grüße"
    }
}*/

export const reducer = (state: Store = initialState, action: { type: string, payload: any}) =>{ 
    switch (action.type) {
        case "ERROR": 
            return { ...state, errorMessage: { error: action.payload, active: true}}
        break;
        case "GET_MAIL":
            let mail = { ...state.mailContents }
            mail[action.payload.id] = action.payload.content
            return { ...state, mailContents: mail };
        break;
        case "REFRESH_BOXES":
            return {...state, mailboxes: action.payload }
        break;
        
        case "SELECT_MAILBOX": 
            return { ...state, componentState: { ...state.componentState, selectedMailbox: action.payload }};
        
        case "SELECT_EMAIL": 
            return { ...state, componentState: { ...state.componentState, selectedEMail: action.payload}}
        case "LOGGING_IN": 
            return { ...state, componentState: { ...state.componentState, loggingIn: true}}
        case "LOGGED_IN": 
            return { 
                ...state, 
                componentState: { 
                    ...state.componentState, 
                    email: action.payload.email, 
                    password: action.payload.password, 
                    loggingIn: false, 
                    failedLogin: !action.payload.success,
                    imapHost: action.payload.imapHost,
                    imapPort: action.payload.imapPort,
                    smtpHost: action.payload.smtpHost,
                    smtpPort: action.payload.smtpPort
            }}
        default: 
        return { ...state };
        break;
    }
}
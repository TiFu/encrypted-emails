import * as React from "react";
import {selectEMail} from './actions'

type MailListProps = {
    messages: {
        id: string,
        date: string,
        delivered_to: string,
        from: string,
        subject: string,
        to: string,
        timezone: string,
        read: boolean
    }[],

    selectedEMail: string | null
}

type MailListActions = {
    selectEMail: (id: string) => void;
}

export class MailList extends React.Component<MailListProps & MailListActions, {}> {

    render() {
        let mails: any[] = [] 
        if (this.props.messages) {
            mails = this.props.messages.map((m: any) => {
                    let lock = m.encrypted ? <i className="fas fa-unlock-alt"></i> : null;

                    return <tr key={m.id} onClick={() => { console.log("Selected: ", m.id); this.props.selectEMail(m.id)}} className={"mail-list-row w-100 " + (m.id == this.props.selectedEMail ? "mail-list-background-selected" : "")}>
                    <th scope="row" className="mail-list-first-col">{lock}</th>
                    <td className="mail-list-content-col mail-content-preview">
                        {m.from[0].reduce((prev: string, next: string) => prev == "" ? next : prev + ", " + next, "")}
                        <br /><b>{m.subject}</b></td>
                    <td className="mail-list-date-col">{m.date}</td>
                </tr>
            })
            mails = mails.reverse()
        }
        return <div className="container-fluid">
                    <div className="row pt-2">
                    <h2>Inbox</h2>
                    </div>
                    <div className="row">
                        <table className="table mail-list-table mail-list-background pr-4">
                            <tbody className="w-100">
                                {mails}
                            </tbody>
                        </table>
                    </div>
            </div>
    }
  
}


import { Store } from './store'
import { connect } from 'react-redux';
function mapStateToProps(state: Store): MailListProps {
    let messages: any[] = []
    if (state.componentState.selectedMailbox && state.mailboxes[state.componentState.selectedMailbox]) {
        messages = state.mailboxes[state.componentState.selectedMailbox]
    }
    console.log("Messages: ", messages)
    return {
        messages: messages,
        selectedEMail: state.componentState.selectedEMail
    }; 
}
  
function mapDispatchToProps(dispatch: any): MailListActions {
      return {
        selectEMail: (id: string) => selectEMail(id, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailList)
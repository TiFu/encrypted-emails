import * as React from "react";

type MailViewProps = {
    id: string | null,
    date: string | null,
    delivered_to: string | null,
    from: string | null,
    subject: string | null,
    to: string | null,
    timezone: string | null,
    read: boolean
    content: string | null,

    selectedMailbox: string | null
}


type MailViewActions = {
    fetchEmailContent: (id: string, mailbox: string) => void
}

class MailView extends React.Component<MailViewProps & MailViewActions, {}> {

    render() { 
        console.log("Props Mail View: ", this.props)
        if (!this.props.subject) {
            return <div className="pt-5 text-center">Please select an e-mail!</div>
        }

        let contentDisplayed = null
        if (!this.props.content && this.props.selectedMailbox && this.props.id) {
            this.props.fetchEmailContent(this.props.id, this.props.selectedMailbox)
            contentDisplayed = <div className="col-11">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading e-mail</span>
                </div>
            </div>
        } else {
            contentDisplayed = <div className="col-11" dangerouslySetInnerHTML={{__html: (this.props.content || "").replace(/\n/g, "<br />")}}></div>
        }

        return <div className="container-fluid pt-2">
                <div className="row mail-subject">
                    <div className="col-1  p-0">
                    </div>
                    <div className="col-11">
                        <h2>{this.props.subject}</h2>
                    </div>
                </div>
                <div className="row mail-header">
                    <div className="col-1 text-center p-0 ml-1">
                        <i className="fas fa-user-circle user-image"></i>
                    </div>
                    <div className="col">
                        <b>{this.props.from}</b> <span className="mail-content-preview">&lt;{this.props.from}&gt;</span><br />
                        to <span className="mail-content-preview">{this.props.to}</span>
                    </div>
                    <div className="col text-right clock">
                        <i className="fas fa-clock"></i> {this.props.date}
                    </div>
                </div>
                <div className="row mail-content">
                    <div className="col-1  p-0">
                    </div>
                    {contentDisplayed}
                </div>
                <div className="row mail-footer">
                    <div className="col-1  p-0">
                    </div>
                    <div className="col-11">
                        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"></div>
                            <div className="btn-group mr-2" role="group" aria-label="Second group">
                                <button type="button" className="btn btn-secondary"><i className="fas fa-arrow-circle-right"></i> Forward</button>
                            </div>
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" className="btn btn-primary"><i className="fas fa-reply"></i> Reply</button>
                            </div>
                    </div>
                </div>
            </div>
    }
  
}

import { Store } from './store'
import { connect } from 'react-redux';
import { stat } from "fs";
function mapStateToProps(state: Store): MailViewProps {
    let content = null
    let message = {}
    console.log("Selected EMail: ", state.componentState.selectedEMail)
    console.log("Selected Mail box: ", state.componentState.selectedEMail)
    console.log("E-Mail contents: ")
    if (state.componentState.selectedMailbox && state.mailboxes[state.componentState.selectedMailbox]) {
        message = state.mailboxes[state.componentState.selectedMailbox].find(m => m.id === state.componentState.selectedEMail) || {}
    }

    if (state.componentState.selectedEMail && state.mailContents[state.componentState.selectedEMail]) {

        content = state.mailContents[state.componentState.selectedEMail]
    }

    return {
        content: content,
        id: null,
        date: null, 
        delivered_to: null, 
        from: null,
        subject: null,
        to: null, 
        timezone: null,
        read: false,
        selectedMailbox: state.componentState.selectedMailbox,
        ...message
    }; 
}
  
import { getEMailContent } from './actions'

function mapDispatchToProps(dispatch: any): MailViewActions {
      return {
        fetchEmailContent: (id: string, mailbox: string) => getEMailContent(id, mailbox, dispatch)

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailView)
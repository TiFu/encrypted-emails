import * as React from "react";

type WriteEMailState = {
    recipients: string
    subject: string
    content: string
}

type WriteEMailProps = {
    username: string | null
    password: string | null
    smtpHost: string | null
    smtpPort: string | null

    showModal: boolean
    isSending: boolean
    failedSending: boolean
}

type WriteEMailAction = {
    sendEMail: (sender: string, password: string, recipients: string[], content: string, subject: string, smtpHostname: string, smtpPort: string) => void;
    closeSendingModal: () => void
}

class WriteEMailComponent extends React.Component<WriteEMailProps & WriteEMailAction, WriteEMailState> {

    public constructor(props: WriteEMailAction & WriteEMailProps) {
        super(props);
        this.state ={ 
            recipients: "",
            subject: "",
            content: ""
        }
    }

    private sendEmail() {
        this.props.sendEMail(this.props.username, this.props.password, this.state.recipients.split(", "), this.state.content, this.state.subject, this.props.smtpHost, this.props.smtpPort);
    }
    private updateState(key: keyof WriteEMailState, event: any) {
        let updated: any = {}
        updated[key] = event.target.value
        console.log("Updated: ", updated)
        this.setState(updated)
    }   

    getForm() {
        return <form className="text-left">
        <div className="form-group">
            <label>Recipients</label>
            <input type="text" onChange={(e) => this.updateState("recipients", e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Subject</label>
            <input type="text" onChange={(e) => this.updateState("subject", e)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" /> 
        </div>

        <div className="form-group">
            <label>Example textarea</label>
            <textarea className="form-control" onChange={(e) => this.updateState("content", e)}  id="exampleFormControlTextarea1" rows={10}></textarea>
        </div>

</form>


    }

    private getSpinner() { 
        return <div className="spinner-border" role="status">
            <span className="sr-only">Sending...</span>
        </div>
    }

    private getWarning(){ 
        return <div className="alert alert-danger" role="alert">
            Failed to send message! Please try again.
        </div>
    }

    private handleClose() {
        this.props.closeSendingModal()
    }

    render() { 
        if (!this.props.showModal) {
            return null;
        }

        const show = this.props.showModal ? "show" : "no-show"
        return <div className={"modal-backdrop backdrop-" + show}><div className={"modal " + show} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">CryptoMail Login</h5>
            </div>
            <div className="modal-body text-center">
            {this.props.failedSending ? this.getWarning() : null}
            {this.props.isSending ? this.getSpinner() : this.getForm()}
            </div>
            <div className="modal-footer">
            <button type="button" onClick={() => this.handleClose()} className="btn btn-secondary"><i className="fas fa-times"></i> Close</button>
              <button type="button" onClick={() => this.sendEmail()} className="btn btn-primary"><i className="fas fa-share-square"></i> Send</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    }
}


import { Store } from './store'
import { connect } from 'react-redux';
function mapStateToProps(state: Store): WriteEMailProps {
    console.log("State: ", state);
    return {
        isSending: state.componentState.isSending,
        failedSending: state.componentState.failedSending,
        username: state.user.email,
        password: state.user.password,
        smtpHost: state.componentState.smtpHost,
        smtpPort: state.componentState.smtpPort,
        showModal: state.componentState.showSendEMailModal
    }; 
}
 
import { sendEMail } from './actions'
import { stat } from "fs";
function mapDispatchToProps(dispatch: any): WriteEMailAction {
      return {
        sendEMail: (sender: string, password: string, recipients: string[], content: string, subject: string, smtpHostname: string, smtpPort: string) => sendEMail(sender, password, recipients, content, subject, smtpHostname, smtpPort, dispatch),
        closeSendingModal: () => dispatch({
            type: "CLOSE_SENDING_MODAL",
            payload: null
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteEMailComponent)
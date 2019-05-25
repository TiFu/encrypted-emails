import * as React from "react";

type LoginComponentState = {
    email: string
    password: string

    imapHost: string
    imapPort: string

    smtpHost: string
    smptPort: string
}

type LoginComponentProps = {
    username: string | null
    password: string | null
    isLoggingIn: boolean
    loginFailed: boolean
}

type LoginComponentAction = {
    handleLogin: (imapHost: string, imapPort: string, email: string, password: string, smtpHot: string, smtpPort: string) => void;
}
class LoginComponent extends React.Component<LoginComponentProps & LoginComponentAction, LoginComponentState> {

    public constructor(props: LoginComponentAction & LoginComponentProps) {
        super(props);
        this.state ={ 
            email: "",
            password: "",
            imapHost: "",
            imapPort: "",
            smtpHost: "",
            smptPort: ""
        }
    }

    private updateState(key: keyof LoginComponentState, event: any) {
        let updated: any = {}
        updated[key] = event.target.value
        console.log("Updated: ", updated)
        this.setState(updated)
    }   

    private handleLogin() {
        this.props.handleLogin(this.state.imapHost, this.state.imapPort, this.state.email, this.state.password, this.state.smtpHost, this.state.smptPort);
    }

    getForm() {
        return <form className="text-left">
        <div className="form-group">
            <label>Email address</label>
            <input type="email" onChange={(e) => this.updateState("email", e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={(e) => this.updateState("password", e)}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>


        <div className="form-group">
            <label>IMAP Host (e.g. imap.gmail.com)</label>
            <input type="text" onChange={(e) => this.updateState("imapHost", e)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" /> 
        </div>
        <div className="form-group">
            <label>IMAP Port (e.g. 993)</label>
            <input type="text" onChange={(e) => this.updateState("imapPort", e)}  className="form-control" id="exampleInputPassword1" placeholder="" />
        </div>


        <div className="form-group">
            <label>SMTP Host (e.g. smtp.gmail.com)</label>
            <input type="text" onChange={(e) => this.updateState("smtpHost", e)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
        </div>
        <div className="form-group">
            <label>SMTP Port (e.g. 465 or 587)</label>
            <input type="text" onChange={(e) => this.updateState("smptPort", e)}  className="form-control" id="exampleInputPassword1" placeholder="" />
        </div>

</form>


    }

    private getSpinner() { 
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    }

    private getWarning(){ 
        return <div className="alert alert-danger" role="alert">
            Failed to log you in! Please make sure that your credentials are correct and try again.
        </div>
    }
    render() { 
        console.log("Rendering modal!")
        const show = (!this.props.password || !this.props.username) ? "show" : "no-show"
        return <div className={"modal-backdrop backdrop-" + show}><div className={"modal " + show} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">CryptoMail Login</h5>
            </div>
            <div className="modal-body text-center">
            {this.props.loginFailed ? this.getWarning() : null}
            {this.props.isLoggingIn ? this.getSpinner() : this.getForm()}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => this.handleLogin()} className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    }
}


import { Store } from './store'
import { connect } from 'react-redux';
function mapStateToProps(state: Store): {} {
    console.log("State: ", state);
    return {
        isLoggingIn: state.componentState.loggingIn,
        username: state.user.email,
        password: state.user.password
        loginFailed: state.componentState.failedLogin
    }; 
}
 
import { selectMailbox, loginToEMail } from './actions'
function mapDispatchToProps(dispatch: any): LoginComponentAction {
      return {
          handleLogin: (imapHost: string, imapPort: string, email: string, password: string, smtpHot: string, smtpPort: string) => loginToEMail(imapHost, imapPort, email, password, smtpHot, smtpPort, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
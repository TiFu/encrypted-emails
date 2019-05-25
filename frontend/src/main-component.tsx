import * as React from "react";
import { connect } from 'react-redux';
import FolderOverview from './folder-overview'
import Header from './header'
import MailComponent from './mails'
import LoginComponent from './login'

type MainComponentActions = {
    showSendModal: () => void
}

class MainComponent extends React.Component<MainComponentActions, {}> {

    render() { 
        return <div className="container-fluid">
                <LoginComponent />
        <div className="row">
          <div className="col-12 green header border-bottom header-bg-color">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-2 black folder-col pl-0 pt-2">
            <div className="row">
              <div className="col-12 pt-1 pb-2 text-center">
                <button type="button" onClick={() => this.props.showSendModal()} className="btn btn-lg btn-primary round-button"><i className="fas fa-pen"></i> Compose</button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FolderOverview></FolderOverview>
              </div>
            </div>
          </div>
          <div className="col-10 mail-col">
            <MailComponent />
          </div>
        </div>
      </div>
    }
  
}

import { Store } from './store'
import { showSendEMailModal } from "./actions";
function mapStateToProps(state: Store): {} {
    return {
    }; 
}
  
function mapDispatchToProps(dispatch: any): MainComponentActions {
      return {
        showSendModal: () => showSendEMailModal([], "", "", dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)
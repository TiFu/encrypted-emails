import * as React from "react";

type HeaderProps = {
    email: string | null
    isSpinning: boolean
}

type HeaderActions = {
    sync: () => void
}

class Header extends React.Component<HeaderProps & HeaderActions, {}> {

    render() { 
        console.log("SYNCING: ", this.props.isSpinning)
        return <div className="center-vertical">
            <div className="logo">
                <i className="fas fa-key logo-size"></i><i className="fas fa-envelope envelope logo-size"></i>
                CryptoMail
            </div>
            <div className="logged-in-user">
                {this.props.email} <button type="button" onClick={() => this.props.sync()} className="btn btn-secondary"><i className={"fas fa-sync " + (this.props.isSpinning ? "fa-spin" : "")}></i></button>    
            </div>
        </div>
    }  
}


import { Store } from './store'
import { connect } from 'react-redux';
import { refreshAllBoxes } from "./actions";
function mapStateToProps(state: Store): HeaderProps {
    console.log("State Header: ", state);
    return {
      email: state.user.email,
      isSpinning: state.componentState.isSyncing
    }; 
}
  
function mapDispatchToProps(dispatch: any): HeaderActions {
      return {
          sync: () => refreshAllBoxes(dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
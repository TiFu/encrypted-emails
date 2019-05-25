import * as React from "react";

type HeaderProps = {
    email: string | null
}

class Header extends React.Component<HeaderProps, {}> {

    render() { 
        return <div className="center-vertical">
            <div className="logo">
                <i className="fas fa-key logo-size"></i><i className="fas fa-envelope envelope logo-size"></i>
                CryptoMail
            </div>
            <div className="logged-in-user">
                {this.props.email}
            </div>
        </div>
    }
  
}


import { Store } from './store'
import { connect } from 'react-redux';
function mapStateToProps(state: Store): HeaderProps {
    console.log("State: ", state);
    return {
      email: state.user.email
    }; 
}
  
function mapDispatchToProps(dispatch: any): {} {
      return {
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
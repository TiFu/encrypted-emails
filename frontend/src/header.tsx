import * as React from "react";

export class Header extends React.Component<{}, {}> {

    render() { 
        return <div className="center-vertical">
            <div className="logo">
                <i className="fas fa-key logo-size"></i><i className="fas fa-envelope envelope logo-size"></i>
                CryptoMail
            </div>
            <div className="logged-in-user">
                test@test.com
            </div>
        </div>
    }
  
}
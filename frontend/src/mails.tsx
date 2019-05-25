import * as React from "react";
import MailList from "./mail-list";
import MailView from "./mail-view";




class MailComponent extends React.Component<{}, {}> {

    render() { 
        return <div className="container-fluid p-0 h-100 w-100">
            <div className="row h-100">
                <div className="col-5 p-0 mail-list  w-100">
                    <MailList />
                </div>
                <div className="col-7 pl-0 pr-0 mail-view green">
                    <MailView />
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
    }; 
}
  
function mapDispatchToProps(dispatch: any): {} {
      return {
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailComponent)
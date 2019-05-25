import * as React from "react";

export type FolderOverviewProps = {
  folders: {
    [key:  string]: {
        read: boolean
    }[],
  }
  selectedFolder: string | null
}

export type FolderOverviewActions = {
  selectFolder: (folder: string) => void
}

class FolderOverview extends React.Component<FolderOverviewProps & FolderOverviewActions, {}> {

    render() { 
        console.log("Rendering: folder overiew!", this.props.folders);
        let folders = []
        if (this.props.folders) {
          let skipInbox = false;
          if ("INBOX" in this.props.folders) {
            let folder = "INBOX"
            let unreadMessages = this.props.folders[folder].reduce((prev, next) => next.read ? prev : prev + 1, 0);
            folders.push(        
                <a key={folder} onClick={() => { console.log("SELECTED FOLDER: ", folder); this.props.selectFolder(folder)}} className={"nav-link pl-4 folder" + (folder == this.props.selectedFolder ? " active" : "") } id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">{folder} <span className="badge badge-pill badge-dark new-e-mail-counter">{unreadMessages}</span></a>)
              skipInbox = true
          }
          for (let folder in this.props.folders) {
            if (folder == "INBOX" && skipInbox) {
              continue;
            }
            let unreadMessages = this.props.folders[folder].reduce((prev, next) => next.read ? prev : prev + 1, 0);
            folders.push(        
                <a key={folder} onClick={() => { console.log("SELECTED FOLDER: ", folder); this.props.selectFolder(folder)}} className={"nav-link pl-4 folder" + (folder == this.props.selectedFolder ? " active" : "") } id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">{folder} <span className="badge badge-pill badge-dark new-e-mail-counter">{unreadMessages}</span></a>)
          }
        }

        return <div className="nav flex-column nav-pills folder-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          {folders}
      </div>
    }
}


import { Store } from './store'
import { connect } from 'react-redux';
function mapStateToProps(state: Store): FolderOverviewProps {
    console.log("State: ", state);
    return {
      folders: state.mailboxes,
      selectedFolder: state.componentState.selectedMailbox
    }; 
}
 
import { selectMailbox } from './actions'
function mapDispatchToProps(dispatch: any): FolderOverviewActions {
      return {
          selectFolder: (folder: string) => selectMailbox(folder, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderOverview)
import * as React from "react";

export class FolderOverview extends React.Component<{}, {}> {

    render() { 
        return <div className="nav flex-column nav-pills folder-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <span className="align-middle"><a className="nav-link pl-3 active folder" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fas fa-inbox"></i> Inbox <span className="badge badge-pill badge-dark new-e-mail-counter">10</span></a></span>
        <a className="nav-link pl-4 folder" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Uni</a>
        <a className="nav-link pl-4 folder" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Work <span className="badge badge-pill badge-dark new-e-mail-counter">4</span></a>
        <a className="nav-link pl-3 folder" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i className="fas fa-exclamation-triangle"></i> Spam <span className="badge badge-pill badge-dark new-e-mail-counter">10</span></a>
        <a className="nav-link pl-3 folder" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fas fa-trash"></i> Trash <span className="badge badge-pill badge-dark new-e-mail-counter">3</span></a>
      </div>
    }
  
}
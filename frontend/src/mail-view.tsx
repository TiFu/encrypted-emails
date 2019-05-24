import * as React from "react";

export class MailView extends React.Component<{}, {}> {

    render() { 
        return <div className="container-fluid pt-2">
                <div className="row mail-subject">
                    <div className="col-1  p-0">
                    </div>
                    <div className="col-11">
                        <h2>Subject of the selected e-mail</h2>
                    </div>
                </div>
                <div className="row mail-header">
                    <div className="col-1 text-center p-0 ml-1">
                        <i className="fas fa-user-circle user-image"></i>
                    </div>
                    <div className="col">
                        <b>get in IT</b> <span className="mail-content-preview">&lt;jobgateway@get-in.de&gt;</span><br />
                        to <span className="mail-content-preview">tino-fuhrmann@web.de</span>
                    </div>
                    <div className="col text-right clock">
                        <i className="fas fa-clock"></i> 11:15 AM (6 hours ago)
                    </div>
                </div>
                <div className="row mail-content">
                    <div className="col-1  p-0">
                    </div>
                    <div className="col-11">
                    Content
                    </div>
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
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MailComponent } from "./mails";
import { FolderOverview } from './folder-overview'
import { Header } from './header'

const root = document.getElementById('app');
ReactDOM.render(
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 green header border-bottom">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-2 black folder-col pl-0 pt-2">
          <FolderOverview />
        </div>
        <div className="col-10 mail-col">
          <MailComponent />
        </div>

      </div>
    </div>,
  root
);
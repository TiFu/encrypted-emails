import * as React from "react";

export class MailList extends React.Component<{}, {}> {

    render() { 
        return <div className="container-fluid">
                    <div className="row pt-2">
                    <h2>Inbox</h2>
                    </div>
                    <div className="row">
                        <table className="table mail-list-table mail-list-background pr-4">
                            <tbody className="w-100">
                                <tr className="mail-list-row w-100">
                                <th scope="row" className="mail-list-first-col"></th>
                                <td className="mail-list-sender-col">get in IT</td>
                                <td className="mail-list-content-col mail-content-preview"><span className="default-font">Unser Gespräch am KIT</span></td>
                                <td className="mail-list-date-col">11:32</td>
                                </tr>

                                <tr className="mail-list-row w-100">
                                <th scope="row" className="mail-list-first-col"></th>
                                <td className="mail-list-sender-col">get in IT</td>
                                <td className="mail-list-content-col mail-content-preview"><span className="default-font">Unser Gespräch am KIT</span></td>
                                <td className="mail-list-date-col">11:32</td>
                                </tr>

                                <tr className="mail-list-row w-100">
                                <th scope="row" className="mail-list-first-col"></th>
                                <td className="mail-list-sender-col">get in IT</td>
                                <td className="mail-list-content-col mail-content-preview"><span className="default-font">Unser Gespräch am KIT</span></td>
                                <td className="mail-list-date-col">11:32</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
            </div>
    }
  
}
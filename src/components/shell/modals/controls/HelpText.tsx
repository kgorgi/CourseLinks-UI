import * as React from "react";

import "./css/HelpText.css";

import { DialogContentText } from "@material-ui/core";

interface IHelpTextProps {
    isWelcomeModal: boolean;
}

class HelpText extends React.Component<IHelpTextProps> {

    public render() {
        const {isWelcomeModal} = this.props;
        return (
            <React.Fragment>
                <ul className="HelpText-list">
                    <li><DialogContentText>Enter a Course and click Search.</DialogContentText></li>
                    <li><DialogContentText>Not all dependencies are required to take a course. </DialogContentText></li>
                    <li><DialogContentText>Click a course in the graph to see course information in the right-side panel.</DialogContentText></li>
                    <li><DialogContentText>Click hyperlinks in the right-side panel to get more information about courses, timetables, faculty information, etc.</DialogContentText></li>
                    <li><DialogContentText>Note: The right-side panel is horizontally resizable. </DialogContentText></li>
                </ul> <br /> <br />                       
                <DialogContentText className="HelpText-infoWarning">
                    <b>Always confirm with the official academic calendar, as this is BETA software. </b> 
                    There may be incorrect information displayed in Course Links. If you find incorrect information, 
                    please contact us {isWelcomeModal ? " (see Help)" : ""}. <br /> <br />
                </DialogContentText>
            </React.Fragment>           
        );
    }
}

export default HelpText;
import * as React from "react";


import "./css/HelpText.css";

class HelpText extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <ul className="HelpText-list">
                    <li>Enter a Course and click Search.</li>
                    <li>Not all dependencies are required to take a course, </li>
                    <li>Select a course in the graph to see course information in the right-side panel.</li>
                    <li>Click hyperlinks in the right-side panel to get more information about courses, timetables, faculty information, etc.</li>
                    <li>Note: The right-side panel is horizontally resizable. </li>
                </ul> <br />                       
                <div className="HelpText-infoWarning">
                    <b>Always confirm with the official academic calendar, as this is BETA software. </b> 
                    There may be incorrect information displayed in Course Links. If you find incorrect information, 
                    please contact us. <br />
                </div>  
            </React.Fragment>           
        );
    }
}

export default HelpText;
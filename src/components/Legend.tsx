import * as React from "react";
import Checkbox from "material-ui/Checkbox";


import "./css/Legend.css";

class Legend extends React.Component {

    render() {
        return (
            <div className="Legend" >
                <Checkbox />
                 <h4 className="Legend-text"> Pre-requisite: </h4>
                 <Checkbox />
                 <h4 className="Legend-text"> Co-requisite: </h4>
                 <Checkbox />
                 <h4 className="Legend-text"> Pre/Co-requisite: </h4>
            </div >
        );
    }
}

export default Legend;

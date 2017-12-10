import * as React from "react";
import Checkbox from "material-ui/Checkbox";
import { DependencyTypes } from "./Course";

import "./css/GraphBar.css";

export interface GraphBarProps {
    validTypes?: DependencyTypes;
}

export interface GraphBarState {
}

class GraphBar extends React.Component<GraphBarProps, GraphBarState> {

    renderLegend = () => {
        const { validTypes } = this.props;

        if (!validTypes ) {
            return null;
        }

        const { preReq, coReq, precoReq } = validTypes;

        let validCount = 0;
        if (preReq) {
            validCount += 1;
        }

        if (coReq) {
            validCount += 1;
        }

        if (precoReq) {
            validCount += 1;
        }

        const renderCheckbox = validCount !== 1;

        const elements: JSX.Element[] = [];

        if (preReq) {
            elements.push(
                <div key="preReq" className="GraphBar-legend-item">
                    {renderCheckbox && <Checkbox />}
                    < h4 className="Legend-text"> Pre-requisite: </h4>
                </div>
            );
        }

        if (coReq) {
            elements.push(
                <div key="coReq" className="GraphBar-legend-item">
                    {renderCheckbox && <Checkbox />}
                    <h4 className="Legend-text"> Co-requisite: </h4>
                </div>
            );
        }

        if (precoReq) {
            elements.push(
                <div key="precoReq" className="GraphBar-legend-item">
                    {renderCheckbox && <Checkbox />}
                    <h4 className="Legend-text"> Pre/Co-requisite: </h4>
                </div>
            );
        }

        return elements;
    }

    render() {

        return (
            <div className="GraphBar" >
                <div className="GraphBar-legend">
                    {this.renderLegend()}
                </div>
            </div >
        );
    }
}

export default GraphBar;

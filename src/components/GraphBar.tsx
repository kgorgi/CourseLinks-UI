import * as React from "react";
import Checkbox from "material-ui/Checkbox";
import { DependencyTypes } from "./Course";

import "./css/GraphBar.css";

export interface GraphBarProps {
    validTypes?: DependencyTypes;
}

class GraphBar extends React.Component<GraphBarProps> {
    renderLegend = () => {
        const elements: JSX.Element[] = [];
        const { validTypes } = this.props;
        if (validTypes) {
            if (validTypes.preReq) {
                elements.push(
                    <div key="preReq" className="GraphBar-legend-item">
                        <Checkbox />
                        <h4 className="Legend-text"> Pre-requisite: </h4>
                    </div>
                );
            }

            if (validTypes.coReq) {
                elements.push(
                    <div key="coReq" className="GraphBar-legend-item">
                        <Checkbox />
                        <h4 className="Legend-text"> Co-requisite: </h4>
                    </div>
                );
            }

            if (validTypes.precoReq) {
                elements.push(
                    <div key="precoReq" className="GraphBar-legend-item">
                        <Checkbox />
                        <h4 className="Legend-text"> Pre/Co-requisite: </h4>
                    </div>
                );
            }
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

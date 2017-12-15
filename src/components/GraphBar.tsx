import * as React from "react";
import Checkbox from "material-ui/Checkbox";
import { DependencyTypes } from "./Course";

import "./css/GraphBar.css";

export interface GraphBarProps {
    validTypes?: DependencyTypes;
    displayTypes?: DependencyTypes;
    onDisplayPreReqs: () => void;
    onDisplayCoReqs: () => void;
    onDisplayPreCoReqs: () => void;
}


class GraphBar extends React.Component<GraphBarProps> {

    renderLegend = () => {
        const { validTypes, displayTypes } = this.props;

        if (!validTypes || !displayTypes) {
            return null;
        }

        const { preReq, coReq, precoReq } = displayTypes;
        const { onDisplayPreReqs, onDisplayCoReqs, onDisplayPreCoReqs } = this.props;

        const renderCheckBox = validTypes.getCount() !== 1;
        const disableLastCheckbox = displayTypes.getCount() === 1;
        const elements: JSX.Element[] = [];

        if (validTypes.preReq) {
            elements.push(
                <div key="preReq" className="GraphBar-legend-item">
                    {renderCheckBox &&
                        <Checkbox
                            checked={preReq}
                            onClick={onDisplayPreReqs}
                            disabled={disableLastCheckbox && preReq}
                        />
                    }
                    < h4 className="Legend-text"> Pre-requisite: </h4>
                    <span className="GraphBar-arrow-blue"> ↗ </span>
                </div>
            );
        }

        if (validTypes.coReq) {
            elements.push(
                <div key="coReq" className="GraphBar-legend-item">
                    {renderCheckBox &&
                        <Checkbox
                            checked={coReq}
                            onClick={onDisplayCoReqs}
                            disabled={disableLastCheckbox && coReq}
                        />
                    }
                    <h4 className="Legend-text"> Co-requisite: </h4>
                    <span className="GraphBar-arrow-red"> ↗ </span>
                </div>
            );
        }

        if (validTypes.precoReq) {
            elements.push(
                <div key="precoReq" className="GraphBar-legend-item">
                     {renderCheckBox &&
                        <Checkbox
                            checked={precoReq}
                            onClick={onDisplayPreCoReqs}
                            disabled={disableLastCheckbox && precoReq}
                        />
                    }
                    <h4 className="Legend-text"> Pre/Co-requisite: </h4>
                    <span className="GraphBar-arrow-green" > ↗ </span>
                </div>
            );
        }

        if (displayTypes.getCount() === 1) {
            elements.push(
                <div key="selected" className="GraphBar-legend-item">
                    <h4 className="Legend-text"> Selected: </h4>
                    <span className="GraphBar-arrow-orange" > ↗ </span>
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

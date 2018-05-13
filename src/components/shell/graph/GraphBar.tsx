import * as React from "react";

import Checkbox from "material-ui/Checkbox";
import Button from "material-ui/Button";

import DependencyTypes from "../../utils/types/DependencyTypes";

import "./css/GraphBar.css";

export interface GraphBarProps {
    validTypes?: DependencyTypes;
    displayTypes?: DependencyTypes;
    onDisplayPreReqs: () => void;
    onDisplayCoReqs: () => void;
    onDisplayPreCoReqs: () => void;
    onHelpButton: () => void;
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
                            indeterminate={disableLastCheckbox && preReq}
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
                            indeterminate={disableLastCheckbox && coReq}
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
                            indeterminate={disableLastCheckbox && precoReq}
                        />
                    }
                    <h4 className="Legend-text"> Pre/Co-requisite: </h4>
                    <span className="GraphBar-arrow-green" > ↗ </span>
                </div>
            );
        }

        const showSelected = displayTypes.getCount() === 1;
        elements.push(
            <div key="selected" className="GraphBar-legend-item-select">
                {showSelected && <h4 className="Legend-text"> Selected: </h4>}
                {showSelected && <span className="GraphBar-arrow-orange" > ↗ </span>}
            </div>
        );

        return elements;
    }

    render() {
        const { onHelpButton } = this.props;
        return (
            <div className="GraphBar" >
                <div className="GraphBar-legend">
                    {this.renderLegend()}
                </div>
                <Button raised={true} color="primary" className="GraphBar-help-button" onClick={onHelpButton}>
                    Reset Graph
                </Button>
            </div >
        );
    }
}

export default GraphBar;

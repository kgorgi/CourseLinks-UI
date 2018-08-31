import * as React from 'react';

import Arrow from './Arrow';

import "./css/GraphLegend.css";

class GraphLegend extends React.Component {
    public render() {
        return (
            <div className="GraphLegend">
                <div className="GraphLegend-text">
                    Prerequisite:
                    <Arrow
                        angle={45}
                        color="blue"
                        length={40}
                        lineWidth={2}
                        style={{
                            width: '70px'
                          }}
                    />
                </div>

                <div className="GraphLegend-text">
                    Corequisite: 
                    <Arrow
                        angle={45}
                        color="red"
                        length={40}
                        lineWidth={2}
                        style={{
                            width: '70px'
                          }}
                    />
                </div>

                <div className="GraphLegend-text">
                    Pre/co-requisite: 
                    <Arrow
                        angle={45}
                        color="green"
                        length={40}
                        lineWidth={2}
                        style={{
                            width: '70px'
                          }}
                    />
                </div>
            </div>
        );
    }
}

export default GraphLegend;
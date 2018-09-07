import * as React from "react";

const PolyLineStyle = {
    fill: 'none',
    // Not yet sure if this is a good property to set or not
    // vectorEffect: 'non-scaling-stroke'
}

const PathStyle = {
    fill: 'none'
}

function toRad(d: number) {
    return d * Math.PI / 180;
}

interface IArrowProps {
    length?: number;
    angle?: number;
    color?: string;
    arrowHeadFilled?: boolean;
    lineWidth?: number;
    style?: any;
}

class Arrow extends React.PureComponent<IArrowProps> {

    public static defaultProps = {
        angle: 0,
        arrowHeadFilled: true,
        color: '#231F20',
        length: 50,
        lineWidth: 1,
    };

    private static counter = 1;

    private uniqid: number;


    constructor(props: IArrowProps) {
        super(props);
        this.uniqid = Arrow.counter++;
    }

    public render() {

        const withDefaultProps = { ...Arrow.defaultProps, ...this.props }
        
        const { length, arrowHeadFilled, lineWidth, color, ...otherProps } = withDefaultProps;
        let { angle } = withDefaultProps;

        // By default, our sin math would let the angle rotate to
        // the left. Reverse the direction.
        angle = - angle + 180;
        angle = angle % 360;

        // Let's do some trig to calculate the viewbox.
        //
        // Assuming the arrow points top right, c is the arrow
        // length, a is the viewbox width, b is the viewbox height.

        // We know C is 90deg
        const B = angle;
        const C = 90;
        const A = 180 - C - B;
        const c = length;

        // Get all the sides
        const a = (c / Math.sin(toRad(C))) * Math.sin(toRad(A));
        const b = (c / Math.sin(toRad(C))) * Math.sin(toRad(B));

        // a, b can be negative if the angle. We will rewrite
        // those values to go inside the svg viewbox.
        const width = Math.abs(b);
        const height = Math.abs(a);

        const padding = 10;

        // Now we have a viewBox
        const viewBox = `0 0 ${width + padding * 2} ${height + padding * 2}`;

        function point(x: number, y: number) {
            if (b < 0) {
                x = (width + padding * 2) - x;
            }
            if (a < 0) {
                y = (height + padding * 2) - y;
            }
            return `${x},${y}`
        }

        const path = [
            `M${point(padding, padding)}`,
            `L${point(width + padding, height + padding)}`,
        ];

        // TODO: Cooler line:
        // M16.7,178 c87.6-46.9,162.9-185.4,227-136.4C307.2,90.1,195,158.5,111,108.9C71,85.2,92.2,30.7,126,7

        const markerId = `Arrow-pointer-${this.uniqid}`;

        // Based on the props, determine the styles.
        const arrowHeadStyle = {
            stroke: color,
            ...PolyLineStyle,
            strokeWidth: 0,
            
        }
        if (this.props.arrowHeadFilled) {
            arrowHeadStyle.fill = color;
        } else {
            arrowHeadStyle.strokeWidth = 1;
        }

        const lineStyle = {
            ...PathStyle,          
            stroke: color,
            strokeDasharray: "",
            strokeWidth: lineWidth,           
        }

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                {...otherProps}
            >
                <defs>
                    <marker
                        id={markerId}
                        markerWidth="9"
                        markerHeight="9"
                        refX="8"
                        refY="5"
                        orient="auto"
                        markerUnits="strokeWidth">
                        <polyline
                            points="1 1, 9 5, 1 9"
                            style={arrowHeadStyle}
                        />
                    </marker>
                </defs>
                <path
                    style={lineStyle}
                    d={path.join(' ')}
                    markerEnd={`url(#${markerId})`}
                />
            </svg>
        )
    }
}

export default Arrow;
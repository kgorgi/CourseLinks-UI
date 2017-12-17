import { Options } from "vis";

const options: Options = {
    layout: {
        improvedLayout: false,
        hierarchical: {
            enabled: true,
            levelSeparation: 100,
            nodeSpacing: 100,
            blockShifting: false,
            edgeMinimization: true,
            direction: "UD",        // UD, DU, LR, RL
            sortMethod: "directed"   // hubsize, directedF
        }
    },
    edges: {
        smooth: {
            enabled: true,
            type: "cubicBezier",
            forceDirection: "vertical",
            roundness: 0.5
        }
    },
    interaction: {
        dragNodes: false
    },
    physics: {
        enabled: false
    },
}; 

export default options;
import { Options } from "vis";

const options: Options = {
    edges: {
        smooth: {
            enabled: true,
            forceDirection: "vertical",
            roundness: 0.5,
            type: "cubicBezier",              
        }
    },
    interaction: {
        dragNodes: false
    },
    layout: {
        hierarchical: {
            blockShifting: false,
            direction: "UD",        // UD, DU, LR, RL
            edgeMinimization: true,  
            enabled: true,
            levelSeparation: 100,
            nodeSpacing: 100, 
            sortMethod: "directed"   // hubsize, directedF
        },
        improvedLayout: false,   
    },
    physics: {
        enabled: false
    },
}; 

export default options;
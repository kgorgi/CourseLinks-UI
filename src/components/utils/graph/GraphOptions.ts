import { Options } from "vis";


export const ShadowOptions = {
    color: "rgba(0,0,0,0.6)",
    enabled: true,
    size: 10,
    x: 5,
    y: 5
};

const options: Options = {
    autoResize: true,
    edges: {
        shadow: ShadowOptions,
        smooth: {
            enabled: true,
            forceDirection: "vertical",
            roundness: 0.5,
            type: "cubicBezier",              
        },
        
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
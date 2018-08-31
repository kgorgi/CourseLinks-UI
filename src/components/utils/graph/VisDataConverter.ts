import { Color } from "vis";

import IdNameMap from "./IdNameMap";

import { ICustomEdge, ICustomNode, IGraphData } from "../types/GraphTypes";
import { IGraphInfo } from "../types/ServerTypes";

class VisDataConverter {

    private nodes: ICustomNode[]  = [];
    private edges: ICustomEdge[] = [];
    private idNameMap: IdNameMap = new IdNameMap();

    constructor(graphInfo: IGraphInfo){        
        const  { idNameMap } = this;        
        
        let currNodeId = 1;

        for (const link of graphInfo.RelationsList) {
            // Create Source Node
            if (!idNameMap.has(link.Source)) {
              idNameMap.set(link.Source, currNodeId);
              currNodeId += 1;
            }
      
            // Create Destionation Node
            if (!idNameMap.has(link.Destination)) {
              idNameMap.set(link.Destination, currNodeId);
              currNodeId += 1;
            }
      
            // Set type and color
            let color = "blue";
            if (link.Type === "coreq") {
              color = "red";
            } else if (link.Type === "precoreq") {
              color = "green";
            }
      
            // Add Edge
            this.edges.push({    
                color: {
                  color,
                  highlight: color
                },
                from: idNameMap.getId(link.Destination),
                to: idNameMap.getId(link.Source),
                
                type: link.Type
            });
          }
      
          // Add Nodes
          const courseKeys = idNameMap.getAllNames();
          for (const key of courseKeys) {
            const id = idNameMap.getId(key);
            const level = graphInfo.CourseLevelsInfo[key];
      
            if (typeof id === "number") {
              const color: Color = {
                background: "#D2E5FF",
                highlight: "orange"
              };
      
              this.nodes.push({
                color,
                id,
                label: key,          
                level
              });
            } else {
              console.warn("GraphContainer: Invalid Key:", key);
            }
        }
    }

    public getIdNameMap = () => {
        return this.idNameMap;
    }

    public getGraphData = () => {
        const graphData: IGraphData = {
            edges: this.edges,
            nodes: this.nodes
        }

        return graphData;
    }
}

export default VisDataConverter;
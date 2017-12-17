import * as React from "react";

import Slide from "material-ui/transitions/Slide";

export function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}
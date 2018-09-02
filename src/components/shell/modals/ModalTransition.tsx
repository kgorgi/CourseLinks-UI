import * as React from "react";

import Slide from '@material-ui/core/Slide';

export function ModalTransition(props: any) {
    return <Slide direction="up" {...props} />;
}
import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";

import HelpText from "./HelpText";
import { ModalTransition } from "./ModalTransition";
// import CalendarSelector from "./CalendarSelector";

interface IStartModal {
    isOpen: boolean;
    onClose: () => void;
}

class StartModal extends React.PureComponent<IStartModal> {

    public render() {
        const { isOpen, onClose } = this.props;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={false}
            >
                <DialogTitle>Welcome to Course Links</DialogTitle>
                        Course Links is a website where you can find all the possible dependencies for a UVic course. <br/> <br/>
                        <b>To Use Course Links:</b> <br/> <br/>
                        <HelpText /> <br/>

                        <b> Created by Kian Gorgichuk and Amandeep Singh</b>

                <DialogActions>
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }
}

export default StartModal;
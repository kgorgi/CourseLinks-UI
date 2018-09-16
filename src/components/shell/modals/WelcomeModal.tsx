import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";

import HelpText from "./HelpText";
import LaunchStartModal from "./LaunchStartModal";
import { ModalTransition } from "./ModalTransition";

import { DialogContent, DialogContentText } from "@material-ui/core";

interface IWelcomeModalProps {
    isOpen: boolean;
    onClose: () => void; 
}

class WelcomeModal extends React.PureComponent<IWelcomeModalProps> {

    public render() {
        const { isOpen, onClose } = this.props;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={false}
                onClose={onClose}
            >
                <DialogTitle>Welcome to Course Links</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ textAlign: "center" }}>
                        Course Links is a website where you can find all the possible dependencies for a UVic course. <br/> <br/>     
                    </DialogContentText>
                    <DialogContentText><b>To Use Course Links:</b> <br/></DialogContentText>
                    <HelpText isWelcomeModal={true} />
                    <DialogContentText style={{ textAlign: "center" }}>
                        <b> Created by Kian Gorgichuk and Amandeep Singh.</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LaunchStartModal />
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }
}

export default WelcomeModal;
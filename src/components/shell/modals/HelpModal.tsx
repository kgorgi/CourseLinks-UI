import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";

import HelpText from "./controls/HelpText";
import LaunchStartModal from "./controls/LaunchStartModal";
import { ModalTransition } from "./ModalTransition";

import { DialogContent, DialogContentText } from "@material-ui/core";

const helpUrl = "https://goo.gl/forms/d2lcIC986RhyTwV63";

interface IHelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

class HelpModal extends React.Component<IHelpModalProps> {

    public render() {
        const { isOpen, onClose } = this.props;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={true}
            >
                <DialogTitle>How to Use Course Links</DialogTitle>
                <DialogContent>
                    <HelpText isWelcomeModal={false}/>
                    <DialogContentText style={{ textAlign: "center" }}><b>Supported Web Browsers:</b> Google Chrome and Firefox</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LaunchStartModal />
                    <Button onClick={this.handleContactUsClicked} variant="contained">
                        Contact Us
                    </Button>
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }

    private handleContactUsClicked = () => {
        window.open(helpUrl)
    }
}

export default HelpModal;
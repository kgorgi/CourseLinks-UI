import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";

import HelpText from "./HelpText";
import { ModalTransition } from "./ModalTransition";

interface IHelpModal {
    isOpen: boolean;
    onClose: () => void;
    onShowStartModal: () => void;
}

class HelpModal extends React.PureComponent<IHelpModal> {

    public render() {
        const { isOpen, onClose, onShowStartModal } = this.props;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={true}
            >
                <DialogTitle>How to Use Course Links</DialogTitle>
                          <HelpText />
                <DialogActions>
                    <Button onClick={onShowStartModal} variant="contained">
                        Show Start Dia
                    </Button>
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }
}

export default HelpModal;
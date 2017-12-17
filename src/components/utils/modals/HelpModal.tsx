import * as React from "react";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Button from "material-ui/Button";

import { Transition } from "./ModalTransition";

export interface HelpModalProps {
    open: boolean;
    onClose: () => void;
}

class HelpModal extends React.PureComponent<HelpModalProps> {
    render() {
        const { open, onClose } = this.props;
        return (
            <Dialog
                open={open}
                transition={Transition}
                keepMounted={true}
                onRequestClose={onClose}
            >
                <DialogTitle>{"Help"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Coming Soon!
                </DialogContentText>

                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Okay
                    </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }

}

export default HelpModal;
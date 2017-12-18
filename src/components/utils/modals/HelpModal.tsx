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

const helpUrl = "https://goo.gl/forms/d2lcIC986RhyTwV63";

class HelpModal extends React.PureComponent<HelpModalProps> {

    handleContactUs = () => {
        window.open(helpUrl);
    }

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
                        1. Enter a Course in the Title and click Search. <br />
                        2. Select nodes on the graph to see course information on the right-side panel. <br />
                        3. Click hyperlinks in the right-side panel to get more information about courses,
                           timetables, faculty information, etc. <br />
                        4. You can disable specific dependency types in the graph bar. <br />
                        5. To change academic calendars, click About and then use the dropdown menu, 
                        then click Okay. <br /> <br />
                        <b>Always double check with the official course calendar, as this is ALPHA software. </b> 
                        There may be incorrect information displayed. If you find incorrect information, 
                        please contact us. <br /> <br />
                        
                        Please note the only supported web browser currently is Google Chrome.
                </DialogContentText>
                    <DialogActions>
                        <Button onClick={this.handleContactUs} color="primary">
                            Contact Us
                        </Button>
                        <Button onClick={onClose} raised={true} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }

}

export default HelpModal;
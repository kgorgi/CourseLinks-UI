import * as React from "react";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
// import Select from "material-ui/Select";
import Button from "material-ui/Button";
// import { MenuItem } from "material-ui/Menu";

import { Transition } from "./ModalTransition";

export interface AboutModalProps {
    open: boolean;
    onClose: () => void;
    onGetStarted: () => void;
    // selectedCalendar: string;
    // onCalendarChange: () => void;
}

class AboutModal extends React.PureComponent<AboutModalProps> {
    render() {
        const {open, onClose, onGetStarted} = this.props;
        return (
            <Dialog
                open={open}
                transition={Transition}
                keepMounted={true}
                onRequestClose={onClose}
            >
                <DialogTitle>{"Welcome to Course Links!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Course Links is a website that shows you the different kind of links between UVic Courses.
                        <br /> <br />
                        Created by Kian Gorgichuk and Amandeep Singh
                        <br /> <br />
                        Select Calender:
                </DialogContentText>
    
                    {/* <Select
                        value={selectedCalendar}
                        onChange={onCalendarChange}
                        className="Title-search-box"
                        fullWidth={true}
                    >
                        <MenuItem value="Jan18">Janurary 2018</MenuItem>
                        <MenuItem value="Sept17">September 2017</MenuItem>
                    </Select> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onGetStarted} color="primary">
                        Help
                    </Button>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        ); 
    }
    
}

export default AboutModal;
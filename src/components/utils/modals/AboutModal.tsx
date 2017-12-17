import * as React from "react";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";

import { Transition } from "./ModalTransition";
import { Calendar } from "../types/ServerTypes";

export interface AboutModalProps {
    open: boolean;
    onClose: () => void;
    onGetStarted: () => void;
    currentCalendar?: string;
    calendars?: Calendar[];
    onChangeCalendar: (calendarUri: string) => void;
}

interface AboutModalState {
    selectedCalendar: string;
}

class AboutModal extends React.PureComponent<AboutModalProps> {
    state: AboutModalState = {
        selectedCalendar: ""
    };

    handleCalendarChange = (event: any) => {
        this.setState({ selectedCalendar: event.target.value });
    }

    generateAvaiableCalendars = () => {
        const elements: JSX.Element[] = [];
        const { calendars } = this.props;

        if (!calendars) {
            return null;
        }

        for (const calendar of calendars) {
            elements.push(
                <MenuItem value={calendar.uri} key={calendar.uri}>{calendar.displayName}</MenuItem>
            );
        }

        return elements;
    }

    updateCalendar = () => {
        const { currentCalendar, onChangeCalendar } = this.props;
        const { selectedCalendar } = this.state;
        if (selectedCalendar !== currentCalendar) {
            onChangeCalendar(selectedCalendar);
        }
    }

    handleCloseModal = () => {
        this.updateCalendar();
        this.props.onClose();

    }

    handleGetStarted = () => {
        this.updateCalendar();
        this.props.onGetStarted();
    }

    componentWillReceiveProps(nextProps: AboutModalProps) {
        const { currentCalendar } = this.props;
        if (nextProps.currentCalendar !== currentCalendar) {
            this.setState({ selectedCalendar: nextProps.currentCalendar });
        }
    }

    render() {
        const { open, onGetStarted } = this.props;
        const { selectedCalendar } = this.state;
        return (
            <Dialog
                open={open}
                transition={Transition}
                keepMounted={true}
                onRequestClose={this.handleCloseModal}
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

                    <Select
                        value={selectedCalendar}
                        onChange={this.handleCalendarChange}
                        className="Title-search-box"
                        fullWidth={true}
                    >
                        {this.generateAvaiableCalendars()}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onGetStarted} color="primary">
                        Help
                    </Button>
                    <Button onClick={this.handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }
}

export default AboutModal;
import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { ICalendar } from "../../utils/ServerTypes";
import CalendarSelector from "./CalendarSelector";
import { ModalTransition } from "./ModalTransition";

interface ICalendarModal {
    isOpen: boolean;
    currentCalendar?: ICalendar;
    calendars?: ICalendar[];
    onClose: (newCalendar?: ICalendar) => void;
}

interface ICalendarModalState {
    selectedCalendar?: ICalendar;
}

class CalendarModal extends React.PureComponent<ICalendarModal, ICalendarModalState> {

    public state: ICalendarModalState = {}

    public render() {
        const { isOpen, calendars } = this.props;
        const { selectedCalendar } = this.state;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={true}
                onClose={this.handleCloseModal}
            >
                <DialogContent>
                    {calendars && selectedCalendar &&
                        <CalendarSelector 
                            selectedCalendar={selectedCalendar}
                            calendars={calendars}
                            onCalendarSelected={this.handleCalendarSelected}
                        />
                    }   
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseModal}>
                        Save
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }

    public componentWillReceiveProps(nextProps: ICalendarModal) {
        const { currentCalendar } = this.props;
        if (nextProps.currentCalendar !== currentCalendar && nextProps.currentCalendar) {
            this.setState({ selectedCalendar: nextProps.currentCalendar });
        }
    }

    private handleCalendarSelected = (newCalendar: ICalendar) => {
        this.setState( {selectedCalendar: newCalendar });
    }
    
    private handleCloseModal = () => {
        const { currentCalendar, onClose } = this.props;
        const { selectedCalendar } = this.state;

        onClose(selectedCalendar !== currentCalendar ? selectedCalendar : undefined);
    }
}

export default CalendarModal;
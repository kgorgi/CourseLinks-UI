import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { ICalendar } from "../../utils/ServerTypes";
import CalendarSelector from "./CalendarSelector";
import { ModalTransition } from "./ModalTransition";

interface ICalendarModalProps {
    isOpen: boolean;
    currentCalendar?: ICalendar;
    calendars?: ICalendar[];
    onClose: (newCalendar?: ICalendar) => void;
}

class CalendarModal extends React.PureComponent<ICalendarModalProps> {

    private selectorRef: React.RefObject<CalendarSelector>;
    
    constructor(props: ICalendarModalProps) {
        super(props);
        this.selectorRef = React.createRef();
    }

    public render() {
        const { isOpen, calendars, currentCalendar } = this.props;

        return (
            <Dialog
                open={isOpen}
                TransitionComponent={ModalTransition}
                keepMounted={true}
                onClose={this.handleCloseModal}
            >
                <DialogContent>
                    <CalendarSelector 
                        currentCalendar={currentCalendar}
                        calendars={calendars}
                        ref={this.selectorRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseModal} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </ Dialog>
        );
    }

    private handleCloseModal = () => {
        const { currentCalendar, onClose } = this.props;

        if(this.selectorRef.current){
            const newCalendar = this.selectorRef.current.getSelectedCalendar();
            onClose(newCalendar !== currentCalendar ? newCalendar : undefined);
        } else {
            onClose(undefined);
        }
        
    }
}

export default CalendarModal;
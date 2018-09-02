import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { ICalendar } from "../../utils/ServerTypes";

import "./css/CalendarSelector.css";

interface ICalendarSelectorProps {
    calendars: ICalendar[];
    selectedCalendar: ICalendar;
    onCalendarSelected: (newCalendar: ICalendar) => void;
}

class CalendarSelector extends React.Component<ICalendarSelectorProps> {
    
    public render() {
        const { selectedCalendar, calendars } = this.props;

        let index = 0;
        if (calendars){
            index = calendars.indexOf(selectedCalendar);
        }    

        return (
            <div className="CalendarSelector-container">
                <b className="CalendarSelector-text">{"Select Academic Calender:"}</b>
                <Select
                    value={index}
                    className="CalendarSelector-dropdown"
                    fullWidth={false}
                    onChange={this.handleCalendarSelect}
                >
                    {this.generateAvailableCalendars()}
                </Select>
            </div>
        );
    }

    private generateAvailableCalendars = () => {
        const { calendars, selectedCalendar } = this.props;

        if (!calendars) {
            return null;
        }

        return calendars.map((calendar, index) => (
            <MenuItem
              key={calendar.displayName}
              selected={calendar === selectedCalendar}
              value={index}
            >
              {calendar.displayName}
            </MenuItem>
        ));
    }

    private handleCalendarSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { onCalendarSelected, calendars } = this.props;
        
        if(calendars) {
            onCalendarSelected(calendars[event.target.value]);
        }
    }
}

export default CalendarSelector;
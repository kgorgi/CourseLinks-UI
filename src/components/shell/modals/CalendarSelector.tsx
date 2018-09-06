import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { ICalendar } from "../../utils/ServerTypes";

import { AreCalendarsEqual } from "../../utils/ServerTypesHelperFunctions";

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
            for(const calendar of calendars){          
                if(AreCalendarsEqual(calendar, selectedCalendar)){
                    break;
                } 

                index += 1;
            }
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
        const { calendars } = this.props;

        if (!calendars) {
            return null;
        }

        return calendars.map((calendar, index) => (
            <MenuItem
              key={calendar.displayName}
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
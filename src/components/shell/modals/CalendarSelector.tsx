import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { ICalendar } from "../../utils/ServerTypes";

import { AreCalendarsEqual } from "../../utils/ServerTypesHelperFunctions";

import "./css/CalendarSelector.css";

interface ICalendarSelectorProps {
    currentCalendar?: ICalendar;
    calendars?: ICalendar[];
}

interface ICalendarSelectorState {
    selectedCalendar?: ICalendar;
}

class CalendarSelector extends React.Component<ICalendarSelectorProps, ICalendarSelectorState> {
    
    public state: ICalendarSelectorState = {}

    public render() {
        const { calendars, currentCalendar } = this.props;
        const { selectedCalendar } = this.state;

        // Check if all values are present
        if( !calendars || !selectedCalendar || !currentCalendar){
            return null;
        }

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

    public componentWillReceiveProps(nextProps: ICalendarSelectorProps) {
        const { currentCalendar } = this.props;
        if (nextProps.currentCalendar !== currentCalendar && nextProps.currentCalendar) {
            this.setState({ selectedCalendar: nextProps.currentCalendar });
        }
    }

    public getSelectedCalendar = () => {
        return this.state.selectedCalendar;
    }

    private handleCalendarSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { calendars } = this.props;
        
        if(calendars) {
            this.setState( {selectedCalendar: calendars[event.target.value] });
        }
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
}

export default CalendarSelector;
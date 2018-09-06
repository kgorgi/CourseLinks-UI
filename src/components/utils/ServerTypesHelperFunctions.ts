import { ICalendar } from "./ServerTypes";

export function AreCalendarsEqual(calendarA: ICalendar, calendarB: ICalendar){
    return calendarA.displayName === calendarB.displayName && calendarA.uri === calendarB.uri;
}
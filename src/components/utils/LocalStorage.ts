import { ICalendar } from "./ServerTypes";

const panelSizeKey = "PanelSize";
const calendarKey = "Calendar";

export function SetPanelSize(newSize: number){
    window.localStorage.setItem(panelSizeKey, newSize.toString());
}

export function GetPanelSize(): number | undefined {
    const value = window.localStorage.getItem(panelSizeKey);

    if(value != null){
        return parseInt(value, undefined);
    }

    return undefined;
}

export function SetCalendar(newCalendar: ICalendar){
    window.localStorage.setItem(calendarKey, JSON.stringify(newCalendar));
}

export function GetCalendar(): ICalendar | undefined {
    const value = window.localStorage.getItem(calendarKey);

    if(value != null){
        return JSON.parse(value) as ICalendar;
    }

    return undefined;
}
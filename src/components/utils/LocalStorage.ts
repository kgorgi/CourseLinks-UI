import { ICalendar } from "./ServerTypes";

const panelSizeKey = "PanelSize";
const calendarKey = "Calendar";
const showStartModalKey = "ShowStartModal";

class LocalStorage {
    public static SetPanelSize(newSize: number){
        window.localStorage.setItem(panelSizeKey, newSize.toString());
    }
    
    public static GetPanelSize(): number | undefined {
        const value = window.localStorage.getItem(panelSizeKey);
    
        if(value != null){
            return parseInt(value, undefined);
        }
    
        return undefined;
    }
    
    public static SetCalendar(newCalendar: ICalendar){
        window.localStorage.setItem(calendarKey, JSON.stringify(newCalendar));
    }
    
    public static GetCalendar(): ICalendar | undefined {
        const value = window.localStorage.getItem(calendarKey);
    
        if(value != null){
            return JSON.parse(value) as ICalendar;
        }
    
        return undefined;
    }
    
    public static SetShowStartModal(value: boolean){
        window.localStorage.setItem(showStartModalKey, value.toString());
    }
    
    public static GetShowStartModal() {
        const value =  window.localStorage.getItem(showStartModalKey);
    
        if (value != null){
            return !!value;
        }
    
        return true;
    }   
}

export default LocalStorage;


import Course from "./Course";
import { ICalendars, ICourseList, IGraphInfo, } from "./ServerTypes";

const baseOverride = false;
const overrideDataPath = "courselinks/data";
const overrideServer = "http://localhost";

class Network {
    
    public static SetCalendarUri = (newCalendarUri: string) => {
        Network.calendarUri = newCalendarUri;
    }

    public static LoadCourseHTML = async (course: Course) => {
        const { fieldOfStudy, courseNum } = course;
        const html = await fetch(
            Network.createUri(Network.calendarUri + "/RelationsInfo/" + fieldOfStudy, fieldOfStudy + courseNum + ".HTML")
        );
        const htmlText = await html.text();
        return htmlText;
    }

    public static LoadCourseJSON = async (course: Course) => {
        const { fieldOfStudy, courseNum } = course;
        const response = await fetch(
            Network.createUri(Network.calendarUri + "/RelationsInfo/" + fieldOfStudy, fieldOfStudy + courseNum + ".JSON")
        );
        const coursePackage = await JSON.parse(await response.text()) as IGraphInfo;
        return coursePackage;
    }

    public static LoadCoursesListJSON = async () => {
        const response = await fetch(Network.createUri(Network.calendarUri + "/RelationsInfo", "Courses.JSON"));
        const coursesList = await JSON.parse(await response.text()) as ICourseList;
        return coursesList;
    }

    public static LoadCalendarJSON = async () => {
        const response = await fetch(Network.createUri("", "Calendars.json"));
        const dataObject = await JSON.parse(await response.text()) as ICalendars;
        return dataObject.available;
    }

    private static calendarUri: string = "";

    private static createUri = (filePath: string, fileName: string) => {
        // Resolve Hosted Path
        let server = window.location.origin;
        const pathname = window.location.pathname;
    
        let newPathName = pathname;
        if (pathname !== "/") {
            const pathArray = pathname.split("/");
            pathArray.pop();
            newPathName = pathArray.join("/") + "/data";
        } else {
            newPathName = "data";
        }
    
        // Check Override
        if (baseOverride) {
            newPathName = overrideDataPath;
            server = overrideServer;
        }
    
        const newfilePath = filePath ? filePath + "/" : "";
    
        if (server.lastIndexOf("/") !== server.length - 1) {
            server = server + "/";
        }
    
        return server + newPathName + "/" + newfilePath + fileName;
    }
}

export default Network;
import Course from "./Course";
import { ICalendars, ICourseList, IGraphInfo, } from "./types/ServerTypes";

const baseOverride = true;
const overrideDataPath = "courselinks/data";
const overrideServer = "http://localhost";

export async function LoadCourseHTML(course: Course, calendar: string) {
    const { fieldOfStudy, courseNum } = course;
    const html = await fetch(
        createUri(calendar + "/RelationsInfo/" + fieldOfStudy, fieldOfStudy + courseNum + ".html")
    );
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course, calendar: string) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(
        createUri(calendar + "/RelationsInfo/" + fieldOfStudy, fieldOfStudy + courseNum + ".json")
    );
    const coursePackage = await JSON.parse(await response.text()) as IGraphInfo;
    return coursePackage;
}

export async function LoadCoursesListJSON(calendar: string) {
    const response = await fetch(createUri(calendar + "/RelationsInfo", "courses.json"));
    const coursesList = await JSON.parse(await response.text()) as ICourseList;
    return coursesList;
}

export async function LoadCalendarJSON() {
    const response = await fetch(createUri("", "calendars.json"));
    const dataObject = await JSON.parse(await response.text()) as ICalendars;
    return dataObject.available;
}

function createUri(filePath: string, fileName: string) {
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
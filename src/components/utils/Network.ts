
import { GraphInfo, CourseList, Calendars } from "./ServerTypes";
import Course from "./Course";

export async function LoadCourseHTML(course: Course, calendar: string) {
    const { fieldOfStudy, courseNum } = course;
    const html = await fetch(getBasepath(calendar + "/courses/" + fieldOfStudy, fieldOfStudy + courseNum + ".html"));
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course, calendar: string) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(
        getBasepath(calendar + "/courses/" + fieldOfStudy, fieldOfStudy + courseNum + ".json")
    );
    const coursePackage = await JSON.parse(await response.text()) as GraphInfo;
    return coursePackage;
}

export async function LoadCoursesListJSON(calendar: string) {
    const response = await fetch(getBasepath(calendar + "/courses", "courses.json"));
    const coursesList = await JSON.parse(await response.text()) as CourseList;
    return coursesList;
}

export async function LoadCalendarJSON() {
    const response = await fetch(getBasepath("", "calendars.json"));
    const dataObject = await JSON.parse(await response.text()) as Calendars;
    return dataObject.available;
}

const baseOverride = false;
const overrideUrl = "http://amandeep-laptop/data/RelationsInfo";

function getBasepath(filePath: string, fileName: string) {
    // Resolve Hosted Path
    const server = window.location.origin;
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
        newPathName = overrideUrl;
    }

    return server + "/" + newPathName + "/" + filePath + "/" + fileName;
}

import { GraphInfo, CourseList } from "./ServerTypes";
import Course from "./Course";

export async function LoadCourseHTML(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const html = await fetch(getBasepath("courses" + fieldOfStudy, fieldOfStudy + courseNum, false));
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(getBasepath("courses/" + fieldOfStudy, fieldOfStudy + courseNum, true));
    const coursePackage = await JSON.parse(await response.text()) as GraphInfo;
    return coursePackage;
}

export async function LoadCoursesListJSON() {
    const response = await fetch(getBasepath("courses", "courses", true));
    const coursesList = await JSON.parse(await response.text()) as CourseList;
    return coursesList;
}

const baseOverride = false;
const overrideUrl = "http://amandeep-laptop/data/RelationsInfo";

function getBasepath(filePath: string, fileName: string, isJson: boolean) {
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

    const fileType = isJson ? ".json" : ".html";

    return server + "/" + newPathName + "/" + filePath + "/" + fileName + fileType;
}
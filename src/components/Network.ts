
import { Course, GraphInfo } from "./Course";

// const serverUrl = "http://localhost/RelationsInfo/";
const serverUrl = "http://localhost/RelationsInfo/";

export async function LoadCourseHTML(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const html =  await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".html");
    if (!html.ok) {
        throw Error(html.statusText);
    }
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".json");
    const coursePackage = await JSON.parse(await response.text()) as GraphInfo;
    return coursePackage;
}
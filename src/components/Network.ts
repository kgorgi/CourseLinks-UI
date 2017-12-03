
import { Course } from "./Course";

const serverUrl = "http://localhost/";

export async function LoadCourseHTML(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const html =  await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".html");
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".json");
    const payload = await JSON.parse(await response.text());
    return payload;
}
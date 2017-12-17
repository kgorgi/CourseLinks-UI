
import { Course, GraphInfo, CourseList } from "./Course";

// const serverUrl = "http://localhost/RelationsInfo/";
const serverUrl = "http://amandeep-laptop/Data/RelationsInfo/";

export async function LoadCourseHTML(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const html =  await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".html");
    const htmlText = await html.text();
    return htmlText;
}

export async function LoadCourseJSON(course: Course) {
    const { fieldOfStudy, courseNum } = course;
    const response = await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".json");
    const coursePackage = await JSON.parse(await response.text()) as GraphInfo;
    coursePackage.course = course;
    return coursePackage;
}

export async function LoadCoursesListJSON() {
    const response = await fetch(serverUrl + "courses.json");
    const coursesList = await JSON.parse(await response.text()) as CourseList;
    return coursesList;
}
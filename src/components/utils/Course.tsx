export const CourseRegex = /^ *([A-Z|a-z]{2,4}) *(\d{3}) *$/;

class Course {
    public name: string;
    public fieldOfStudy: string;
    public courseNum: string;

    constructor(name: string, num?: string) {
        if (!num) {
            const courseSpilt = name.split(" ");
            this.name = name;
            this.fieldOfStudy = courseSpilt[0];
            this.courseNum = courseSpilt[1];
        } else {
            this.name = name + " " + num;
            this.fieldOfStudy = name;
            this.courseNum = num;
        }
    }

    equals = (otherCourse: Course) => {
        return this.name === otherCourse.name;
    }
}

export default Course;
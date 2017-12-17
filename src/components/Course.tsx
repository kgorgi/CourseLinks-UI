export class Course {
    public name: string;
    public fieldOfStudy: string;
    public courseNum: string;

    constructor(name: string) {
        const courseSpilt = name.split(" ");
        this.name = name;
        this.fieldOfStudy = courseSpilt[0];
        this.courseNum = courseSpilt[1];
    }
}

export interface Course {
    name: string;
    fieldOfStudy: string;
    courseNum: string;
}

export interface CourseLink {
    Source: string;
    Destination: string;
    Type: string;
}

export interface GraphInfo {
    RelationsList: CourseLink[];
    CourseLevelsInfo: { [course: string]: number };
    course: Course;
}

export interface Node {
    CourseId: string;
    Level: number;
}

export const courseRegex = /^ *([A-Z|a-z]{2,4}) *(\d{3}) *$/;

export class DependencyTypes {
    public preReq: boolean;
    public coReq: boolean;
    public precoReq: boolean;

    constructor(preReq: boolean, coReq: boolean, precoReq: boolean) {
        this.preReq = preReq;
        this.coReq = coReq;
        this.precoReq = precoReq;
    }

    getCount = () => {
        let count = 0;
        if (this.preReq) {
            count += 1;
        }

        if (this.coReq) {
            count += 1;
        }

        if (this.precoReq) {
            count += 1;
        }

        return count;
    }

    createCopy = () => {
        const { preReq, coReq, precoReq } = this;
        return new DependencyTypes(preReq, coReq, precoReq);
    }
}

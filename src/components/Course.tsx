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
    CourseLevelsInfo: Node[];
}

export interface Node {
    CourseId: string;
    Level: number;
}

export class DependencyTypes {
    public preReq: boolean;
    public coReq: boolean;
    public precoReq: boolean;

    constructor(preReq: boolean, coReq: boolean, precoReq: boolean) {
        this.preReq = preReq;
        this.coReq = coReq;
        this.precoReq = precoReq;
    }
}

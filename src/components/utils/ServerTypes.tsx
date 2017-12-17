export interface CourseLink {
    Source: string;
    Destination: string;
    Type: string;
}

export interface GraphInfo {
    RelationsList: CourseLink[];
    CourseLevelsInfo: { [course: string]: number };
}

export interface Node {
    CourseId: string;
    Level: number;
}

export interface CourseList {
    Courses: string[];
}

export interface Calenders {
    available: Calender[];
}

export interface Calender {
    displayName: string;
    uri: string;
}

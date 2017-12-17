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

export interface Calendars {
    available: Calendar[];
}

export interface Calendar {
    displayName: string;
    uri: string;
}

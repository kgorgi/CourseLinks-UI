export interface ICourseLink {
    Source: string;
    Destination: string;
    Type: string;
}

export interface IGraphInfo {
    RelationsList: ICourseLink[];
    CourseLevelsInfo: { [course: string]: number };
}

export interface INode {
    CourseId: string;
    Level: number;
}

export interface ICourseList {
    Courses: string[];
}

export interface ICalendars {
    available: ICalendar[];
}

export interface ICalendar {
    displayName: string;
    uri: string;
}
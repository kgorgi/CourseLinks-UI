import * as React from "react";

import Course from "../utils/Course";
import { LoadCourseHTML } from "../utils/Network";

import "./css/CourseInfoPanel.css";

export interface CourseInfoProps {
    course?: Course;
    onCourseLinkClick: (text: string, link: string) => void;
    calendarUri?: string;
}

const startHTML = "<h1 class=\"subject-and-number\">No Course Selected</h1>";
const errorHTML = "<h1 class=\"subject-and-number\">Error Cannot Load Course</h1>";

const iframeUrl = `${process.env.PUBLIC_URL}/infopanel.html`;

class CourseInfoPanel extends React.PureComponent<CourseInfoProps> {
    private _iframe: HTMLIFrameElement | null = null;
    private _div: HTMLDivElement | null = null;

    componentDidUpdate(prevProps: CourseInfoProps) {
        if (this._iframe && prevProps.course !== this.props.course) {
            this.loadCourse();
        }
    }

    handleOnLinkClick = (text?: string, link?: string) => {
        if (text && link) {
            this.props.onCourseLinkClick(text, link);
        }
    }

    handleOnLoad = () => {
        if (!this._iframe) {
            return;
        }

        // Add callBack to iframe
        const win: any = this._iframe.contentDocument.defaultView;
        win.onLinkClick = this.handleOnLinkClick;

        // Set div reference
        const divs = this._iframe.contentDocument.body.getElementsByTagName("div");
        if (divs.length > 0) {
            this._div = divs[0];
        }

        this.loadCourse();
    }

    setDivContent = (content: string) => {
        if (this._div) {
            this._div.innerHTML = content;
        }

    }

    loadCourse = async () => {
        const { course, calendarUri } = this.props;

        if (course && calendarUri) {
            try {
                this.setDivContent(await LoadCourseHTML(course, calendarUri));
            } catch {
                this.setDivContent(errorHTML);
            }
        } else {
            this.setDivContent(startHTML);
        }
    }

    handleRefCallback = (iframe: HTMLIFrameElement) => {
        this._iframe = iframe;
    }

    render() {
        return (
            <div className="CourseInfo-iframe-wrapper">
                <iframe
                    ref={this.handleRefCallback}
                    src={iframeUrl}
                    className="CourseInfo-iframe"
                    onLoad={this.handleOnLoad}
                />
            </div>
        );
    }

}

export default CourseInfoPanel;

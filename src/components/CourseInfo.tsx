import * as React from "react";
import { Course } from "./Course";
import { LoadCourseHTML } from "./Network";

import "./css/CourseInfo.css";

export interface CourseInfoProps {
    course?: Course;
    onCourseLinkClick: (text: string, link: string) => void;
}

const startHTML = "<h1 class=\"subject-and-number\">No Course Selected</h1>";
const errorHTML = "<h1 class=\"subject-and-number\">Error Cannot Load Course</h1>";

class CourseInfo extends React.PureComponent<CourseInfoProps> {
    private _iframe: HTMLIFrameElement | null = null;

    componentDidUpdate() {
        if (this._iframe) {
            this._iframe.contentDocument.location.reload();
        }
    }

    handleOnLinkClick = (text?: string, link?: string) => {
        if (text && link) {
            this.props.onCourseLinkClick(text, link);
        }        
    }

    loadCourse = async () => {
        const { course } = this.props;

        if (!this._iframe) {
            return;
        }
        const win: any = this._iframe.contentDocument.defaultView;
        win.onLinkClick = this.handleOnLinkClick;

        const divs = this._iframe.contentDocument.body.getElementsByTagName("div");
        const div = divs[0];

        if (course) {
            try {
                div.innerHTML = await LoadCourseHTML(course);
            } catch {
                div.innerHTML = errorHTML;
            }

        } else {
            div.innerHTML = startHTML;
        }
    }

    render() {
        return (
            <div className="CourseInfo-iframe-wrapper">
                <iframe
                    ref={ref => this._iframe = ref}
                    src={"./info.html"}
                    className="CourseInfo-iframe"
                    onLoad={this.loadCourse}
                />
            </div>
        );
    }

}

export default CourseInfo;

import * as React from "react";
import { Course } from "./Course";
import { LoadCourseHTML } from "./Network";

import "./css/CourseInfo.css";

export interface CourseInfoProps {
    course?: Course;
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

    loadCourse = async () => {
        const { course } = this.props;

        if (!this._iframe) {
            return;
        }

        if (course) {
            try {
                this._iframe.contentDocument.body.innerHTML = await LoadCourseHTML(course);
            } catch {
                this._iframe.contentDocument.body.innerHTML = errorHTML;
            }
           
        } else {
            this._iframe.contentDocument.body.innerHTML = startHTML;
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

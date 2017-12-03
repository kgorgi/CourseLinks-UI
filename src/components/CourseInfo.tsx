import * as React from "react";
import { Course } from "./Course";

import "./css/CourseInfo.css";

export interface CourseInfoProps {
    course?: Course;
}


const serverUrl = "http://amandeep-laptop/Data/";
class CourseInfo extends React.PureComponent<CourseInfoProps> {
    private _iframe: HTMLIFrameElement | null = null;

    componentDidUpdate() {
        if (this._iframe) {
            this._iframe.contentDocument.location.reload();
        }
    }

    loadCourse = async () => {
        const { course } = this.props;
        if (!course) {
          return;
        }
    
        const { fieldOfStudy, courseNum } = course;

        const html = await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".html");
        if (this._iframe ) {
            this._iframe.contentDocument.body.innerHTML = await html.text();
        }
    }

    render() {
        const { course } = this.props;
        if (course) {
            return <iframe ref={ref => this._iframe = ref} src={"./info.html"} className="CourseInfo-iframe" onLoad={this.loadCourse} />;
        } else {
            return <div> No Course Selected </div>;
        }
    }
}

export default CourseInfo;

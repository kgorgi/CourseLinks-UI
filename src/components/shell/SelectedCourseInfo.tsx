import * as React from "react";

import Course from "../utils/Course";
import Network from "../utils/Network";

import "./css/SelectedCourseInfo.css";

export interface ISelectCourseInfoProps {
    course?: Course;
    onCourseLinkClick: (text: string, link: string) => void;
    isResizing: boolean;
}

const startHTML = "<h1 class=\"subject-and-number\">No Course Selected</h1>";
const errorHTML = "<h1 class=\"subject-and-number\">Error Cannot Load Course</h1>";

const iframeUrl = `${process.env.PUBLIC_URL}/infopanel.html`;

class CourseInfoPanel extends React.PureComponent<ISelectCourseInfoProps> {
    private iframe: HTMLIFrameElement | null = null;
    private div: HTMLDivElement | null = null;

    public render() {
        const { isResizing } = this.props;
        
        if(!isResizing){
            return (
                <div className="SelectedCourseInfo-iframe-wrapper">
                    <iframe
                        ref={this.handleRefCallback}
                        src={iframeUrl}
                        className="SelectedCourseInfo-iframe"
                        onLoad={this.handleOnLoad}
                    />
                </div>
            );
        } else {
            return (
                <div className="SelectedCourseInfo-resizingWrapper">
                    <h1 className="SelectedCourseInfo-resizingMessage">Resizing Panel</h1> 
                </div>
            );
        }
    }

    public componentDidUpdate(prevProps: ISelectCourseInfoProps) {
        if (this.iframe && prevProps.course !== this.props.course) {
            this.loadCourse();
        }
    }

    private handleOnLinkClick = (text?: string, link?: string) => {
        if (text && link) {
            this.props.onCourseLinkClick(text, link);
        }
    }

    private handleOnLoad = () => {
        if (!this.iframe || !this.iframe.contentDocument) {
            return;
        }

        // Add callBack to iframe
        const win: any = this.iframe.contentDocument.defaultView;
        win.onLinkClick = this.handleOnLinkClick;

        // Set div reference
        const divs = this.iframe.contentDocument.body.getElementsByTagName("div");
        if (divs.length > 0) {
            this.div = divs[0];
        }

        this.loadCourse();
    }

    private handleRefCallback = (iframe: HTMLIFrameElement) => {
        this.iframe = iframe;
    }

    private loadCourse = async () => {
        const { course } = this.props;

        if (course) {
            try {
                this.setDivContent(await Network.LoadCourseHTML(course));
            } catch {
                this.setDivContent(errorHTML);
            }
        } else {
            this.setDivContent(startHTML);
        }
    }

    private setDivContent = (content: string) => {
        if (this.div) {
            this.div.innerHTML = content;
        }
    }
}

export default CourseInfoPanel;
import * as React from "react";
import Button from "./ui/Button";
import { Course } from "./Course";

import "./css/Title.css";

export interface TitleProps {
    selectedCourse?: Course;
    onSearch: (newCourse: string) => void;
}

interface TitleState {
    searchText: string;
}

class Title extends React.Component<TitleProps, TitleState> {
    state: TitleState = {
        searchText: ""
    };

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        this.setState({ searchText });
    }

    handleSearch = () => {
        this.props.onSearch(this.state.searchText);
    }

    render() {
        const { selectedCourse } = this.props; 

        return (
            <div className="Title">
                <div className="Title-name"> Course Link </div>
                <div className="Title-middle">
                    <div className="Title-search-text"> Enter a Course: </div>
                    <div className="Title-search-box">
                        <input value={this.state.searchText} onChange={this.handleUserInput} />
                    </div>
                    <Button raised={true} className="Title-search-button" onClick={this.handleSearch} >
                        Search
                    </Button>
                    <div className="Title-selected-course"> 
                        Searched Course: {selectedCourse ? selectedCourse.name : "None" } 
                    </div>
                </div>
                <Button raised={true} className="Title-about-button">About</Button>
            </div >
        );
    }
}

export default Title;

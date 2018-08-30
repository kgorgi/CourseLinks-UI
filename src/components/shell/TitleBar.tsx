import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import "./css/TitleBar.css";


class Titlebar extends React.Component {
    public render() {
        return (
            <div className="TitleBar">
                <div className="TitleBar-name"> Course Links </div>
                <div className="TitleBar-search">
                    <div className="TitleBar-searchBox">
                        <TextField className="TitleBar-searchInput"/>
                    </div>
                    <Button variant="contained">
                        Search
                    </Button>
                </div>
                <div className="TitleBar-calendar">
                    <div className="TitleBar-calendarName"> Spring 2018 </div>                    
                    <Button variant="contained">
                        Switch Calendar
                    </Button>
                </div>
                
                <Button variant="contained" >
                    Help
                </Button>                            
            </div>
        );
    }
}

export default Titlebar;
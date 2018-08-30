import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import TitleBar from "./TitleBar";

import './css/App.css';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <TitleBar />
      </React.Fragment>
    );
  }
}

export default App;

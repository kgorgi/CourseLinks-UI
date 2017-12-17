import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/shell/App";
import registerServiceWorker from "./registerServiceWorker";
import "./css/index.css";

ReactDOM.render(
  <App />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();

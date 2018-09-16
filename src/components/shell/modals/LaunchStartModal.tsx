import * as React from "react";

import LocalStorage from "../../utils/LocalStorage";

import Checkbox from "@material-ui/core/Checkbox";

import "./css/LaunchStartModal.css";

interface ILaunchStartModalState {
    isChecked: boolean;
}

class LaunchStartModal extends React.Component<{}, ILaunchStartModalState> {

    public state: ILaunchStartModalState = {
        isChecked: true,
    }

    public render() {
        return (
            <div onClick={this.handleCheckboxClicked} className="LaunchStartModal">
                <Checkbox
                    checked={this.state.isChecked}
                    value="checkedB"
                    color="primary"
                />
                <span className="LaunchStartModal-text">Show Welcome Dialog on Startup</span>
            </div>
        );
    }

    public componentDidMount() {
        const showModal = LocalStorage.GetShowStartModal();
        this.setState({ isChecked: showModal });
    }

    private handleCheckboxClicked = () => {
        const opposite = !this.state.isChecked;
        this.setState({ isChecked: opposite });
        LocalStorage.SetShowStartModal(opposite);
    }
}

export default LaunchStartModal;
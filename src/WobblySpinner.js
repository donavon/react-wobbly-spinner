import React from "react";
import { propTypes, defaultProps } from "./WobblySpinner.props";
import * as styleSheetFactory from "./styleSheetFactory";

export default class WobblySpinner extends React.Component {
    static propTypes = propTypes
    static defaultProps = defaultProps

    componentWillMount() {
        this._wobblySpinnerStyleSheet = styleSheetFactory.create(this.props);
    }

    shouldComponentUpdate(nextProps) {
        return !styleSheetFactory.doesCompatibleSheetExist(nextProps);
    }

    componentWillUpdate(nextProps) {
        this._prevStyleSheet = this._wobblySpinnerStyleSheet; // So we can destroy it later in `componentDidUpdate`.
        this._wobblySpinnerStyleSheet = styleSheetFactory.create(nextProps);
    }

    render() {
        return <div className={this._wobblySpinnerStyleSheet.className} />;
    }

    componentDidUpdate() {
        styleSheetFactory.destroy(this._prevStyleSheet);
        delete this._prevStyleSheet;
    }

    componentWillUnmount() {
        styleSheetFactory.destroy(this._wobblySpinnerStyleSheet);
        delete this._wobblySpinnerStyleSheet;
    }
}

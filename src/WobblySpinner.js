import React from "react";
import { propTypes, defaultProps } from "./WobblySpinner.props";
import * as styleSheetFactory from "./styleSheetFactory";
import prvt from "./privateProperty";

export default class WobblySpinner extends React.Component {
    static propTypes = propTypes
    static defaultProps = defaultProps

    get className() {
        return prvt(this).wobblySpinnerStyleSheet.className;
    }

    componentWillMount() {
        prvt(this).wobblySpinnerStyleSheet = styleSheetFactory.create(this.props);
    }

    shouldComponentUpdate(nextProps) {
        return !styleSheetFactory.doesCompatibleSheetExist(nextProps);
    }

    componentWillUpdate(nextProps) {
        prvt(this).prevStyleSheet = prvt(this).wobblySpinnerStyleSheet; // So we can destroy it later in `componentDidUpdate`.
        prvt(this).wobblySpinnerStyleSheet = styleSheetFactory.create(nextProps);
    }

    render() {
        return <div className={this.className} />;
    }

    componentDidUpdate() {
        styleSheetFactory.destroy(prvt(this).prevStyleSheet);
        // delete this._prevStyleSheet;
    }

    componentWillUnmount() {
        styleSheetFactory.destroy(prvt(this).wobblySpinnerStyleSheet);
        // delete this._wobblySpinnerStyleSheet;
    }
}

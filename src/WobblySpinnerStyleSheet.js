import createRulesFromProps from "./createRulesFromProps";
import jss from "jss";
import nested from "jss-nested";

jss.use(nested()); // Allow for `&::after` in rules.

function createHashFromProps(props) {
    return ["diameter","thickness","spinRate","wobbleOffset","outerColor","innerColor","wobbleColor"].map((key) => props[key]).join("|");
}

export default class WobblySpinnerStyleSheet {

    constructor(props) {
        this._rulesHash = createHashFromProps(props);
        this._rules = createRulesFromProps(props);
    }

    get hash() {
        return this._rulesHash;
    }

    get className() {
        return this._className;
    }

    mount() {
        var sheet = jss.createStyleSheet(this._rules, {meta: "WobblySpinner"});
        sheet.attach();
        this._className = sheet.classes.spinner;
        this._sheet = sheet;
        return this;
    }

    unmount() {
        this._sheet.detach();
        this._sheet = null;
    }
}

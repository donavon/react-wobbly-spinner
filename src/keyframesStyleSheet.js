import keyframesRules from "./keyframesRules";
import jss from "jss";

var keyframesStyleSheet = null;

export function mount() {
    if (!keyframesStyleSheet) {
        keyframesStyleSheet = jss.createStyleSheet(keyframesRules, {meta: "WobblySpinner:keyframes"});
    }
    keyframesStyleSheet.attach();
}

export function unmount() {
    keyframesStyleSheet.detach();
}

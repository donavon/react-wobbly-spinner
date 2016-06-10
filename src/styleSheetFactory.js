import * as keyframesStyleSheet from "./keyframesStyleSheet";
import WobblySpinnerStyleSheet from "./WobblySpinnerStyleSheet";

var sheetMap = new Map(); // Map of `sheet` objects, indexed by sheet.hash.

export function doesCompatibleSheetExist(props) {
    var wobblySpinnerStyleSheet = new WobblySpinnerStyleSheet(props);
    return sheetMap.has(wobblySpinnerStyleSheet.hash);
}

export function create(props) {
    if (sheetMap.size === 0) {
        keyframesStyleSheet.mount();
    }
    var wobblySpinnerStyleSheet = new WobblySpinnerStyleSheet(props);
    if (sheetMap.has(wobblySpinnerStyleSheet.hash)) { // If we already have one...
        wobblySpinnerStyleSheet = sheetMap.get(wobblySpinnerStyleSheet.hash); // Use it (it's already mounted).
    } else {
        wobblySpinnerStyleSheet.mount();
        wobblySpinnerStyleSheet.referenceCount = 0;
    }
    wobblySpinnerStyleSheet.referenceCount++;
    sheetMap.set(wobblySpinnerStyleSheet.hash, wobblySpinnerStyleSheet);
    return wobblySpinnerStyleSheet;
}

export function destroy(wobblySpinnerStyleSheet) {
    wobblySpinnerStyleSheet.referenceCount--;
    if (wobblySpinnerStyleSheet.referenceCount === 0) {
        sheetMap.delete(wobblySpinnerStyleSheet.hash);
        wobblySpinnerStyleSheet.unmount();
        if (sheetMap.size === 0) {
            keyframesStyleSheet.unmount();
        }
    } else {
        sheetMap.set(wobblySpinnerStyleSheet.hash, wobblySpinnerStyleSheet);
    }
}

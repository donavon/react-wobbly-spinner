// Some nifty little helpers.
// TODO Probably not, but consider using `jss-default-unit` plugin.
function applyCssSuffix(suffix, val) {
    return val ? val + suffix : "0";
}
const px = applyCssSuffix.bind(null, "px");
const ms = applyCssSuffix.bind(null, "ms");

function animation(rate) {
    return ms(rate) + " react-wobbly-spinner-keyframes linear infinite";
}

export default function ({ diameter, thickness, spinRate, wobbleOffset, outerColor, innerColor, wobbleColor }) {

    var afterTopLeft = -thickness + wobbleOffset;
    var wobbleRate = spinRate * 1.5;
    var borderRadius = (diameter + (thickness * 2)) / 2;

    var spinAnimation = animation(spinRate);
    var wobbleAnimation = animation(wobbleRate);
    return {
        "spinner": {
            position: "relative",
            display: "inline-block",
            "vertical-align": "middle",
            height: px(diameter), // TODO consider using jss-default-unit
            width: px(diameter),
            border: px(thickness) + " solid " + innerColor,
            "border-bottom-color": "transparent",
            "border-radius": px(borderRadius),
            "-webkit-animation": spinAnimation, // TODO consider using jss-vendor-prefixer
            animation: spinAnimation,
            "box-shadow": "0 0 0 " + px(thickness) + " " + outerColor,
            "&::after": {
                content: "''",
                position: "absolute",
                height: "100%",
                width: "100%",
                top: px(afterTopLeft),
                left: px(afterTopLeft),
                border: px(thickness) + " solid " + wobbleColor,
                "border-bottom-color": "transparent",
                "border-radius": px(borderRadius),
                "-webkit-animation": wobbleAnimation,
                animation: wobbleAnimation
            }
        }
    };
}

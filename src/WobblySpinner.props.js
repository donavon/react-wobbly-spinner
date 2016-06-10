import { PropTypes } from "react";

export const propTypes = {
    diameter: PropTypes.number,
    thickness: PropTypes.number,
    spinRate: PropTypes.number,
    wobbleOffset: PropTypes.number,
    outerColor: PropTypes.string,
    innerColor: PropTypes.string,
    wobbleColor: PropTypes.string
};

export const defaultProps = {
    diameter: 62,
    thickness: 1,
    spinRate: 1000,
    wobbleOffset: 1,
    outerColor: "yellow",
    innerColor: "magenta",
    wobbleColor: "cyan"
};

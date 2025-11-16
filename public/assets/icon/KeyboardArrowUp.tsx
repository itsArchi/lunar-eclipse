import * as React from "react";
import { SVGProps } from "react";
const SvgKeyboardArrowUp = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full fill-inherit"
        {...props}
    >
        <g clipPath="url(#keyboard_arrow_up_svg__a)">
            <path
                d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z"
                fill="currentFill"
            />
        </g>
        <defs>
            <clipPath id="keyboard_arrow_up_svg__a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgKeyboardArrowUp;

import React from "react";

// source: https://reactsvgicons.com/
const ICONS = {
  eye: {
    render: (
      <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
    ),
  },
  "eye-hide": {
    render: (
      <>
        <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
        <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
      </>
    ),
  },
  error: {
    render: (
      <>
        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 00.054 1.968A1.984 1.984 0 004.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 00.054-1.968L13.768 4.2zM4.661 19L12 5.137 19.344 19H4.661z" />
      </>
    ),
  },
  close: {
    render: (
      <path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z" />
    ),
    viewBox: "0 0 512 512",
  },
  menu: {
    render: (
      <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
    ),
  },
};

function SVGIcon(props) {
  const {
    icon,
    fill = "currentColor",
    height = "1em",
    width = "1em",
    viewBox = "0 0 1024 1024",
  } = props;
  const match = Object.entries(ICONS).find((ic) => ic[0] === icon);
  return (
    <>
      {match && (
        <svg
          viewBox={match[1].viewBox || viewBox}
          fill={fill}
          height={height}
          width={width}
        >
          {match[1].render}
        </svg>
      )}
    </>
  );
}

export default SVGIcon;

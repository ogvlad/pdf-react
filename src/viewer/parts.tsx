import React from "react";
import styled from '@emotion/styled';

export const ContainerDiv = styled("div")({
    position: "absolute",
    border: "1px solid white",
    left: "10%",
    width: "70%",
    height: "500px",
    overflow: "auto",
})

export const ViewerDiv = styled.div`
  
  position: "relative";

  :root {
    --highlight-bg-color: rgba(180, 0, 170, 1);
    --highlight-selected-bg-color: rgba(0, 100, 0, 1);
  }

  @media screen and (forced-colors: active) {
    :root {
      --highlight-bg-color: Highlight;
      --highlight-selected-bg-color: ButtonText;
    }
  }

  .page {
    direction: ltr;
    width: 816px;
    height: 1056px;
    margin: var(--page-margin);
    position: relative;
    overflow: visible;
    border: var(--page-border);
    background-clip: content-box;
    background-color: rgba(255, 255, 255, 1);
  }

  .textLayer {
    position: absolute;
    text-align: initial;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.25;
    line-height: 1;
    text-size-adjust: none;
    forced-color-adjust: none;
    transform-origin: 0 0;
    z-index: 2;
  }

  .textLayer span,
  .textLayer br {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }

  /* Only necessary in Google Chrome, see issue 14205, and most unfortunately
   * the problem doesn't show up in "text" reference tests. */
  .textLayer span.markedContent {
    top: 0;
    height: 0;
  }

  .textLayer .highlight {
    margin: -1px;
    padding: 1px;
    background-color: var(--highlight-bg-color);
    border-radius: 4px;
  }

  .textLayer .highlight.appended {
    position: initial;
  }

  .textLayer .highlight.begin {
    border-radius: 4px 0 0 4px;
  }

  .textLayer .highlight.end {
    border-radius: 0 4px 4px 0;
  }

  .textLayer .highlight.middle {
    border-radius: 0;
  }

  .textLayer .highlight.selected {
    background-color: var(--highlight-selected-bg-color);
  }

  .textLayer ::selection {
    /*#if !MOZCENTRAL*/
    background: blue;
    /*#endif*/
    background: AccentColor;
  }

  /* Avoids https://github.com/mozilla/pdf.js/issues/13840 in Chrome */
  .textLayer br::selection {
    background: transparent;
  }

  .textLayer .endOfContent {
    display: block;
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    bottom: 0;
    z-index: -1;
    cursor: default;
    user-select: none;
  }

  .textLayer .endOfContent.active {
    top: 0;
  }

`

export const ViewerDiv2 = styled("div")({
    position: "relative",
    //
    // ".page": {
    //     direction: "ltr",
    //     position: "relative",
    //     overflow: "visible",
    // },
    //
    // ".textLayer": {
    //     position: "absolute",
    //     left: 0,
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     overflow: "hidden",
    //     lineHeight: 1,
    //     opacity: .3,
    //
    //     "span": {
    //         color: "transparent",
    //         position: "absolute",
    //         whiteSpace: "pre",
    //         transformOrigin: "0% 0%",
    //         border: "solid 1px rgba(255, 0, 0, 0.5)",
    //         backgroundColor: "rgba(255, 255, 32, 0.1)",
    //         boxSizing: "border-box"
    //     },
    //     "span::selection": {
    //         backgroundColor: "blue",
    //     },
    //     "br": {
    //         color: "black",
    //         position: "absolute",
    //         whiteSpace: "pre",
    //         transformOrigin: "0% 0%",
    //         border: "solid 1px rgba(255, 0, 0, 0.5)",
    //         backgroundColor: "rgba(255, 255, 32, 0.1)",
    //         boxSizing: "border-box"
    //     }
    // }
})

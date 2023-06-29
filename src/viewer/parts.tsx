import React from "react";
import { styled } from "@mui/material"

export const ContainerDiv = styled("div")({
    position: "absolute",
    border: "1px solid white",
    left: "10%",
    width: "70%",
    height: "500px",
    overflow: "auto",
})

export const ViewerDiv = styled("div")({
    position: "relative",

    ".page": {
        direction: "ltr",
        position: "relative",
        overflow: "visible",
    },

    ".textLayer": {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        lineHeight: 1,
        opacity: .3,

        "span": {
            color: "transparent",
            position: "absolute",
            whiteSpace: "pre",
            transformOrigin: "0% 0%",
            border: "solid 1px rgba(255, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 255, 32, 0.1)",
            boxSizing: "border-box"
        },
        "br": {
            color: "black",
            position: "absolute",
            whiteSpace: "pre",
            transformOrigin: "0% 0%",
            border: "solid 1px rgba(255, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 255, 32, 0.1)",
            boxSizing: "border-box"
        }
    }
})

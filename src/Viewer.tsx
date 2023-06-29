import React, {useEffect, useRef, useState} from "react";
import * as pdfjs from "pdfjs-dist/webpack"
import { PDFViewer, PDFFindController, PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.js"
import { styled } from "@mui/material"

const ContainerDiv = styled("div")({
    position: "absolute",
    border: "1px solid white",
    left: "10%",
    width: "70%",
    height: "500px",
    overflow: "auto",
})
const ViewerDiv = styled("div")({
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
        opacity: 1
    },
    ".textLayer span": {
        color: "black",
        position: "absolute",
        whiteSpace: "pre",
        transformOrigin: "0% 0%",
        border: "solid 1px rgba(255, 0, 0, 0.5)",
        backgroundColor: "rgba(255, 255, 32, 0.1)",
        boxSizing: "border-box"
    },
    ".textLayer br": {
        color: "black",
        position: "absolute",
        whiteSpace: "pre",
        transformOrigin: "0% 0%",
        border: "solid 1px rgba(255, 0, 0, 0.5)",
        backgroundColor: "rgba(255, 255, 32, 0.1)",
        boxSizing: "border-box"
    }
})

export const Viewer = ({ src }: {src: string}) => {

    const state = useState({})
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const eventBus = new EventBus()

        const linkService = new PDFLinkService({
            eventBus,
        })

        const findController = new PDFFindController({
            eventBus,
            linkService,
            updateMatchesCountOnProgress: true,
        })

        const pdfViewer = new PDFViewer({
            eventBus,
            linkService,
            findController: undefined,
            container: containerRef.current,
            l10n: undefined
        })

        // linkService.setViewer(pdfViewer)

        if (src) {
            setDocument(src, pdfViewer, linkService)
        }

    }, [])

    return (
        <ContainerDiv ref={containerRef}>
            <ViewerDiv />
        </ContainerDiv>
    )
}

const setDocument = (src: string, pdfViewer: PDFViewer, linkService: PDFLinkService) => {

    const loadingTask = pdfjs.getDocument({
        url: src,
    })

    setTimeout(async function () {
        const pdfDocument = await loadingTask.promise;
        pdfViewer.setDocument(pdfDocument);
        linkService.setDocument(pdfDocument, null);
    }, 100)
}

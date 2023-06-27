import React, {useEffect, useRef, useState} from "react";
import * as pdfjs from "pdfjs-dist/webpack"
import { PDFViewer, PDFFindController, PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.js"
import { styled } from "@mui/material"

const Container = styled("div")({
    position: "absolute",
    border: "1px solid white",
    left: "300px",
    width: "350px",
    height: "200px",
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
        <Container ref={containerRef}>
            <div id="viewer" className="pdfViewer" />
        </Container>
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

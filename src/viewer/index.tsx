import React, {useEffect, useRef, useState} from "react";
import * as pdfjs from "pdfjs-dist/webpack"
import { PDFViewer, PDFFindController, PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.js"
import { ContainerDiv, ViewerDiv } from "./parts"

import "./textLayer.css"

interface IProps {
    src: string;
    eventBus: EventBus;
    linkService: PDFLinkService;
    findController: PDFFindController;
}

export const Viewer = (props: IProps) => {

    const {src, eventBus, linkService, findController} = props

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const pdfViewer = new PDFViewer({
            eventBus,
            linkService,
            findController: findController,
            container: containerRef.current,
            l10n: undefined
        })
        console.log(pdfViewer)

        eventBus.on("find", (event) => {
            console.log(pdfViewer)
        })

        linkService.setViewer(pdfViewer)

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

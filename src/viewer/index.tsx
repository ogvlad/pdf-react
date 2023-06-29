import React, {useEffect, useRef, useState} from "react";
import * as pdfjs from "pdfjs-dist/webpack"
import { PDFViewer, PDFFindController, PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.js"
import { ContainerDiv, ViewerDiv } from "./parts"

export const Viewer = ({ src, search }: {src: string, search: string}) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const eventBus = new EventBus()
    const linkService = new PDFLinkService({
        eventBus,
    })
    const findController = new PDFFindController({
        eventBus,
        linkService,
        updateMatchesCountOnProgress: true,
    })

    useEffect(() => {

        const pdfViewer = new PDFViewer({
            eventBus,
            linkService,
            findController: findController,
            container: containerRef.current,
            l10n: undefined
        })

        linkService.setViewer(pdfViewer)

        if (src) {
            setDocument(src, pdfViewer, linkService)
        }
    }, [])

    useEffect(() => {
        console.log(search)

        const find = (options) => {
            console.log(`[PDF-FIND]`)
            console.log(options)
            eventBus.dispatch("find", {
                source: window,
                caseSensitive: false,
                findPrevious: false,
                highlightAll: true,
                phraseSearch: true,
                entireWord: false,
                matchDiacritics: true,
                ...options,
            })
        }

        find({query: search})

    }, [search])


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

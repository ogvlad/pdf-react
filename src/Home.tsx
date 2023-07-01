import {  Viewer } from "./viewer";
import {SearchTextField} from "./search";
import {useEffect, useMemo, useState} from "react";
import {EventBus, PDFFindController, PDFLinkService} from "pdfjs-dist/web/pdf_viewer";

const sample = new URL("./samples/compressed.tracemonkey-pldi-09.pdf", import.meta.url);

export const Home = () => {

    const [state, setState] = useState<PDFPageState>({search: ""})

    useEffect(() => {
        const find = (options) => {
            eventBus.dispatch("find", {
                type: "",
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

        find({query: state.search})

    }, [state.search])


    const textChanged = (event:any) => {
        setState({search: event.target.value})
    }

    const eventBus = useMemo(() => new EventBus(), [])

    const linkService = useMemo(() => new PDFLinkService({
        eventBus,
    }), [eventBus])

    const findController = useMemo(() => new PDFFindController({
        eventBus,
        linkService,
        updateMatchesCountOnProgress: true,
    }), [eventBus, linkService])

    eventBus.on("find", (event) => {
        // console.log(findController)
    })

    return (
        <>
            <h1>PDF on React</h1>
            <h2>Just a test for PDF in HTML</h2>
            <SearchTextField onChange={textChanged} />
            <Viewer src={sample.href} eventBus={eventBus} linkService={linkService} findController={findController} />
        </>
    )
}

interface PDFPageState {
    search: string;
}
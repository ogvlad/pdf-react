import {  Viewer } from "./viewer";
import {SearchTextField} from "./search";
import {useEffect, useState} from "react";

const sample = new URL("./samples/compressed.tracemonkey-pldi-09.pdf", import.meta.url);

export const Home = () => {

    const [state, setState] = useState<PDFPageState>({search: ""})

    const textChanged = (event:any) => {
        setState({search: event.target.value})
    }

    return (
        <>
            <h1>PDF on React</h1>
            <h2>Just a test for PDF in HTML</h2>
            <SearchTextField onChange={textChanged} />
            <Viewer src={sample.href} search={state.search} />
        </>
    )
}

interface PDFPageState {
    search: string;
}
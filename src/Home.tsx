import {  Viewer } from "./viewer";
import {SearchTextField} from "./search";

const sample = new URL("./samples/compressed.tracemonkey-pldi-09.pdf", import.meta.url);

export const Home = () => {

    return (
        <>
            <h1>PDF on React</h1>
            <h2>Just a test for PDF in HTML</h2>
            <SearchTextField />
            <Viewer src={sample.href} />
        </>
    )
}


import {  Viewer } from "./viewer";

const sample = new URL("./samples/compressed.tracemonkey-pldi-09.pdf", import.meta.url);

export const Home = () => {


    return (
        <>
            <h1>PDF on React</h1>
            <h2>Just a test for PDF in HTML</h2>

            <Viewer src={sample.href} />
        </>
    )
}


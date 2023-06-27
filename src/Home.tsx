import {  Viewer } from "./Viewer";

const sample = new URL("./helloworld.pdf", import.meta.url);

export const Home = () => {


    return (
        <>
            <h1>PDF on React</h1>

            <Viewer src={sample.href} />
            <h2>Just a test for PDF in HTML</h2>
        </>
    )
}


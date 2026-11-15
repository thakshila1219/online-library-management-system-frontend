import {NavBar} from "../nav/NavBar.tsx";
import {Main} from "../main/Main.tsx";
import {Footer} from "../footer/Footer.tsx";

export function DefaultLayout() {
    return (
        <>
            <NavBar/>
            <Main/>
            <Footer/>
        </>
    );
}
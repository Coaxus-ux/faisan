import {useEffect} from "react";
import {useColorsStore} from "@/store/ColorsStore.js";

export default function Colors() {
    const {getColorsApi} = useColorsStore();
    useEffect(() => {
        getColorsApi();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <h1>Colors</h1>
        </>
    )
}
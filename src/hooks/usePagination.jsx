import { useState } from "react";

export function usePagination(collection, countItems) {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(countItems);

    const next = () => {
        if (end <= collection.length) {
            setStart(state => state + countItems);
            setEnd(state => state + countItems);
        }
    }

    const prev = () => {
        if (start - countItems >= 0) {
            setStart(state => state - countItems);
            setEnd(state => state - countItems);
        }
    }

    return {
        start,
        end,
        next,
        prev
    }
}
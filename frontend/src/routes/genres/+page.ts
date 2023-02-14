import type { PageLoad } from './$types';
import type Genre from "$lib/types";
 
export const load = (async ({ params }) => {

    const response = await fetch("http://127.0.0.1:8000/api/genres/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const genres: Object = await response.json();

        return {
            genres
        };
    }
}) satisfies PageLoad;
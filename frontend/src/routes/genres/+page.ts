import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load = (async ({ params }) => {

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/genres/", {
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
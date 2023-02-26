import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load = (async ({ params }) => {

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        const newest: Object = data.newest;
        const fav: Object = data.fav

        return {
            newest,
            fav
        };
    }
}) satisfies PageLoad;
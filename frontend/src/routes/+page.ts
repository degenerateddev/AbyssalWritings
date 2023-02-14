import type { PageLoad } from './$types';
 
export const load = (async ({ params }) => {

    const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data: Object = await response.json();
        const newest: Object = data.newest;
        const fav: Object = data.fav

        return {
            newest,
            fav
        };
    }
}) satisfies PageLoad;
import type { PageLoad } from './$types';
import type { Story } from "$lib/types";
import { PUBLIC_BACKEND_URL } from "$env/static/public"; 

export const load = (async (event) => {

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/stories/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const stories: Array<Story> = await response.json();

        return {
            stories,
        };
    }
}) satisfies PageLoad;
import type { PageLoad } from './$types';
import type { Genre } from "$lib/types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load = (async ({ params }) => {
    let name: string = params.name;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/genre/" + name + "/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        const genre: Genre = data.genre;
        const stories: Object = data.stories;

        return {
            genre,
            stories
        };
    }
}) satisfies PageLoad;
import type { PageLoad } from './$types';
import type Genre from "$lib/types";
 
export const load = (async ({ params }) => {
    let name: string = params.name;

    const response = await fetch("http://127.0.0.1:8000/api/genre/" + name + "/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data: Object = await response.json();
        const genre: Genre = data.genre;
        const stories: Object = data.stories;

        return {
            genre,
            stories
        };
    }
}) satisfies PageLoad;
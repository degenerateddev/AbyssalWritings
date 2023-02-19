import type { PageLoad } from './$types';
import type { Story } from "$lib/types";
 
export const load = (async ({ params }) => {

    const response = await fetch("http://127.0.0.1:8000/api/stories/", {
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
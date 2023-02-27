import type { PageServerLoad } from './$types';
import { storyStore } from "$lib/stores";
import type { Tokens } from "$lib/types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load = (async ({ params, cookies }) => {
    let uuid: string = params.uuid;

    let response;
    const cookie: string | undefined = cookies.get("tokens");
    if (cookie !== undefined) {
        const tokens: Tokens = JSON.parse(cookie || "");
        const access = tokens.access;
        
        response = await fetch(PUBLIC_BACKEND_URL + "/api/story/" + uuid + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + access
            }
        });
    } 
    
    if (cookie === undefined || response?.status === 401) {
        response = await fetch(PUBLIC_BACKEND_URL + "/api/story/" + uuid + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    if (response.ok) {
        const data = await response.json();

        storyStore.set(data.story);
        return {
            story: data.story,
            liked: data.liked,
            saved: data.saved
        };
    }
}) satisfies PageServerLoad;
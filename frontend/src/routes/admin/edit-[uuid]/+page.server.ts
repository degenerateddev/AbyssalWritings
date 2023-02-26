import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const load = (async ({ params, request, cookies }) => {
    const uuid: string = params.uuid;
    const response = await fetch(PUBLIC_BACKEND_URL + "/api/story/" + uuid + "/", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })

    if (response.ok) {
        const story = await response.json();

        return {
            story
        }
    }
}) satisfies PageServerLoad;

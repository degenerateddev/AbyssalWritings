import type { PageServerLoad, Actions } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';

export const load = (async ({ params, request, cookies }) => {
    const uuid: string = params.uuid;
    const response = await fetch("http://127.0.0.1:8000/api/story/" + uuid + "/", {
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

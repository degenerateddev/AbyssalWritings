import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const PUT = (async ({ cookies, request }) => {
    let data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const story = formatted.story;
    const storyline = formatted.storyline;

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch("http://127.0.0.1:8000/api/admin/rmv-from-storyline/", {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            storyline_uuid: storyline,
            story_uuid: story
        })
    })

    if (response.ok) {
        return json({
            status: 200
        })
    }

    return json({
        status: 500
    })

}) satisfies RequestHandler;
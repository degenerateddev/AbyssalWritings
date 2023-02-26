import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const POST = (async ({ cookies, request }) => {
    let data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const story = formatted.story;
    const storyline = formatted.storyline;

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/admin/add-to-storyline/", {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            story: story,
            storyline: storyline
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
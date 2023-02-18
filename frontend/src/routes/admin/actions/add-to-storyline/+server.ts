import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const POST = (async ({ cookies, request }) => {
    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const data: any = await request.formData()
    const story = data.story
    const storyline = data.storyline

    const response = await fetch("http://127.0.0.1:8000/api/admin/add-to-storyline/", {
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
        const storylines: Object = await response.json();
        
        return json({
            storylines
        })
    }

    return json({
        status: 500
    })

}) satisfies RequestHandler;
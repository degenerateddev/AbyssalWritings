import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const POST: RequestHandler = (async ({ cookies, request }) => {
    const data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const title = formatted.title;
    const content = formatted.content;

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch("http://127.0.0.1:8000/api/admin/add-story/", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            title: title,
            content: content
        })
    })

    if (response.ok) {
        const story = await response.json()
        return json({
            story
        })
    }

    return json({
        status: 400
    })

}) satisfies RequestHandler;
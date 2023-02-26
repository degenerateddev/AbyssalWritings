import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const PUT = (async ({ cookies, request }) => {
    let data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const uuid = formatted.uuid;
    const title = formatted.title;
    const content = formatted.content;
    const genre = formatted.genre;

    const cookie: string | undefined = cookies.get("tokens" || undefined)
    const tokens: Tokens = JSON.parse(cookie || "")
    const access: string = tokens.access

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/admin/edit-story/", {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            uuid: uuid,
            title: title,
            content: content,
            genre: genre
        })
    })

    if (response.ok) {
        const data = await response.json();
        return json({
            uuid: uuid,
            title: data.title,
            content: data.content
        })
    }

    return json({
        status: 500
    })

}) satisfies RequestHandler;
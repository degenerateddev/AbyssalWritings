import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const PUT = (async ({ cookies, request }) => {
    let data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const uuid = formatted.uuid;
    const title = formatted.title;
    const content = formatted.content;

    const cookie: string | undefined = cookies.get("tokens" || undefined)
    const tokens: Tokens = JSON.parse(cookie || "")
    const access: string = tokens.access

    const response = await fetch("http://127.0.0.1:8000/api/admin/edit-story/", {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            uuid: uuid,
            title: title,
            content: content
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
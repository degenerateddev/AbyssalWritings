import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const PUT: RequestHandler = (async ({ cookies, request }) => {
    const data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const uuid = formatted.uuid;
    const genre = formatted.genre;

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/admin/add-to-genre/", {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            uuid: uuid,
            genre: genre
        })
    })

    if (response.ok) {
        return json({
            status: 200
        })
    }

    return json({
        status: 400
    })

}) satisfies RequestHandler;
import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const PUT: RequestHandler = (async ({ cookies, request, params }) => {
    const data = await request.formData();
    const body = Object.fromEntries(data);
    const formatted = JSON.parse(Object.keys(body)[0])
    const uuid = formatted.uuid;

    const cookie: string | undefined = cookies.get("tokens");
    if (cookie === undefined) {
        return json({
            error: "Not logged in!"
        })
    }

    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const action: string = params.action;

    let url: string;

    switch (action) {
        case "like":
            url = "http://127.0.0.1:8000/api/like/";
            break;

        case "unlike":
            url = "http://127.0.0.1:8000/api/unlike/"
            break;

        default:
            url = "";
            break;
    }
    
    const response = await fetch(url, {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            uuid: uuid,
        })
    })

    if (response.ok && response.status !== 401) {
        return json({
            status: 200
        })
    }

    return json({
        status: 400
    })

}) satisfies RequestHandler;
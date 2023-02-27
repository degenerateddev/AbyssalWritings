import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const POST: RequestHandler = (async ({ cookies, request }) => {
    const data = await request.formData();

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/profile-pic/", {
        method: "POST",
        headers: new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: data
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
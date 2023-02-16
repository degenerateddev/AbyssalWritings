import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const POST = (async ({ request, cookies }) => {
    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access
    const data: FormData = await request.formData();
    const uuid: FormDataEntryValue | null = data.get("uuid");

    const response = await fetch("http://127.0.0.1:8000/api/admin/rmv-storyline/", {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
          "uuid": uuid
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
import type { PageServerLoad, Actions } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';

export const load = (async ({ params, request, cookies }) => {
    const uuid: string = params.uuid;
    const response = await fetch("http://127.0.0.1:8000/api/story/" + uuid + "/", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })

    if (response.ok) {
        const story = await response.json();

        return {
            story
        }
    }
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request, params }) => {
        let data = await request.formData();
        const title = data.get("title");
        const content = data.get("content");

        const uuid: string = params.uuid;

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
                "uuid": uuid,
                "title": title,
                "content": content
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

        return {
            status: 500
        }
    }
} satisfies Actions;

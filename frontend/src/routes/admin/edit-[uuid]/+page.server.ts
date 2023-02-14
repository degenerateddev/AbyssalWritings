import type { PageServerLoad } from './$types';
import type Tokens from "$lib/types";
 
export const load = (async ({ params, request, cookies }) => {
    const uuid: string = params.uuid;
    const tokens: Tokens = cookies.get("tokens")
    const access: string = JSON.parse(tokens).access

    const response = await fetch("http://127.0.0.1:8000/api/admin/edit-story/", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        })
    })

    if (response.ok) {
        const data = await response.json();
        return {
            uuid: uuid,
            title: data.title,
            content: data.content
        }
    }
}) satisfies PageServerLoad;
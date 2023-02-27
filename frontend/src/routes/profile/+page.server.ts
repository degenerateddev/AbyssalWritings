import type { PageServerLoad } from './$types';
import type { Tokens } from "$lib/types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { redirect } from '@sveltejs/kit';
 
export const load = (async ({ params, request, cookies }) => {
    const cookie: string | undefined = cookies.get("tokens");

    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/user-data/", {
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
            user: data.user,
            likes: data.likes,
            saved: data.saved
        }
    }

}) satisfies PageServerLoad;
import type { LayoutServerLoad } from './$types';
import type { Tokens } from "$lib/types";
import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load: LayoutServerLoad = (async ({ cookies, url }) => {
    const cookie = cookies.get('tokens');

    if (cookie !== undefined) {
        let tokens: Tokens = JSON.parse(cookie)

        const response = await fetch(PUBLIC_BACKEND_URL + "/api/is-logged-in/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access
            })
        });

        if (response.ok) {
            return {
                status: 200
            };
        } else {
            const response = await fetch(PUBLIC_BACKEND_URL + "/auth/token/refresh/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    "refresh": tokens.refresh
                })
            })

            if (response.ok) {
                const data = await response.json();
                const new_tokens: string = JSON.stringify({
                    access: data.access,
                    refresh: tokens.refresh
                });
                cookies.delete("tokens", {
                    path: "/"
                });
                cookies.set("tokens", new_tokens, {
                    path: "/",
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: !dev
                });
                throw redirect(301, url.pathname)
            }

        }
    }

    throw redirect(301, "/")

}) satisfies LayoutServerLoad;
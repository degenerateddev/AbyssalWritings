import type { LayoutServerLoad } from './$types';
import type { Tokens } from "$lib/types";
import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
 
export const load: LayoutServerLoad = (async ({ cookies, url }) => {
    const cookie = cookies.get('tokens');

    if (cookie !== undefined) {
        let tokens: Tokens = JSON.parse(cookie)

        const response = await fetch("http://127.0.0.1:8000/api/is-admin/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access
            })
        });

        console.log(response.status)

        if (response.ok) {
            return {
                status: 200
            };
        } else {
            const response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
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
                console.log(data);
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
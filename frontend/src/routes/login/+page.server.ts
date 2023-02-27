import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { dev } from '$app/environment';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { userStore } from "$lib/stores";
import type { User } from "$lib/types";
 
export const actions = {
    login: async ({ request, cookies }) => {
        let data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if (!username) {
            return fail(400, { username, missing: true });
        }

        const response = await fetch(PUBLIC_BACKEND_URL + "/auth/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })

        if (response.ok) {
            const data = await response.json();
            cookies.delete("tokens");
            cookies.set("tokens", JSON.stringify(data), {
                path: "/",
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev
            });
            throw redirect(303, "/profile");
        }
    },

    register: async ({ request, cookies }) => {
        let data = await request.formData();
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const password_repeat = data.get("password_repeat");

        if (!username) {
            return fail(400, { username, missing: true });
        }

        if (!email) {
            return fail(400, { email, missing: true });
        }

        if (!password || !password_repeat) {
            return fail(400, { password, missing: true });
        }

        if (password !== password_repeat) {
            return fail(400, { password, not_match: true });
        }

        const response = await fetch(PUBLIC_BACKEND_URL + "/auth/token/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            cookies.delete("tokens");
            cookies.set("tokens", JSON.stringify(data), {
                path: "/",
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev
            });
            throw redirect(303, "/profile");
        }
    }
} satisfies Actions;
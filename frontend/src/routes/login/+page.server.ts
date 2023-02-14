import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { dev } from '$app/environment';
 
export const actions = {
  login: async ({ request, cookies }) => {
    let data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");

    if (!username) {
        return fail(400, { username, missing: true });
    }

    const response = await fetch("http://127.0.0.1:8000/auth/token/", {
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
        console.log(data);
        cookies.delete("tokens");
        cookies.set("tokens", JSON.stringify(data), {
            path: "/",
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev
        });
        throw redirect(303, "/admin");
    }

  }
} satisfies Actions;
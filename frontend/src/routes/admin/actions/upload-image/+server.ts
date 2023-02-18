import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const POST: RequestHandler = (async ({ cookies, request }) => {
    const data = await request.formData();
    //let formatted = JSON.parse(Object.keys(Object.fromEntries(data))[0])
    for (let pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    const image = undefined;

    /*let title = formatted.title;
    let content = formatted.content;
    let image = formatted.image;
    console.log("Title " + title)
    console.log("Content " + content)
    
    if (image !== null && image !== undefined) {
        console.log("Image " + image)
    }*/

    const cookie: string | undefined = cookies.get("tokens");
    const tokens: Tokens = JSON.parse(cookie || "");
    const access: string = tokens.access;

    const response = await fetch("http://127.0.0.1:8000/api/admin/add-image/", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            image: image
        })
    })

    if (response.ok) {
        const story = await response.json()
        return json({
            story
        })
    }

    return json({
        status: 400
    })

}) satisfies RequestHandler;
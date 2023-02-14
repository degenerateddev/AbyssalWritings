import type { Actions } from './$types';
import type Tokens from "$lib/types";
 
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    let formatted = JSON.parse(Object.keys(Object.fromEntries(data))[0])

    let title = formatted.title;
    let content = formatted.content;
    let image: File = formatted.image;
    console.log("Title " + title)
    console.log("Content " + content)
    if (image !== null && image !== undefined) {
        console.log("Image " + image.name)
        console.log("Image " + image.size)
        console.log("Image " + URL.createObjectURL(image))
    }

    const tokens: Tokens = cookies.get("tokens")
    const access: string = JSON.parse(tokens).access

    const response = await fetch("http://127.0.0.1:8000/api/admin/add-story/", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access
        }),
        body: JSON.stringify({
            title: title,
            content: content
        })
    })

    if (response.ok) {
        return {
            status: 200
        }
    }

    return {
        status: 400
    }
  }
} satisfies Actions;
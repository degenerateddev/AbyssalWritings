import type { Actions } from './$types';
import type Tokens from "$lib/types";
 
export const actions = {
  story: async ({ params, cookies }) => {
    const tokens: Tokens = cookies.get("tokens")
    const access: string = JSON.parse(tokens).access
    const uuid: string = params.uuid

    const response = await fetch("http://127.0.0.1:8000/api/admin/rmv-story/", {
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
        const story: Object = response.json(); 
        
        return {
            story
        }
    }
  },

  storyline: async ({ params, cookies }) => {
    const tokens: Tokens = cookies.get("tokens")
    const access: string = JSON.parse(tokens).access
    const uuid: string = params.uuid

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
        const storyline: Object = response.json(); 
        
        return {
            storyline
        }
    }
  }
} satisfies Actions;
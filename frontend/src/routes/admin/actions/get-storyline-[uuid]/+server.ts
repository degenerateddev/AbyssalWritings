import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const GET = (async ({ cookies, params }) => {
  const cookie: string | undefined = cookies.get("tokens");
  const tokens: Tokens = JSON.parse(cookie || "");
  const access: string = tokens.access;
  const uuid: string = params.uuid;

  const response = await fetch(PUBLIC_BACKEND_URL + "/api/admin/get-storyline/" + uuid + "/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access
      })
  })

  if (response.ok) {
      const storyline: Object = await response.json(); 
      
      if ("error" in storyline) {
        return json({
          status: 404
        })
      }

      return json({
        storyline
      })
  }

  return json({
    status: 500
  })

}) satisfies RequestHandler;
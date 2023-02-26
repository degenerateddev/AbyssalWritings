import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const GET = (async ({ cookies }) => {
  const cookie: string | undefined = cookies.get("tokens");
  const tokens: Tokens = JSON.parse(cookie || "");
  const access: string = tokens.access;

  const response = await fetch(PUBLIC_BACKEND_URL + "/api/admin/get-available-storylines/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access
      })
  })

  if (response.ok) {
      const storylines: Object = await response.json();
      
      return json({
        storylines
      })
  }

  return json({
    status: 500
  })

}) satisfies RequestHandler;
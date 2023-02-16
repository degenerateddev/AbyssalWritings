import type { RequestHandler } from './$types';
import type { Tokens } from "$lib/types";
import { json } from '@sveltejs/kit';
 
export const GET = (async ({ cookies }) => {
  const cookie: string | undefined = cookies.get("tokens");
  const tokens: Tokens = JSON.parse(cookie || "");
  const access: string = tokens.access;

  const response = await fetch("http://127.0.0.1:8000/api/admin/get-available-storylines/", {
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
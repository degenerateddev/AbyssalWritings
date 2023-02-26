import type { PageLoad } from './$types';
import { storyStore } from "$lib/stores";
import type { Story } from "$lib/types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
 
export const load = (async ({ params }) => {
    let uuid: string = params.uuid;

    const response = await fetch(PUBLIC_BACKEND_URL + "/api/story/" + uuid, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const story: Story = await response.json();

        storyStore.set(story);
        return {
            story
        };
    }
}) satisfies PageLoad;
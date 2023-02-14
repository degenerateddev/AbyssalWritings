import type { PageLoad } from './$types';
import { storyStore } from "$lib/stores";
import type Story from "$lib/types";
 
export const load = (async ({ params }) => {
    let uuid: string = params.uuid;

    const response = await fetch("http://127.0.0.1:8000/api/story/" + uuid, {
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
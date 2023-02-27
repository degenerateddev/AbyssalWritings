import { writable, type Writable } from "svelte/store";
import type { User, Story } from "./types";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const storyStore: Writable<Story> = localStorageStore("storyStore", "");
export const userStore: Writable<User> = writable()
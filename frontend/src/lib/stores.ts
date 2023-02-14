import { writable, type Writable } from "svelte/store";
import type User from "./types";
import type Story from "./types";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const state: Writable<User> = writable(1);

export const storyStore: Writable<Story> = localStorageStore("storyStore", ""); //writable()
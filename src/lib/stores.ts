import { writable } from "svelte/store";
import type { FlashMessage } from "../types";

export const flashMessages = writable<FlashMessage[]>([]);
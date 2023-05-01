import { writable } from "svelte/store";
import type { FlashMessage, Notification } from "../types";

export const flashMessages = writable<FlashMessage[]>([]);
export const notifications = writable<Notification[]>([]);
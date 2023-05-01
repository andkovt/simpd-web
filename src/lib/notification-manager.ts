import type { Notification } from "../types";
import { notifications } from "./stores";
import { get } from "svelte/store";
import {v4 as uuidv4 } from 'uuid';

export default {
    add: (message: string, type: string = 'info') => {
        let existingNotifications = get(notifications);
        existingNotifications.push({id: uuidv4(), message: message, type: type});
        notifications.set(existingNotifications);
    },

    remove: (id: string) => {
        let existingNotifications = get(notifications);
        const index = existingNotifications.findIndex((value) => value.id === id);
        existingNotifications.splice(index, 1);
        notifications.set(existingNotifications);
    },

    clear: () => {
        notifications.set([]);
    }
};
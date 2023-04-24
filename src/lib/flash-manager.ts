import type { FlashMessage } from "../types";
import { flashMessages } from "./stores";
import { get } from "svelte/store";


class FlashManager {
    add(message: FlashMessage): void {
        let messages = get(flashMessages);
        console.log(messages);
        messages.push(message);
        flashMessages.set(messages);
    };

    remove(message: FlashMessage): void {
        let messages = get(flashMessages);
        const indexOf = messages.indexOf(message);
        messages.splice(indexOf, 1);

        flashMessages.set(messages);
    }

    clear(): void {
        flashMessages.set([]);
    }
}

const instance = new FlashManager();
export default instance;
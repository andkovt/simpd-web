export interface FlashMessage {
    message: string;
    type: string;
}

export interface Container {
    id: string;
    name: string;
    image: string;

    mounts: Mount[];
};

export interface Mount {
    id: string;
    source: string;
    destination: string;
    mode: string;
};
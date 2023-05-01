export interface FlashMessage {
    message: string;
    type: string;
}

export interface Notification {
    id: string;
    message: string;
    type: string;
}

export interface Container {
    id: string;
    name: string;
    image: string;

    mounts: Mount[];
    ports: Port[];
    environmentVariables: EnvironmentVariable[];
};

export interface Mount {
    id: string;
    source: string;
    destination: string;
    mode: string;
};

export interface Port {
    id: string;
    host: string;
    container: string;
    type: string;
}

export interface EnvironmentVariable {
    id: string;
    name: string;
    value: string;
}

export interface Directory {
    name: string;
    path: string;
    subDirectories: Directory[]
};
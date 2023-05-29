import { env } from '$env/dynamic/public';

export default (path: string) => {
    return `http://${window.location.hostname}:${env.PUBLIC_PORT}/${path}`;
}
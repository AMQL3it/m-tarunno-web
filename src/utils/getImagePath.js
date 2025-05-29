const BASE_URL = import.meta.env.VITE_API_URL;

export default function getImagePath(path) {
    return `${BASE_URL}/${path}`;
}
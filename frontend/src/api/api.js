import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "/",
    headers: {"": ""}
})

export const api = {
    request() {
        return instance.get("/").then(response => response.data)
    }
}

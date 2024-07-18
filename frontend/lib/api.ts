import cookies from "./cookies";

const HOST = "http://localhost:3333";

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function signup(email:string, password:string) {
    const body = JSON.stringify({email, password})
    const response = await fetch(HOST+"/auth/signup", {method: "POST", headers, body})
    const json = await response.json()

    if (response.ok) {
        const user = json.user
        cookies.set("authToken", user.token, 1);
        return { status: true };
    }
    return { status: false, error: json.error }
}

async function signin(email:string, password:string) {
    const body = JSON.stringify({email, password})
    const response = await fetch(HOST+"/auth/login", {method: "POST", headers, body})
    const json = await response.json()

    if (response.ok) {
        const user = json.user
        cookies.set("authToken", user.token, 1);
        return { status: true };
    }
    return { status: false, error: json.error }
}

export default {
    signup,
    signin
}
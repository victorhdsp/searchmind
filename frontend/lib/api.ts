import cookies from "./cookies";

const HOST = "http://localhost:3333";

const headers = new Headers();
if (!headers.has("Content-Type"))
    headers.append("Content-Type", "application/json");

async function signup(email:string, password:string) {
    const body = JSON.stringify({email, password})
    try {
        const response = await fetch(HOST+"/auth/signup", {method: "POST", headers, body})
        if (response.ok) {
            const json = await response.json()
            const user = json.user
            cookies.set("authToken", user.token, 1);
            return { status: true };
        } else {
            throw new Error(await response.text());
        }
    } catch (error:any) {
        let err: Error = error
        return { status: false, error: err.message }
    }
}

async function signin(email:string, password:string) {
    const body = JSON.stringify({email, password})
    
    try {
        const response = await fetch(HOST+"/auth/login", {method: "POST", headers, body})
        if (response.ok) {
            const json = await response.json()
            const user = json.user
            cookies.set("authToken", user.token, 1);
            return { status: true };
        } else {
            throw new Error(await response.text());
        }
    } catch (error:any) {
        let err: Error = error
        return { status: false, error: err.message }
    }
}

async function getHistory() {
    const token = cookies.get("authToken");
    if (!headers.has("Authorization"))
        headers.append("Authorization", "Bearer "+token);
    try {
        const response = await fetch(HOST+"/app/history", { method: "GET", headers })
        if (response.ok) {
            const json = await response.json()
            return { status: true, history: json.history };
        } else {
            throw new Error(await response.text());
        }
    } catch (error:any) {
        let err: Error = error
        return { status: false, error: err.message }
    }
}

async function getQuestion(uid?:string) {
    const token = cookies.get("authToken");
    const PARAMS = uid ? "?uid="+uid : "";
    if (!headers.has("Authorization"))
        headers.append("Authorization", "Bearer "+token);
    try {
        const response = await fetch(HOST+"/app/question"+PARAMS, 
            { method: "GET", headers }
        )
        if (response.ok) {
            const json = await response.json()
            return { status: true, question: json.question };
        } else {
            throw new Error(await response.text());
        }
    } catch (error:any) {
        let err: Error = error
        return { status: false, error: err.message }
    }
}

export default {
    signup,
    signin,
    getHistory,
    getQuestion
}
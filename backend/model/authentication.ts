import db from "../database/db"

function login(email:string) {
    const user = db.find((user) => user.email === email)
    if (!user) throw new Error("User not exist");
    return user
}

function resetPassword(email:string, password: string) {
    const user = db.find((user) => user.email === email)
    if (!user) throw new Error("User not exist");
    user.password = password;
    return user
}

function signup(email:string, password: string) {
    let user = db.find((user) => user.email === email)
    if (user) throw new Error("User already exist");
    db.push({
        uid: "123",
        email,
        password,
        questions: [],
        responses: [],
        config: {
            questionHours: ["13:00"]
        }
    })
    user = db.find((user) => user.email === email)
    if (!user) throw new Error("Error to create user");
    return user
}

export default {
    login,
    resetPassword,
    signup
}
import { API } from "../Config/config"

export const signin = async (user) => {
    return await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

export const forgetpassword = user => {
    return fetch(`${API}/forgetpwd`, {
        method: 'POST',
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}
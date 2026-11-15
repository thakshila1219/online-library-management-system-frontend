import {jwtDecode} from "jwt-decode"
import type {UserData} from "../modal/UserData.ts";

export const isTokenExpired = (token : string) => {
    try {
        const {exp} = jwtDecode(token);
        if (!exp){
            return true
        }
        return Date.now() >= exp * 1000;
    }catch (error){
        console.error("Error checking token expiration:", error);
        return true;
    }
}

export const getUserFromToken = (token: string) => {
    return jwtDecode<UserData>(token);
}
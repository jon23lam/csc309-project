import {axiosPostNoAuth} from "./axiosRequests"
import {endpoint} from "../utils/endpoint";

const SIGNUP_ENDPOINT = endpoint("api/accounts/account/");

export async function signup(request) {
    return await axiosPostNoAuth(SIGNUP_ENDPOINT, request,
        {
            "Content-Type": "multipart/form-data",
    });
}

import {axiosPatch, axiosDelete} from './axiosRequests'
import {endpoint} from "../utils/endpoint";

const SEEKER_ACCOUNT_UPDATE = (accountId) => 
    endpoint(`api/accounts/seeker/${accountId}/`);

const SHELTER_ACCOUNT_UPDATE = (accountId) => 
    endpoint(`api/accounts/shelter/${accountId}/`);

const DELETE_ACCOUNT = (accountId) => 
    endpoint(`api/accounts/account/${accountId}`);

export async function seekerUpdateAccount(id, payload) {
    const response = await axiosPatch(
        SEEKER_ACCOUNT_UPDATE(id),
        payload,
        { "Content-Type": "multipart/form-data" }
    );

    return response;
}

export async function shelterUpdateAccount(id, payload) {
    const response = await axiosPatch(
        SHELTER_ACCOUNT_UPDATE(id),
        payload,
        { "Content-Type": "multipart/form-data" }
    );

    return response;
}

export async function deleteAccount(id) {
    const response = await axiosDelete(
        DELETE_ACCOUNT(id)
    )

    return response;
}
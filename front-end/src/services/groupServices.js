import axios from "axios";

// const SERVER_URL = "https://easy-plum-raven-gear.cyclic.app"
const SERVER_URL = "http://localhost:4000"

export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`
    return axios.get(url);
}

export const getSingleGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url);
}

export const createGroup = (group) => {
    const url = `${SERVER_URL}/groups`;
    return axios.post(url, group);
}

export const editGroup = (group, groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.put(url, group);
}

export const deleteGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.delete(url);
}
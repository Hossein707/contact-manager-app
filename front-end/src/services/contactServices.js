import axios from "axios";

// const SERVER_URL = "https://easy-plum-raven-gear.cyclic.app"
const SERVER_URL = "http://localhost:4000"

export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`
    return axios.get(url);
}
export const getSingleContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url);
}
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
}
export const editContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
}
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}


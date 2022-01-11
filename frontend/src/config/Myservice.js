import { MAIN_URL } from "./URL";
import axios from 'axios'

export function getenptoken() {
    return axios.get(`${MAIN_URL}/`)
}

export function login(data) {
    return axios.post(`${MAIN_URL}/login`, data)
}

export function changepassword(data) {
    return axios.post(`${MAIN_URL}/changepassword`, data)
}

export function subscribe(data) {
    return axios.post(`${MAIN_URL}/subscribe`, data)
}

export function registration(data) {
    return axios.post(`${MAIN_URL}/registeration`, data)
}

export function recoverpassword(data) {
    return axios.post(`${MAIN_URL}/recoverpassword`, data)
}

export function sentotp(data) {
    return axios.post(`${MAIN_URL}/sentotp`, data)
}

export function getproducts() {
    return axios.get(`${MAIN_URL}/sendotp`)
}

export function getcategories() {
    return axios.get(`${MAIN_URL}/getcategories`)
}

export function getcolors() {
    return axios.get(`${MAIN_URL}/getcolors`)
}

export function getcarouselimages() {
    return axios.get(`${MAIN_URL}/getAllCategories`)
}

export function getpopularproducts() {
    return axios.get(`${MAIN_URL}/defaultTopRatingProduct`)
}
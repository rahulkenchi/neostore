import { MAIN_URL } from "./URL";
import axios from 'axios'

export function addtocart(ele) {
    console.log(ele.product_name, "1")
    if (localStorage.getItem('cart') != undefined) {
        console.log(ele.product_name, "2")
        let tmp = JSON.parse(localStorage.getItem('cart'))
        if (tmp.filter(e => (e._id === ele._id)).length === 0) {
            console.log(ele.product_name, "3")
            tmp.push({ ...ele, product_quantity: 1 })
            localStorage.setItem('cart', JSON.stringify(tmp))
        }
    }
    else {
        console.log(ele.product_name, "4")
        ele.product_quantity = 1
        localStorage.setItem('cart', JSON.stringify([ele]))
    }
    return 0
}

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

export function getproducts(data) {
    return axios.get(`${MAIN_URL}/commonproducts${data}`)
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

export function getsearch(data) {
    return axios.post(`${MAIN_URL}/getsearch`, data)
}

export function getproductdetail(data) {
    return axios.post(`${MAIN_URL}/getproductdetail${data}`)
}

export function getprofile(data) {
    return axios.post(`${MAIN_URL}/profile`, data)
}

export function updateprofile(data) {
    return axios.post(`${MAIN_URL}/updateprofile`, data)
}

export function addaddress(data) {
    return axios.post(`${MAIN_URL}/addaddress`, data)
}

export function getaddress(data) {
    return axios.post(`${MAIN_URL}/getaddress`, data)
}

export function setaddress(data) {
    return axios.post(`${MAIN_URL}/setaddress`, data)
}

export function addrating(data) {
    return axios.post(`${MAIN_URL}/addrating`, data)
}

export function getcart(data) {
    return axios.post(`${MAIN_URL}/getcart`, data)
}

export function setcart(data) {
    return axios.post(`${MAIN_URL}/setcart`, data)
}

export function orderaddress(data) {
    return axios.post(`${MAIN_URL}/orderaddress`, data)
}

export function getorder(data) {
    return axios.post(`${MAIN_URL}/getorder`, data)
}
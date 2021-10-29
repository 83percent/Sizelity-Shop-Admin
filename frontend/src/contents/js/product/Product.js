import axios from 'axios';

let instance = null;
export default class Product {
    constructor(server) {
        if(instance) return instance;
        this.server = server;
        instance = this;
    }
    isExist(code) {
        return axios({
            method: 'GET',
            url: `${this.server}/product/check/${code}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data};
            else return {type: 'error', msg: response.data?.error || "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."}
        })
    }
    getNextProductIndex() {
        return axios({
            method: 'GET',
            url: `${this.server}/product/next`,
            withCredentials: true,
            timeout: 5500,
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data};
            else return {type: 'error', msg: response.data?.error || "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."}
        })
    }
    
    getList(count) {
        return axios({
            method : 'GET',
            url : `${this.server}/product/list/${count}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data};
            else return {type: 'error', msg: response.data?.error || "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."}
        })
    }
    removes(deleteArrays) {
        return axios({
            method: "DELETE",
            url: `${this.server}/product`,
            data: {deletes : deleteArrays},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'};
            else return {type: 'error', msg: response.data?.error || "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."}
        })
    }
    edit(id, editData) {
        return axios({
            method: "PATCH",
            url: `${this.server}/product`,
            data: {id, editData},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'};
            else if(response.status === 204) return {type: 'error', msg: "상품 정보를 찾을 수 없습니다."};
            else return {type: 'error', msg: response.data?.error || "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."}
        })
    }
}
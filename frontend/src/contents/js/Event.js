import axios from "axios";

export default class Event {
    constructor(server) {
        this.server = server;
    }
    async getList() {
        return await axios({
            method: 'GET',
            url: `${this.server}/event`,
            withCredentials: true,
            timeout: 7500
        }).then(response => {
            switch(response?.status) {
                case 200 : {
                    return {type: 'success', data: response.data};
                }
                case 202 : {
                    return {type: 'error', msg: response.data.error};
                }
                default : {
                    return {type: 'error', msg : "문제가 발생했습니다.\n잠시 후 다시 시도해주세요."};
                }
            }
            
        }).catch(err => {
            if(err?.response?.status) return {type: 'error', msg: err.response.data.error};
            else return  {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    }
    async set(data) {
        return await axios({
            method: 'POST',
            url: `${this.server}/event`,
            data : data,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data}
        }).catch(err => {
            if(err?.response?.status) return {type: 'error', msg: err.response.data.error};
            else return  {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    }
    async remove(eventID) {
        return await axios({
            method: 'DELETE',
            url: `${this.server}/event`,
            data : {eventID},
            withCredentials: true
        }).then(response => {
            if(response.status === 200) return {type: 'success'}
        }).catch(err => {
            if(err?.response?.status) return {type: 'error', msg: err.response.data.error};
            else return  {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    } 
    async update(eventID, data) {
        return await axios({
            method: 'PATCH',
            url: `${this.server}/event`,
            data : {eventID, data},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'}
        }).catch(err => {
            if(err?.response?.status) return {type : 'error', msg : err.response.data.error};
            else return  {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    }
}
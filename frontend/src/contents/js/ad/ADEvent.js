import axios from 'axios';

export default class ADEvent {
    constructor(server) {
        this.server = server;
    }
    async get() {
        
    }
    async set({event, image}) {
        let response = await this.#setInfo(event);
        console.log(response);
    }
    #setInfo(event) {
        return axios({
            method : 'POST',
            url : `${this.server}/ad/event/info`,
            data : event,
            withCredentials: true,
            timeout: 5500

        }).then(response => {
            if(response?.status === 200) return {type: 'success', data : response.datad};
            else return {type:'error', msg: ""}
        }).catch(err => {
            if(err?.response?.data?.error) return {type:'error', msg: err.response.data.error}
            else return {type:'error', msg: "네트워크 연결을 확인해주세요."};
        });
    }
    #setImage(AD_ID, file) {
        let formData = new FormData();
        formData.append('image', file);       
        return axios({
            method : 'POST',
            url : `${this.server}/ad/event/image/${AD_ID}`,
            data : FormData,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'};
            else return {type:'error', msg: ""}
        }).catch(err => {
            if(err?.response?.data?.error) return {type:'error', msg: err.response.data.error}
            else return {type:'error', msg: "네트워크 연결을 확인해주세요."};
        });
    }
}


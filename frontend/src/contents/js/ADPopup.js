import axios from 'axios';

export default class ADPopup {
    constructor(server) {
        this.server = server;
    }
    async init() {

    }
    async getAll() {
        return await axios({
            method : 'GET',
            url : `${this.server}/popup`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                if(response.data?.bid.length > 0) {
                    return {type: 'success', data: response.data}
                } else {
                    return {type: 'success', data: null};
                }
            }
            else return {type : 'error', msg : response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        });
    }
    
    
    async set({file, info}) {
        let response = await this.__setInfo(info);
        if(response.type === 'error') {
            return response;
        } else {
            // 이미지 추가
            return await this.__setImage(response.data, file);
        }
    }

    async __setInfo(info) {
        return await axios({
            method: 'POST',
            url : `${this.server}/popup/info`,
            data : info,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type : 'success', data: response.data};
            else return {type: 'error', msg : response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        })
    }

    async __setImage(ADID, file) {
        let formData = new FormData();
        formData.append('image', file);        
        return await axios({
            method : 'POST',
            url : `${this.server}/popup/image/${ADID}`,
            data : formData,
            withCredentials: true,
            timeout: 5500,
            headers : {"Content-type":"multipart/form-data", "enctype":"multipart/form-data"}
        }).then(response => {
            if(response.status === 200) return {type : 'success'};
            else return {type: 'error', msg : response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        });
    }
    async remove(ADID) {
        return await axios({
            method: 'DELETE',
            url : `${this.server}/popup/${ADID}`,
            withCredentials : true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type : 'success'};
            else return {type: 'error', msg : response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        })
    }
}
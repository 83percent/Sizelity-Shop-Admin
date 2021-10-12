import axios from 'axios';


class AD {
    constructor(server) {
        this.server = server;
    }
    getList() {
        return axios({
            method: 'GET',
            url: `${this.server}/ad/main`
        }).then(response => {
            if(response.status === 200) return {type: "success", data: response.data};
            else return {type: "error", msg: "서버에 문제가 발생했습니다."};
        }).catch(error => {
            if(error?.repsonse?.data?.error) return {type: "error", msg: error.response.data.error};
            else return {type: "error", msg: "네트워크 연결을 확인해주세요."};
        })
    }
}

export default AD;
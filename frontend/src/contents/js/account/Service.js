/*
    서비스 이용량 Handler
*/

import axios from "axios";

class Service {
    constructor(id) {
        this.id = id;
    }
    get() {
        axios({
            method : 'GET',
            url : `${this.server}/account`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                console.log(repsonse);
            }
        }).catch(error => {
            console.error(error);

        })
    }
}

export default Service;
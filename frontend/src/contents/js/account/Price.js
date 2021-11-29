class Price {
    constructor(name, expire) {
        this.name = name;
        this.expire = expire;
    }
    getBenefit(__expire) {
        let expire = undefined;
        if(__expire === 0 || __expire) {
            expire = __expire;
        } else {
            expire = this.expire;
        }
        switch(expire) {
            case 0 : {
                return {
                    discount : 0,
                    income : 0
                }
            }
            case 3 : {
                return {
                    discount : 5,
                    income : 0
                }
            }
            case 6 : {
                return {
                    discount : 10,
                    income : 0.05
                }
            }
            case 12 : {
                return {
                    discount : 20,
                    income : 0.1
                }
            }
            default : return null;
        }
    }
    getPrice(__name) {
        let name = undefined;
        if(__name) {
            name = __name;
        } else {
            name = this.name;
        }
        const priceName = ['basic', 'standard', 'deluxe', 'premium'];
        if(priceName.includes(name)) {
            switch(name) {
                case 'basic' : {
                    return {
                        name,
                        base : 0,
                        price : 1.2,
                        count : 0,
                        income : 0.4
                    }
                }
                case 'standard' : {
                    return {
                        name,
                        base : 9900,
                        price : 1.2,
                        count: 20000,
                        income : 0.4
                    }
                }
                case 'deluxe' : {
                    return {
                        name,
                        base : 49000,
                        price : 1.1,
                        count : 100000,
                        income : 0.4
                    }
                }
                case 'premium' : {
                    return {
                        name,
                        base : 99000,
                        price : 0.9,
                        count: 200000,
                        income : 0.4
                    }
                }
                default : return null;
            }
        } else {
            return null;
        }
        
    }
    applyExpirePrice(__expire) {
        let expire = undefined;
        if(__expire === 0 || __expire) {
            expire = __expire;
        } else {
            expire = this.expire;
        }
        const priceObject = this.getPrice(this.name);
        switch(expire) {
            case 0 : {
                break;
            }
            case 3 : {
                priceObject.base = priceObject.base - ((priceObject.base/100)*5);
                break;
            }
            case 6 : {
                priceObject.base = priceObject.base - ((priceObject.base/100)*10);
                priceObject.income = priceObject.income + 0.05;
                break;
            }
            case 12 : {
                priceObject.base = priceObject.base - ((priceObject.base/100)*20);
                priceObject.income = priceObject.income + 0.1;
                break;
            }
            default : return null;
        }
        return priceObject;
    }
}


export default Price;
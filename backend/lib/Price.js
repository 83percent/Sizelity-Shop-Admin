const getBasePrice = function(name) {
    switch(name) {
        case 'basic' : {
            return {
                name,
                base : 0,
                price: 1.2,
                free_count: 0,
                income: 0.4
            }
        }
        case 'standard' : {
            return {
                name,
                base : 9900,
                price: 1.2,
                free_count: 20000,
                income: 0.4
            }
        }
        case 'deluxe' : {
            return {
                name,
                base : 49000,
                price: 1.1,
                free_count: 100000,
                income: 0.4
            }
        }
        case 'premium' : {
            return {
                name,
                base : 99000,
                price: 0.9,
                free_count: 200000,
                income: 0.5
            }
        }
        default : return null;
    }    
}
function getPrePayPrice(base, expire) {
    let __noDiscountPrice = base * expire;
    switch(expire) {
        case 3 : {
            __noDiscountPrice = __noDiscountPrice - ((__noDiscountPrice / 100) * 5);
            break;
        }
        case 6 : {
            __noDiscountPrice = __noDiscountPrice - ((__noDiscountPrice / 100) * 10);
            break;
        }
        case 12 : {
            __noDiscountPrice = __noDiscountPrice - ((__noDiscountPrice / 100) * 20);
            break;
        }
        default : return null;
    }
    return Math.floor(__noDiscountPrice + ((__noDiscountPrice / 100) * 10));
}
function getPrice({name, expire}) {
    const base = getBasePrice(name);
    base.start_date = new Date().toString();
    if(!base) return null;
    if(expire !== 0) {
        // 선 결제 정보 저장
        base.pre_pay = {
            price: getPrePayPrice(base.base, expire),
            check: false
        }
        base.base = 0;
    }

    base.expire = expire;
    
    switch(expire) {
        case 6 : {
            base.income = base.income + 0.05;
            return base;
        }
        case 12 : {
            base.income = base.income + 0.1;
            return base;
        }
        default : {
            return base;
        }
    }
}

module.exports = {
    getPrice
}
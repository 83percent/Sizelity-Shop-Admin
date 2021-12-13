function transformDate(value, expire) {
    if(value === undefined) return null;
    if(value.constructor !== Date)  value = new Date(value);
    if(expire) {
        value.setMonth(value.getMonth() + expire);
    }
    return `${value.getFullYear()}-${value.getMonth() >= 9 ? value.getMonth()+1 : "0"+(value.getMonth()+1)}-${value.getDate() >= 10 ? value.getDate() : "0"+value.getDate()}`
    
}

function eventDay(date) {
    if(!date) return null;
    // D-Day 날짜 지정
    const setDate = new Date(date);
    // D-day 날짜의 연,월,일 구하기

    // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
    const now = new Date();

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
    const distance = setDate.getTime() - now.getTime();
    
    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다. 
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    const day = Math.floor(distance/(1000*60*60*24)) + 1;

    if(day === 0) return "곧 마감";
    if(day === 1) return "내일 마감";
    else return `마감 ${day}일 전`;
}

function eventDateCheck(year, month, day) {
    if(!year || !month || !day) return false;
    const now = new Date();
    const _year = now.getFullYear();

    if(year < _year || year > _year+2 || month <= 0 || month > 12 || day <= 0 || day > 31) {
        return {type : 'error', msg: '올바른 날짜를 입력해주세요.'};
    }
    const setDate = new Date(`${year}-${month}-${day}`);
    const distance = setDate.getTime() - now.getTime();
    const dday = Math.floor(distance/(1000*60*60*24)) + 1;
    if(dday < 0) return {type : 'error', msg: '종료날짜가 지났습니다. (최소 0일)'}
    else if(dday > 365) {
        return {type : 'error', msg: '이벤트 기간이 너무 깁니다. (최대 365일)'}
    }
    return {type : 'success', date: `${year}-${month}-${day}`};
}

module.exports = {
    transformDate,
    eventDay,
    eventDateCheck
}
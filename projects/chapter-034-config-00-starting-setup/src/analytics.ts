// 파라미터 변수와 다르게 일반 변수는 any 타입이 가능한데 컴파일러가 추적 가능하기 때문이다.
let logged;

// noImplicitAny 설정이 true 인 경우 임의로 any를 사용하는 코드에 대해 컴파일 에러를 발생시킨다.
function sendAnalytics(data: string) {
    console.log(data);
    logged = true;
    console.log(logged);
}

sendAnalytics("The data for analytics");

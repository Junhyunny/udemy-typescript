
## 2. What is TypeScript and why should you use it?

### 2.1. What is TypeScript?

* JavaScript 상위 집합
* JavaScript를 기반으로 하는 언어
* 새로운 기능들이 추가되었고, JavaScript 이점을 가질 수 있는 언어
* JavaScript로 컴파일되는 언어
* TypeScript 컴파일러가 JavaScript로 컴파일한다.
* 좋은 syntax, snippet 제공
* JavaScript 언어에 타입을 제공
* 코드 에러를 미리 감지할 수 있다.
* 런타임 에러를 컴파일 시점에 미리 해결할 수 있다.

### 2.2. Why TypeScript?

* 런타임에 발생하는 의도치 않은 에러를 미리 발견한다.

##### 예시

* 숫자를 더하는 기능이지만, 타입을 체크하지 않기 때문에 문자열을 입력받을 수 있다.
* 문자열을 입력 받으면 문자열을 더하기(concat) 때문에 '23'이 출력된다.

```javascript
function add(number1, number2) {
    return number1 + number2;
}

console.log(add('2', '3'));
```

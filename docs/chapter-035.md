
## 35. Compiling the Entire Project / Multi Files

* `--init` 옵션을 사용하면 `TypeScript` 빌드에 필요한 설정 파일이 생성된다.

```
$ tsc --init
```

* 프로젝트 디렉토리를 초기화하고 해당 위치에서 `tsc` 명령어를 수행한다.
* 별도 파일을 지정하지 않고 컴파일을 수행하는 경우 컨텍스트 디렉토리에 위치한 파일들을 모두 컴파일 대상으로 삼는다.

```
$ tsc --watch
```

##### tsconfig.json 파일 주요 설정

* `lib` 
    * TypeScript 컴파일을 위해 필수적으로 필요한 라이브러리
    * 별도로 지정하지 않는 경우 `target`에 맞추어 기본적인 라이브러리들이 추가된다.
    * 지정하는 경우 필요한 라이브러리 의존성을 주입해주지 않는 경우 에러가 발생한다.
* `rootDir`
    * 타입스크립트 소스 코드가 위치한 경로
* `outDir`
    * 컴파일한 자바스크립트 파일이 위치할 경로
* `removeComments`
    * 컴파일 시 주석 제거 여부
* `noEmit`
    * 자바스크립트 파일 생성하지 않음 여부
* `noEmitOnError`
    * 에러로 인한 컴파일 실패 시 자바스크립트 파일 생성하지 않음 여부
* `strict`
    * 타입스크립트 컴파일 검사 수준 옵션
    * 만약 false 인 경우에는 하위에 설정들을 조절하여 필요한 부분만 컴파일할 수 있다.
    * `-------------------- type checking details` 영역
* `noUnusedLocals`
    * 로컬 변수 사용 여부 확인
* `noUnusedParameters`
    * 함수의 파라미터 변수 사용 여부 확인
* `noImplicitReturns`
    * 함수의 반환 값이 없는 경우가 발생하는지 확인

```json{
{
  "compilerOptions": {
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // this is default library setting for target es6
    // "lib": [
    //   "DOM",
    //   "ES6",
    //   "DOM.Iterable",
    //   "ScriptHost"
    // ] /* Specify a set of bundled library declaration files that describe the target runtime 
    
    // ...
    "rootDir": "./src" /* Specify the root folder within your source files. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,

    "removeComments": true /* Disable emitting comments. */,
    "noEmit": true /* Disable emitting files from a compilation. */,
    "noEmitOnError": true /* Disable emitting files if any type checking errors are reported. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,

    // -------------------- type checking details
    // "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    // "strictNullChecks": true /* When type checking, take into account 'null' and 'undefined'. */,
    // "strictFunctionTypes": true /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */,
    // "strictBindCallApply": true /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */,
    // "strictPropertyInitialization": true /* Check for class properties that are declared but not set in the constructor. */,
    // "noImplicitThis": true /* Enable error reporting when 'this' is given the type 'any'. */,
    // "useUnknownInCatchVariables": true /* Default catch clause variables as 'unknown' instead of 'any'. */,
    // "alwaysStrict": true /* Ensure 'use strict' is always emitted. */,
    // -------------------- type checking details

    "noUnusedLocals": true /* Enable error reporting when local variables aren't read. */,
    "noUnusedParameters": true /* Raise an error when a function parameter isn't read. */,
    "noImplicitReturns": true /* Enable error reporting for codepaths that do not explicitly return in a function. */,
  }
}
```
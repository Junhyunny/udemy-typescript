
## The TypeScript Compiler

### 1. tsc -w 옵션 

* `-w`, `--watch` 옵션 사용 시 특정 파일의 변경 사항이 발생할 때마다 자동으로 컴파일을 유도할 수 있다.

```
$ tsc app.ts -w
```

### 2. tsc init

* TypeScript 프로젝트 만드는 명령어
* 해당 명령어를 수행하면 `tsconfig.json` 파일이 생성된다.
* tsc 명령어만으로 해당 프로젝트의 TypeScript 파일을 컴파일할 수 있다.

```
$ tsc init

$ tsc 
$ tsc -w
```

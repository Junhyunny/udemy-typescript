
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
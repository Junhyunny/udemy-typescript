
## 25. Type Aliases & Object Types

타입 별칭은 커스텀 타입을 만들 때 사용합니다. 
`union type`만 허용하는 것이 아니라 오브젝트처럼 복잡한 형태로 타입을 표현할 수 있습니다.

```typescript
    type User = { name: string; age: number };
    const u1: User = { name: 'Max', age: 30 }; // this works!
```

##### 커스텀 타입을 사용한 예시 - 변경 전

```typescript
    function greet(user: { name: string; age: number }) {
      console.log('Hi, I am ' + user.name);
    }
     
    function isOlder(user: { name: string; age: number }, checkAge: number) {
      return checkAge > user.age;
    }
```

##### 커스텀 타입을 사용한 예시 - 변경 후

```typescript
    type User = { name: string; age: number };
     
    function greet(user: User) {
      console.log('Hi, I am ' + user.name);
    }
     
    function isOlder(user: User, checkAge: number) {
      return checkAge > user.age;
    }
```
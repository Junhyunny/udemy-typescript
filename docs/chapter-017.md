
## 17. Nested Objects & Types

* 다음 객체는 JavaScript 객체

```javascript
    const product = {
      id: 'abc1',
      price: 12.99,
      tags: ['great-offer', 'hot-and-new'],
      details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
      }
    }
```

* 다음은 위 JavaScript 객체를 TypeScript의 타입으로 표현한 모습

```typescript
    {
      id: string;
      price: number;
      tags: string[];
      details: {
        title: string;
        description: string;
      }
    }
```
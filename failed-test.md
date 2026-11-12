# 검색 스타일 시나리오

```ts
// file: src/components/feedback/style-conventions.test.ts
import { execFileSync } from 'node:child_process';
import { expect, test } from 'vitest';
```

- [x] styleConventionsAllowCurrentSearchForm — 검색 폼을 포함한 전체 src가 기존 스타일 검사를 통과한다.
```ts
test('styleConventionsAllowCurrentSearchForm', () => {
  const output = execFileSync('sh', ['scripts/check-styles.sh'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
  expect(output).toContain('스타일 검사 통과');
});
```

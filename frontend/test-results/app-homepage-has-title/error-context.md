# Test info

- Name: homepage has title
- Location: C:\Users\co-ttran\OneDrive - Computer Generated Solutions, Inc\Work\upload-docs\frontend\tests\app.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at C:\Users\co-ttran\OneDrive - Computer Generated Solutions, Inc\Work\upload-docs\frontend\tests\app.spec.ts:4:14
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('homepage has title', async ({ page }) => {
> 4 |   await page.goto('/');
    |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  5 |   await expect(page).toHaveTitle(/React App/);
  6 | });
  7 |
```
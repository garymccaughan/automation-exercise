const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Products API', () => {
  test('API 1: Get All Products List', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/productsList`);

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API 2: POST To All Products List', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/productsList`);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported.');
  });
});

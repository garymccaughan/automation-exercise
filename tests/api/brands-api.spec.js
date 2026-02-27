const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Brands API', () => {
  test('API 3: Get All Brands List', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/brandsList`);

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.brands).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('API 4: PUT To All Brands List', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/brandsList`);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported.');
  });
});

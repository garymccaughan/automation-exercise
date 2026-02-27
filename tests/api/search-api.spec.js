const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Search Product API', () => {
  test('API 5: POST To Search Product', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`, {
      form: { search_product: 'top' },
    });

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('Bad request, search_product parameter is missing in POST request.');
  });
});

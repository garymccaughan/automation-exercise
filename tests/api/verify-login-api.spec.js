const { test, expect } = require('@playwright/test');
const userData = require('../../data/user.data');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Verify Login API', () => {
  const reg = userData.registration;
  let testEmail;

  test.beforeAll(async ({ request }) => {
    testEmail = reg.email();
    await request.post(`${BASE_URL}/createAccount`, {
      form: {
        name: reg.name,
        email: testEmail,
        password: reg.password,
        title: reg.title,
        birth_date: reg.birthDay,
        birth_month: reg.birthMonth,
        birth_year: reg.birthYear,
        firstname: reg.firstName,
        lastname: reg.lastName,
        company: reg.company,
        address1: reg.address1,
        address2: reg.address2,
        country: reg.country,
        zipcode: reg.zipcode,
        state: reg.state,
        city: reg.city,
        mobile_number: reg.mobileNumber,
      },
    });
  });

  test.afterAll(async ({ request }) => {
    await request.delete(`${BASE_URL}/deleteAccount`, {
      form: { email: testEmail, password: reg.password },
    });
  });

  test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/verifyLogin`, {
      form: {
        email: testEmail,
        password: reg.password,
      },
    });

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User exists!');
  });

  test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/verifyLogin`, {
      form: { password: userData.login.password },
    });

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('Bad request, email or password parameter is missing in POST request.');
  });

  test('API 9: DELETE To Verify Login', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/verifyLogin`);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported.');
  });

  test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/verifyLogin`, {
      form: {
        email: userData.invalidLogin.email,
        password: userData.invalidLogin.password,
      },
    });

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found!');
  });
});

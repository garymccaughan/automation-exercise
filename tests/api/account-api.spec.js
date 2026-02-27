const { test, expect } = require('@playwright/test');
const userData = require('../../data/user.data');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Account API', () => {
  const reg = userData.registration;
  let testEmail;

  test.beforeAll(() => {
    testEmail = reg.email();
  });

  test('API 11: POST To Create/Register User Account', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/createAccount`, {
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

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(201);
    expect(body.message).toContain('User created!');
  });

  test('API 14: GET user account detail by email', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/getUserDetailByEmail`, {
      params: { email: testEmail },
    });

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.user).toBeTruthy();
  });

  test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/updateAccount`, {
      form: {
        name: 'Updated User',
        email: testEmail,
        password: reg.password,
        title: reg.title,
        birth_date: reg.birthDay,
        birth_month: reg.birthMonth,
        birth_year: reg.birthYear,
        firstname: 'Updated',
        lastname: 'User',
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

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User updated!');
  });

  test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/deleteAccount`, {
      form: {
        email: testEmail,
        password: reg.password,
      },
    });

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('Account deleted!');
  });
});

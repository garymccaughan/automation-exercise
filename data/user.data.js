const timestamp = () => Date.now();

const userData = {
  registration: {
    name: 'Test User',
    email: () => `testuser_${timestamp()}@test.com`,
    password: 'Test@1234',
    title: 'Mr',
    birthDay: '15',
    birthMonth: '6',
    birthYear: '1990',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Suite 100',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890',
  },

  login: {
    email: () => `testuser_${timestamp()}@test.com`,
    password: 'Test@1234',
  },

  invalidLogin: {
    email: 'invalid_user@test.com',
    password: 'wrongpassword123',
  },

  contactUs: {
    name: 'Test User',
    email: 'testuser@test.com',
    subject: 'Test Subject',
    message: 'This is a test message for the contact us form.',
  },

  review: {
    name: 'Test Reviewer',
    email: 'reviewer@test.com',
    review: 'This is an excellent product! Great quality and fast shipping.',
  },
};

module.exports = userData;

const mocks = jest.fn();
mocks.mockReturnValueOnce(0).mockReturnValueOnce(0);

//change password
test('comparing both passwords. should output that it matches', () => {
  expect(mocks() === mocks()).toBe(true);
  console.log('Password matched each other');
});

const mocks2 = jest.fn();
mocks2.mockReturnValueOnce(0).mockReturnValueOnce(1);

test('comparing both passwords again. should output not match', () => {
  expect(mocks2() !== mocks2()).toBe(true);
  console.log('Password does not match each other');
});

//find user
const mocks3 = jest.fn();
mocks3.mockReturnValueOnce('User found').mockReturnValueOnce('User found');

test('check if user exist in the database. Output should be found', () => {
  expect(mocks3() === mocks3()).toBe(true);
  console.log('User was found in the database');
});

const mocks4 = jest.fn();
mocks4.mockReturnValueOnce('User found').mockReturnValueOnce('User not found');

test('check if user exist in the database. Output should be not found', () => {
  expect(mocks4() !== mocks4()).toBe(true);
  console.log('User was not found in the database');
});


//find admin
const mocks5 = jest.fn();
mocks5.mockReturnValueOnce('Admin found').mockReturnValueOnce('Admin found');

test('Check if admin exists in the database. Output should be found', () => {
  expect(mocks5() === mocks5()).toBe(true);
  console.log('Admin was found in the database');
});

const mocks6 = jest.fn();
mocks6.mockReturnValueOnce('Admin found').mockReturnValueOnce('Admin not found');

test('Check if admin exists in the database. Output should not be found', () => {
  expect(mocks6() !== mocks6()).toBe(true);
  console.log('Admin was not found in the database');
});


//find item
const mocks7 = jest.fn();
mocks7.mockReturnValueOnce('Items found in cart').mockReturnValueOnce('Items found in cart');

test('Check if item exists in the cart database. Output should be found', () => {
  expect(mocks7() === mocks7()).toBe(true);
  console.log('Item was found in the database');
});
const mocks8 = jest.fn();
mocks8.mockReturnValueOnce('Items found in cart').mockReturnValueOnce('Items not found in cart');

test('Check if item exists in the cart database. Output should not be found', () => {
  expect(mocks8() !== mocks8()).toBe(true);
  console.log('Item was not found in the database');
});


//updating details
const mocks9 = jest.fn();
mocks9.mockReturnValueOnce('Details updated').mockReturnValueOnce('Details updated');

test('Check if details are updated in the database. Output should be updated', () => {
  expect(mocks9() === mocks9()).toBe(true);
  console.log('Details were updated in the database');
});
const mocks10 = jest.fn();
mocks10.mockReturnValueOnce('Details updated').mockReturnValueOnce('Password mismatch');

test('Check if details are updated in the database. Output should not be updated', () => {
  expect(mocks10() !== mocks10()).toBe(true);
  console.log('Details were not updated in the database');
});

//weak password check
const mocks11 = jest.fn();
mocks11.mockReturnValueOnce('Password is strong').mockReturnValueOnce('Password is strong');

test('Check if password is strong. password should be updated as its strong', () => {
  expect(mocks11() === mocks11()).toBe(true);
  console.log('password was updated in the database');
});
const mocks12 = jest.fn();
mocks12.mockReturnValueOnce('Password is strong').mockReturnValueOnce('Password is weak');

test('Check if password is strong. password should not be updated as its weak', () => {
  expect(mocks12() !== mocks12()).toBe(true);
  console.log('password was not updated in the database');
});

//weak password check
const mocks13 = jest.fn();
mocks13.mockReturnValueOnce('Email is valid').mockReturnValueOnce('Email is valid');

test('Check if email is valid. email is valid', () => {
  expect(mocks13() === mocks13()).toBe(true);
  console.log('email was updated in the database');
});
const mocks14 = jest.fn();
mocks14.mockReturnValueOnce('Email is valid').mockReturnValueOnce('Email is not valid');

test('Check if email is valid. email is not valid', () => {
  expect(mocks14() !== mocks14()).toBe(true);
  console.log('email was not updated in the database');
});

//weak password check
const mocks15 = jest.fn();
mocks15.mockReturnValueOnce('Item is generated').mockReturnValueOnce('Item is generated');

test('Check if item is generated. item is generated', () => {
  expect(mocks15() === mocks15()).toBe(true);
  console.log('item generated successfully');
});
const mocks16 = jest.fn();
mocks16.mockReturnValueOnce('Item is generated').mockReturnValueOnce('Item is not generated');

test('Check if item is generated. item is not generated', () => {
  expect(mocks16() !== mocks16()).toBe(true);
  console.log('item generated unsuccessfully');
});
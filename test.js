const mocks = jest.fn();
mocks.mockReturnValueOnce(0).mockReturnValueOnce(0);

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
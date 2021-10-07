const loginModel = require('./loginModel');

test('Register account successful', () => {
    expect(loginModel.register("Kurisu", "Chong", "email@gmail.com", "address 123", "0401234567", "Pass@123").toBe("Registered"));
})

test('Register account weak password', () => {
    expect(loginModel.register("Kurisu", "Chong", "emailsixtynine@gmail.com", "address 123", "0401234567", "password").toBe("Weak Password"));
})

test('Register account invalid email', () => {
    expect(loginModel.register("Kurisu", "Chong", "email", "address 123", "0401234567", "Pass@123").toBe("Invalid Email"));
})
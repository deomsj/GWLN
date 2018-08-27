// During Development:
//  - set set loginCredentials for testing app as different types of users

const member = false;
const eventAdmin = false;

// Default: Not Signed In
let loginCredentials = {};

if (member) {
  loginCredentials = {
    email: 'angie.mccurdy@elevationscu.com',
    password: 'abc123'
  };
} else if (eventAdmin) {
  loginCredentials = {
    email: 'Brooke.thomas@elevationscu.com',
    password: 'abc123'
  };
}

export default loginCredentials;

function User() {
}

User.prototype.signup = function() {
  var signupForm = document.forms['signup-form'];

  var userData = []
  for (var i = 0; i < signupForm.length; i++) {
    userData.push(signupForm.elements[i].value);
  }

  var newUser = {
    name: userData[0],
    email: userData[1],
    password: userData[2]
  }

  var users = [];

  if (localStorage.getItem('users')) {
    users.push(JSON.parse(localStorage.getItem('users')));
  }

  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));

  return false;
}

User.prototype.signin = function() {
  var signinForm = document.forms['signin-form'];

  var userData = [];
  for (var i = 0; i < signinForm.length; i++) {
    userData.push(signinForm.elements[i].value);
  }

  var user = this.searchUsers(userData[0], userData[1]);

  if (user) {
    userData = {
      name: user.name,
      email: user.email
    };

    this.name = user.name;
    this.email = user.email;

    localStorage.setItem('auth', JSON.stringify(userData));
    location.href = 'dashboard.html';
  } else {
    alert('Could not find user with those credentials!');
  }

  return false;
}

User.prototype.searchUsers = function(email, password){
  var users = JSON.parse(localStorage.getItem('users'));

  for (var i=0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
          return users[i];
      }
  }
}

User.prototype.signout = function() {
  localStorage.removeItem('auth');
  window.location = 'index.html';
};

var user = new User();
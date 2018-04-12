function User() {
}

User.prototype.signup = function() {
  var signupForm = document.forms['signup-form'];

  var errors = signupForm.getElementsByClassName('error-message');
  if (errors) {
    while (errors[0]) {
      errors[0].parentNode.removeChild(errors[0]);
    }
  }

  var userData = []
  for (var i = 0; i < signupForm.length - 1; i++) {
    if (signupForm.elements[i].value === '') {
      var errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = 'ERROR';
      signupForm.elements[i].parentNode.appendChild(errorMessage);
      return false;
    } else {
      userData.push(signupForm.elements[i].value);
    }
  }

  var newUser = {
    firstname: userData[0],
    lastname: userData[1],
    school: userData[2],
    country: userData[3],
    email: userData[4],
    password: userData[5]
  }

  if (this.userExists(newUser.email)) {
    alert('A user is already signed up with that email!');
    return false;
  }

  var users = [];

  if (localStorage.getItem('users')) {
    var existingUsers = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < existingUsers.length; i++) {
      users.push(existingUsers[i]);
    }
  }

  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));

  return false;

}

User.prototype.signin = function() {
  var signinForm = document.forms['signin-form'];

  var errors = signinForm.getElementsByClassName('error-message');
  if (errors) {
    while (errors[0]) {
      errors[0].parentNode.removeChild(errors[0]);
    }
  }

  var userData = [];
  for (var i = 0; i < signinForm.length - 1; i++) {
    if (signinForm.elements[i].value === '') {
      var errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = 'ERROR';
      signinForm.elements[i].parentNode.appendChild(errorMessage);
      return false;
    } else {
      userData.push(signinForm.elements[i].value);
    }
  }

  var user = this.lookupUser(userData[0], userData[1]);

  if (user) {
    userData = {
      firstname: user.firstname,
      lastname: user.lastname,
      school: user.school,
      country: user.country,
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

User.prototype.lookupUser = function(email, password){
  var users = JSON.parse(localStorage.getItem('users'));

  for (var i=0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
          return users[i];
      }
  }
}

User.prototype.userExists = function(email) {
  var users = JSON.parse(localStorage.getItem('users'));

  if (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return true;
      } else {
        return false;
      }
    }  
  } else {
    return false;
  }

};

User.prototype.signout = function() {
  localStorage.removeItem('auth');
  window.location = 'index.html';
  return false;
};

User.prototype.authenticateUser = function() {
  var user = JSON.parse(localStorage.getItem('auth'));
  
  if (!user) {
    window.location = 'index.html'
  }

  return user;
};

var user = new User();
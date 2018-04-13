function User() {
}

User.prototype.signup = function() {
  var signupForm = document.forms['signup-form'];
  var errors = 0;

  var userData = []
  for (var i = 0; i < signupForm.length - 1; i++) {
    if (signupForm.elements[i].value === '') {
      errors++;
    } else {
      userData.push(signupForm.elements[i].value);
    }
  }

  if (errors) {
    alert('All fields has to be filled!');
    return false;
  }

  var newUser = {
    firstname: userData[0],
    lastname: userData[1],
    image: 'public/images/avatar.svg',
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

  newUser.id = (users.length + 1)

  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));

  alert('User created! You can now login!');
  document.getElementById('login-tab-button').click();

  return false;

}

User.prototype.signin = function() {
  var signinForm = document.forms['signin-form'];
  var errors = 0;

  var userData = [];
  for (var i = 0; i < signinForm.length - 1; i++) {
    if (signinForm.elements[i].value === '') {
      errors++;
    } else {
      userData.push(signinForm.elements[i].value);
    }
  }

  if (errors) {
    alert('Please provide your email and password to login.');
    return false;
  }

  var user = this.lookupUser(userData[0], userData[1]);

  if (user) {
    userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.image,
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
          break; // Avoid infinite loop
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

}

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
}

User.prototype.update = function(id, formElements) {
  var userData = [];
  var errors = 0;

  // Loop the formelements values and put them into userdata array 
  //throw an error if an field is empty except for image
  for (var i = 0; i < formElements.length - 1; i++) {
    if (formElements[i].value == '' && formElements[i].id != 'image') {
      errors++;
    } else {
      userData.push(formElements[i].value);
    }
  }

  // Check if there is any errors, if not - update the right localStorage user
  if (errors) {
    alert('All fields should have an value except Profile Image!')
  } else {
    // Get all users from localStorage and loop over them to find the right one and delete it.
    var users = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users.splice(i, 1);

        break; // Break to avoid infinite loop
      }
    }

    // Check if image is empty - set dummy image if it is.
    if (userData[2] == '') {
      userData[2] = 'public/images/avatar.svg';
    }

    // Object that represents the updated user.
    var updatedUser = {
      id: id,
      firstname: userData[0],
      lastname: userData[1],
      image: userData[2],
      school: userData[3],
      country: userData[4],
      email: userData[5],
      password: userData[6]
    }

    // Push updated user to the user array.
    users.push(updatedUser);

    // Set the localStorage with the new user array.
    localStorage.setItem('users', JSON.stringify(users));

    // Finally update the auth object and send the user to their profile.
    localStorage.setItem('auth', JSON.stringify({
      id: id,
      firstname: userData[0],
      lastname: userData[1],
      image: userData[2],
      school: userData[3],
      country: userData[4],
      email: userData[5],
    }));
    window.location = 'profile.html';
  }

}

var user = new User();
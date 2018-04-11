function ProfileController() {
  this.user = user.authenticateUser();

  document.getElementById('user').innerHTML = this.user.firstname;

  var fullname = this.user.firstname + " " + this.user.lastname;
  document.getElementById('profile-username').innerHTML = fullname;

  var schoolname = this.user.school + ", " + this.user.country;
  document.getElementById('school-name').innerHTML = schoolname;
}
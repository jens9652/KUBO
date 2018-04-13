function DashboardController() {
  this.user = user.authenticateUser();

  document.getElementById('user').innerHTML = this.user.firstname;
  document.getElementById('profile-image-header').src = this.user.image;
}
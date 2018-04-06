function DashboardController() {
  this.user = user.authenticateUser();

  document.getElementById('user').innerHTML = this.user.name;
}
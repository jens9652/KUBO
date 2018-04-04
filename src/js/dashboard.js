function DashboardController() {
  this.user = user.authenticateUser();

  document.getElementById('name').innerHTML = this.user.name;
}
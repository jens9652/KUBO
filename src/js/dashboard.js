function DashboardController() {
  this.user = JSON.parse(localStorage.getItem('auth'));
  if (this.user) {
    document.getElementById('name').innerHTML = this.user.name;
  } else { window.location = 'index.html' }
}
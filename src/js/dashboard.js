function DashboardController() {
  this.user = user.authenticateUser();

  document.getElementById('user').innerHTML = this.user.firstname;
  document.getElementById('profile-image-header').src = this.user.image;

  if (document.getElementById('profile-image-comment')) {
    document.getElementById('profile-image-comment').src = this.user.image;
    document.getElementById('profile-user-comment').innerHTML = this.user.firstname + ' ' + this.user.lastname;
  }
}

DashboardController.prototype.setLatestsLessons = function() {
  var lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

  if (lessonPlans) {
    var container = document.createElement('div');
    container.className = 'container';

    var numberOfLessons = 0;

    for (var i = 0; i < lessonPlans.length; i++) {
      var div = document.createElement('div');
      div.className = 'lesson';

      var image = lessonPlans[i].image;

      if (!image) {
        image = 'public/images/Coding-box-open-2.jpg';
      }

      div.innerHTML = 
        '<div class="inner" style="background-image: url(&quot;' + image + '&quot;)">\
          <div class="overlay"></div>\
          <div class="text">\
            <h3>' + lessonPlans[i].title + '</h3>\
            <p>' + lessonPlans[i].description.substring(0, 110) + '...</p>\
            <a href="view-lessonplan.html" onclick="controller.setLessonplan(' + lessonPlans[i].id + ')" class="btn btn-primary">View Lesson Plan</a>\
          </div>\
        </div>'

      container.appendChild(div);
      numberOfLessons++;

      if (numberOfLessons == 3) {
        break;
      }
    }

    document.getElementById('latest-lessons').appendChild(container);
  }
}

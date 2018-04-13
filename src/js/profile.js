function ProfileController() {
	this.user = user.authenticateUser();

	document.getElementById('user').innerHTML = this.user.firstname;

	var fullname = this.user.firstname + " " + this.user.lastname;

	document.getElementById('user-name').innerHTML = fullname;

	var schoolname = this.user.school + ", " + this.user.country;
	document.getElementById('school-name').innerHTML = schoolname;

	var userLessons = fullname + "'s latest lesson plans";
	document.getElementById('users-latest-lessons').innerHTML = userLessons;

	var userPosts = fullname + "'s latest community posts";
	document.getElementById('user-posts').innerHTML = userPosts;

	document.getElementById('username-post1').innerHTML = fullname;
	document.getElementById('username-post2').innerHTML = fullname;
	document.getElementById('username-post3').innerHTML = fullname;

	this.showLessonPlans(this.user.id);
}

ProfileController.prototype.previewProfileImage = function(event) {
	var reader = new FileReader();
	reader.onload = function()

	{
		var output = document.getElementById('output_image');
		output.src = reader.result;
	}

	reader.readAsDataURL(event.target.files[0]);
}

ProfileController.prototype.showLessonPlans = function(id) {
	var lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

	var container = document.createElement('div');
	container.className = 'container';

	var userPosts = 0;

	for (var i = 0; i < lessonPlans.length; i++) {

		if (lessonPlans[i].author.id == id) {
			var div = document.createElement('div');
	    div.className = 'lesson';

	    div.innerHTML = 
	      '<div class="inner" style="background-image: url(&quot;public/images/charger-box.jpg&quot;)">\
	        <div class="overlay"></div>\
	        <div class="text">\
	          <h3>' + lessonPlans[i].title + '</h3>\
	          <p>' + lessonPlans[i].description + '</p>\
	          <a href="view-lessonplan.html" onclick="controller.setLessonplan(' + lessonPlans[i].id + ')" class="btn btn-primary">View Lesson Plan</a>\
	        </div>\
	      </div>'

	    container.appendChild(div);
	    userPosts++;
		}

		if (userPosts == 3) {
			break;
		}
	}

	document.getElementById('user-lessons').appendChild(container);
}
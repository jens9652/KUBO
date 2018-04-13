function ProfileController() {
	DashboardController.call(this);
}

ProfileController.prototype.setProfile = function() {

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

	document.getElementById('profile-image').src = this.user.image;

	this.showLessonPlans(this.user.id);
}

ProfileController.prototype.showLessonPlans = function(id) {
	var lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

	if (lessonPlans) {
		var container = document.createElement('div');
		container.className = 'container';

		var userPosts = 0;

		for (var i = 0; i < lessonPlans.length; i++) {

			if (lessonPlans[i].author.id == id) {
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
}

ProfileController.prototype.setFormFields = function() {
	// Get users from localStorage and loop to find current user - should return only the user from an API (but we have no server)
	var users = JSON.parse(localStorage.getItem('users'));

	for (var i = 0; i < users.length; i++) {
		if (users[i].id == this.user.id) {

			// User found, populate input fields!
			document.getElementById('firstname').value = users[i].firstname;
			document.getElementById('lastname').value = users[i].lastname;
			document.getElementById('school').value = users[i].school;
			document.getElementById('country').value = users[i].country;
			document.getElementById('email').value = users[i].email;
			document.getElementById('password').value = users[i].password;

			// Do not show dummy image path and only apply image value if it exists
			if (users[i].image && users[i].image != 'public/images/avatar.svg') {
				document.getElementById('image').value = users[i].image;
			}

			// Handy 'self' to target this object inside eventlistener as the default 'this' will be the form submitted
			var self = this;

			// Add eventlistener to form as we need the userId to be submitted to the user object
			document.getElementById('update-profile').addEventListener('submit', function (event) {
				event.preventDefault(); // Prevent default submit

				// Get the form values and pass them to the user object to update the user
				var formElements = this.elements;
				user.update(self.user.id, formElements);
			});

			// Break to avoid infinite looping
			break;
		}
	}
}

function ProfileController() {
	this.user = user.authenticateUser();

	document.getElementById('user').innerHTML = this.user.firstname;

	var fullname = this.user.firstname + " " + this.user.lastname;

	var username = fullname;
	document.getElementById('user-name').innerHTML = username;

	var schoolname = this.user.school + ", " + this.user.country;
	document.getElementById('school-name').innerHTML = schoolname;

	var userLessons = fullname + "'s latest lesson plans";
	document.getElementById('users-latest-lessons').innerHTML = userLessons;

	var userPosts = fullname + "'s latest community posts";
	document.getElementById('user-posts').innerHTML = userPosts;

	var usernamepost1 = fullname
	document.getElementById('username-post1').innerHTML = usernamepost1

	var usernamepost2 = fullname
	document.getElementById('username-post2').innerHTML = usernamepost2

	var usernamepost3 = fullname
	document.getElementById('username-post3').innerHTML = usernamepost3
}

function preview_image(event) {
	var reader = new FileReader();
	reader.onload = function()

	{
		var output = document.getElementById('output_image');
		output.src = reader.result;
	}

	reader.readAsDataURL(event.target.files[0]);
}

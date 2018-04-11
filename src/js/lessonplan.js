function Lessonplan() {
  this.user = user.authenticateUser();

  document.getElementById('user').innerHTML = this.user.firstname;
}

Lessonplan.prototype.addNewSection = function() {
  var container = document.getElementById('create-lesson');

  var div = document.createElement('div');
  div.className = 'section';

  div.innerHTML = 
    '<div class="input-control">\
      <label for="name">Section Title</label>\
      <input name="name" type="text" placeholder="Enter Section Title">\
    </div>\
    <div class="input-control">\
      <label for="textarea">Textarea</label>\
      <textarea name="textarea" id="textare" placeholder="Enter section content..."></textarea>\
    </div>\
    <hr class="divider">'

  container.appendChild(div);
};

Lessonplan.prototype.publish = function() {
  var lessonForm = document.forms['lesson-form'];
  var lessonMeta = document.forms['meta-data'];

  var lessonData = [];

  for (var i = 0; i < lessonForm.length; i++) {
    lessonData.push(lessonForm.elements[i].value);
  }

  lessonDataGrouped = [];

  for (var i = 0; i < lessonData.length; i++) {
    if ((i + 1) % 2 === 0) {
      var lesson = {
        title: lessonData[i - 1],
        content: lessonData[i]
      }

      lessonDataGrouped.push(lesson);
    }
  }

  var lessonMetaData = [];

  for (var i = 0; i < lessonMeta.length; i++) {
    lessonMetaData.push(lessonMeta.elements[i].value);
  }

  var finalObject = {
    title: lessonMetaData[0],
    description: lessonMetaData[1],
    sections: lessonDataGrouped
  }

  console.log(finalObject);

  var lessonPlans = [];

  if (localStorage.getItem('lessonPlans')) {
    var existingLessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));
    lessonPlans.push(existingLessonPlans[0]);
  }

  lessonPlans.push(finalObject);

  localStorage.setItem('lessonPlans', JSON.stringify(lessonPlans));
}

Lessonplan.prototype.listLessons = function(element) {
  lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

  for (var i = 0; i < lessonPlans.length; i++) {
    var div = document.createElement('div');
    div.className = 'lesson';

    div.innerHTML = 
      '<div class="inner" style="background-image: url(&quot;public/images/charger-box.jpg&quot;)">\
        <div class="overlay"></div>\
        <div class="text">\
          <h3>' + lessonPlans[i].title + '</h3>\
          <p>' + lessonPlans[i].description + '</p>\
          <a href="#" class="btn btn-primary">View Lesson Plan</a>\
        </div>\
      </div>'

    element.appendChild(div);
  }

};
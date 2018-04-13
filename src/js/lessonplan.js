function Lessonplan() {
  DashboardController.call();
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
    image: lessonMetaData[1],
    description: lessonMetaData[2],
    sections: lessonDataGrouped
  }

  var lessonPlans = [];

  if (localStorage.getItem('lessonPlans')) {
    var existingLessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));
    
    for (var i = 0; i < existingLessonPlans.length; i++) {
      lessonPlans.push(existingLessonPlans[i]);
    }
  }

  finalObject.id = (lessonPlans.length + 1);
  finalObject.author = this.user;

  console.log(finalObject)

  lessonPlans.unshift(finalObject);

  localStorage.setItem('lessonPlans', JSON.stringify(lessonPlans));
  localStorage.setItem('openedLessonplan', JSON.stringify(finalObject.id));
  window.location = 'view-lessonplan.html'
}

Lessonplan.prototype.listLessons = function(element) {
  var lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

  if (lessonPlans) {
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
            <p>' + lessonPlans[i].description + '</p>\
            <a href="view-lessonplan.html" onclick="controller.setLessonplan(' + lessonPlans[i].id + ')" class="btn btn-primary">View Lesson Plan</a>\
          </div>\
        </div>'

      element.appendChild(div);
    }
  }
}

Lessonplan.prototype.setLessonplan = function(id) {
  localStorage.setItem('openedLessonplan', JSON.stringify(id));
}

Lessonplan.prototype.openLesson = function(meta, accordion, header, toolbar) {
  var openedLessonplan = JSON.parse(localStorage.getItem('openedLessonplan'));

  if (!openedLessonplan) {
    window.location = 'lessonplans.html';
  }

  var lessons = JSON.parse(localStorage.getItem('lessonPlans'));

  for (var i = 0; i < lessons.length; i++) {
    if(lessons[i].id == openedLessonplan) { 
      this.showLesson(lessons[i], meta, accordion, header, toolbar)
    }
  }
}

Lessonplan.prototype.showLesson = function(lesson, meta, accordion, header, toolbar) {
  header.innerHTML = lesson.title;

  var metaContent = document.createElement('div');
  metaContent.className = 'container';

  metaContent.innerHTML = 
    '<div class="description">\
      <h3>About the Lesson</h3>\
      <p>' + lesson.description + '</p>\
    </div>\
    <div class="materials">\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
      <div class="material">\
        <img src="public/images/avatar.svg" alt="Dummy">\
        <span class="material-title">Movement TagTiles®</span>\
      </div>\
    </div>'

  meta.appendChild(metaContent);

  for (var i = 0; i < lesson.sections.length; i++) {
    var accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    if (i == 0) {
      accordionItem.classList.add('accordion-item', 'open');
    } else {
      accordionItem.classList.add('accordion-item', 'close');
    }

    accordionItem.innerHTML = 
      '<h2 class="accordion-heading" onclick="toggleAccordionItem(this)">\
        <span class="tactile"><span class="no">'+ (i + 1) +'</span><svg viewBox="0 0 100 100" xmlns="http:www.w3.org/2000/svg"><path d="M94.5 64.8c-.7-.7-2-.7-2.7 0l-.7-.7s-.7-.7 2.1-3.4l4-4c3.7-3.7 3.7-9.8 0-13.5l-6.5-6.5-.4.4s-.4.4-.1.8c.4.4.2 1.8-.8 2.8-.7.7-2 .7-2.8-.1l-4.3-4.3.1.1c-.9-.9-1-2.2-.3-3 1-1 2.4-1.2 3.1-.4l.4-.4s.4-.4-4-4.9L68.9 15s-1.4-1.4-.7-2c0 0-.7.7 0 0 0 0 .7-.7 1-.3s1.6.4 2.3-.4c.7-.7.7-2 0-2.7l-4-4c-.7-.7-2-.7-2.7 0s-.7 2 0 2.7l-.7.7s-.7.7-3.4-2.1l-4-4C53-.9 47-.9 43.3 2.8l-6.5 6.5.5.5.4.4c.7-.7 2.2-.5 3.1.4.7.7.7 2-.1 2.8l-4.2 4.2c-.9.9-2.2 1-3 .3-1-1-1.2-2.4-.4-3.1l-.4-.4s-.4-.4-4.9 4L13.6 32.5l-.6-.6-.4-.4s-.4-.4 0-.7c.4-.4.4-1.6-.4-2.3-.7-.7-2-.7-2.7 0l-4 4c-.7.7-.7 2 0 2.7s2 .7 2.7 0l1.3 1.3-1 1-5.8 5.8C-1 47-1 53.1 2.7 56.8l2.7 2.7 3.7 3.7.9-.9c-.7-.7-.5-2.2.4-3.1.7-.7 2-.7 2.8.1l1.4 1.4 2.9 2.9-.1-.1c.9.9 1 2.2.3 3-1 1-2.4 1.2-3.1.5l-.9.9L31.1 85s1.4 1.4.7 2c0 0 .7-.7 0 0 0 0-.7.7-1 .3-.4-.4-1.6-.4-2.3.4-.7.7-.7 2 0 2.7l4 4c.7.7 2 .7 2.7 0s.7-2 0-2.7l.7-.7s.7-.7 3.4 2.1l4 4c3.7 3.7 9.8 3.7 13.5 0l2.7-2.7 3.7-3.7-.9-.9c-.7.7-2.2.5-3.1-.4-.7-.7-.7-2 .1-2.8l4.3-4.3-.1.1c.9-.9 2.2-1 3-.3 1 1 1.2 2.4.4 3.1l.9.9L85 68.9s1.4-1.4 2-.7c0 0-.7-.7 0 0 0 0 .7.7.3 1s-.4 1.6.4 2.3c.7.7 2 .7 2.7 0l4-4c.9-.7.9-1.9.1-2.7"/></svg></span>\
        ' + lesson.sections[i].title + '\
      </h2>\
      <div class="accordion-item-content">\
        ' + lesson.sections[i].content + '\
      </div>'

    accordion.appendChild(accordionItem);
  }

  if (this.user.id == lesson.author.id) {
    toolbar.innerHTML = 
      '<button class="btn btn-success" onclick="controller.editLesson(' + lesson.id + ')">Edit Lesson</button>\
      <hr class="divider">'
  }

  document.title = 'KEDU | ' + lesson.title;

}

Lessonplan.prototype.editLesson = function(id) {
  localStorage.setItem('editingLesson', JSON.stringify(id));
  window.location = 'edit-lessonplan.html';
}

Lessonplan.prototype.editLessonplanPage = function() {
  var id = JSON.parse(localStorage.getItem('editingLesson'));
  var lessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));

  for (var i = 0; i < lessonPlans.length; i++) {
    if (lessonPlans[i].id == id) {
      document.getElementById('lessonTitle').value = lessonPlans[i].title;
      document.getElementById('lessonImage').value = lessonPlans[i].image;
      document.getElementById('lessonDescription').value = lessonPlans[i].description;
      
      var div = document.createElement('div');
      div.id = 'create-lesson';
      div.class = 'create-lesson';

      for (var i = 0; i < lessonPlans[i].sections.length; i++) {
        var section =lessonPlans[i].sections[i];

        var container = document.createElement('div');
        container.className = 'section';

        container.innerHTML = 
          '<div class="input-control">\
              <label for="name">Section Title</label>\
              <input name="name" type="text" value="' + section.title + '" placeholder="Enter Section Title..">\
            </div>\
            <div class="input-control">\
              <label for="textarea">Section Content</label>\
              <textarea name="textarea" id="textare" placeholder="Enter section content..">' + section.content + '</textarea>\
            </div>\
            <hr class="divider">'

        div.appendChild(container);
      }

      document.getElementById('lesson-form').appendChild(div);
      break;
    }
  }
}

Lessonplan.prototype.update = function(id) {
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
    image: lessonMetaData[1],
    description: lessonMetaData[2],
    sections: lessonDataGrouped
  }

  var lessonPlans = [];

  if (localStorage.getItem('lessonPlans')) {
    var existingLessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));
    
    for (var i = 0; i < existingLessonPlans.length; i++) {
      lessonPlans.push(existingLessonPlans[i]);
    }
  }

  finalObject.id = id;
  finalObject.author = this.user;

  for (var i = 0; i < lessonPlans.length; i++) {
    if (lessonPlans[i].id == id) {
      lessonPlans.splice(i, 1);
    }
  }

  lessonPlans.unshift(finalObject);

  localStorage.setItem('lessonPlans', JSON.stringify(lessonPlans));
  localStorage.setItem('openedLessonplan', JSON.stringify(finalObject.id));
  window.location = 'view-lessonplan.html';
}

Lessonplan.prototype.delete = function(id) {
  var lessonPlans = [];

  if (localStorage.getItem('lessonPlans')) {
    var existingLessonPlans = JSON.parse(localStorage.getItem('lessonPlans'));
    
    for (var i = 0; i < existingLessonPlans.length; i++) {
      if (existingLessonPlans[i].id == id) {
        console.log(id + ' slettet');
      } else {
        console.log(id + ' ikke slettet');
        lessonPlans.push(existingLessonPlans[i]);
      }
    }
  }

  localStorage.setItem('lessonPlans', JSON.stringify(lessonPlans));
  window.location = 'lessonplans.html';
};

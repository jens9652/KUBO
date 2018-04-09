function tabChangeContent(evt, target) {
  var tabContent = document.getElementsByClassName("tab-content");
  var tabLinks = document.getElementsByClassName('tab');

  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.add("disabled");
    tabContent[i].classList.remove("active");
  }

  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  var targetContent = document.getElementById(target);
  targetContent.classList.add("active");
  targetContent.classList.remove("disabled");

  evt.currentTarget.classList.add("active");

}
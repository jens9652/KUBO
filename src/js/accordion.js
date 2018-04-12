function Accordion (accordion) {
}

Accordion.prototype.toggleItem = function(element) {
  var itemClass = element.parentNode.className;
  var accordion = document.getElementById('accordion');
  var accordionItems = accordion.getElementsByClassName('accordion-item');

  for (var i = 0; i < accordionItems.length; i++) {
    accordionItems[i].className = 'accordion-item close';
  }
  if (itemClass == 'accordion-item close') {
    element.parentNode.className = 'accordion-item open';
  }
}

var item = document.getElementById('accordion');

if (item) {
  var accordion = new Accordion(item);
}
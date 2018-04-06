function Accordion (accordion) {

  this.accordion = accordion;
  this.accordionItems = accordion.getElementsByClassName('accordion-item');
  this.accordionHeadings = accordion.getElementsByClassName('accordion-heading');

  for (var i = 0; i < this.accordionHeadings.length; i++) {
    var self = this;
    this.accordionHeadings[i].addEventListener('click', this.toggleItem, false);
  }

}

Accordion.prototype.toggleItem = function() {
  var itemClass = this.parentNode.className;
  var accordion = self.accordion.accordion
  var accordionItems = self.accordion.accordionItems;

  for (var i = 0; i < accordionItems.length; i++) {
    accordionItems[i].className = 'accordion-item close';
  }
  if (itemClass == 'accordion-item close') {
    this.parentNode.className = 'accordion-item open';
  }
}

var item = document.getElementById('accordion');

if (item) {
  var accordion = new Accordion(item);
}
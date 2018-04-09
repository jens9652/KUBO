
	function tabChangeContent(target) {
		var tabContent = document.getElementsByClassName("tab-content");	
for (var i = 0; i < tabContent.length; i++) {
	tabContent[i].classList.add("disabled");
	tabContent[i].classList.remove("active");
}
 var targetContent = document.getElementById(target);
 targetContent.classList.add("active");
 targetContent.classList.remove("disabled");
	}
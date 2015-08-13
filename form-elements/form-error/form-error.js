$(document).ready(function(){
	$("#e1").attr("aria-hidden","true");
	$("#e1").addClass("hidden");
 $("#go").click(function(){
	$("#test1").attr("aria-invalid","true");
	 $("#e1").attr("aria-hidden","false");
	 $("#e1").removeClass("hidden");
  });
   // repeat for the keyboard accessibility for all buttons, enter makes it click...
$("#go").keypress(function(ev) {
					if (ev.which ==13)  {
						 $(this).click();
						 }
				  });
   
});
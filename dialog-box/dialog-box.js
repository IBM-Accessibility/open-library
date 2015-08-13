// open the dialog 
$(document).ready(function(){
  $("input#login").click(function(){
		$("div#mydialog").attr("aria-hidden","false");
		$("div#mydialog").removeClass("hidden");
		$("div#main1").attr("tabindex","-1");
		$("#dialogheader").focus();
  });
   // repeat for the keyboard accessibility for all buttons, enter makes it click...
		 $("input[type='button']").keypress(function(ev) {
					if (ev.which ==13)  {
						 $(this).click();
						 }
				  });
				  
		$("div.whitebox").keydown(function(ev) {
					if (ev.which == 27)  {
					$("input#cancel").click();}
				  });
  
// close the dialog and put the focus back to were it was 
  		$("input#cancel").click(function(){
			$("div#mydialog").attr("aria-hidden","true");
			$("div#mydialog").addClass("hidden");
			$("div#main1").attr("tabindex","0");
			$("input#login").focus() ;
			ev.preventDefault();
		 });
  
				  // repeat for the ok button
				  $("input#ok").click(function(){
						 $("input#cancel").click();
				  });
				  
				   				  
					// repeat for the esc key
				  
  
 
 // trap the focus - basicly if you are on the first item in the dialog and press shift alt go to the last element in the dialog
  
   $("#dialogheader").keydown(function(ev){
	   if (ev.shiftKey && ev.which == 9)  {
					$("#ok").focus();
					ev.preventDefault(); 
					}
				  });
});

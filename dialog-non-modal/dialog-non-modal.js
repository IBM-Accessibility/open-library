// open the dialog 
$(document).ready(function(){
	 $("#bubble1").attr("aria-hidden","true");
	 
  $("a#bubble-associate1").click(function(){
		$("#bubble1").attr("aria-hidden","false");
		$("#bubble1").removeClass("hidden");

		$("#bubblehead").focus();
		ev.preventDefault(); 
  });
  
  $("a#bubble-associate1").keypress(function(ev) {
		if (ev.which==13) {
		$(this).click();
		}
	});
  
    $("a#closebtn1").click(function(){
		$("#bubble1").attr("aria-hidden","true");
		$("#bubble1").addClass("hidden");
		$("a#bubble-associate1").focus();
		 ev.preventDefault(); 
		
  });
   
	//on the dialog, esc and enter should colse it and return the focus, F6 should return the focus and not close it, and everything else keeps the foucs on our close button	
		$("#closebtn1,#bubblehead, #bubble1").keydown(function(ev){
		switch(ev.which)
		{			case 27:  
						 $("#bubble1").attr("aria-hidden","true");
						 $("#bubble1").addClass("hidden");
						 $("#bubble-associate1").focus();
						 ev.preventDefault(); 
						 return false;
						  break;
			
		 			case 117:
						 $("#bubble-associate1").focus();
						 ev.preventDefault();
						 return false; 
				 		break;
	
		}
  });
		 
$("#closebtn1,#bubblehead, #bubble1").keypress(function(ev){
		switch(ev.which)
		{			
					case 13:  
						 $("#bubble1").attr("aria-hidden","true");
						 $("#bubble1").addClass("hidden");
						 $("#bubble-associate1").focus();
						 ev.preventDefault(); 
						 return false;
						  break;	 			
						  
					default:
					
						$("a#closebtn1").focus();
						 ev.preventDefault();
						 return false;
						break;
		 				//	 			default:
					
	//					$("a#closebtn1").focus();
	//					 ev.preventDefault();
	//					 return false;
						
		}
  });
		 
});
  
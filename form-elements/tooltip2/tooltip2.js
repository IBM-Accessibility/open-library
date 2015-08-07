// open the dialog 
$(document).ready(function(){
	 $("#tip1").attr("aria-hidden","true");
	 $("#tip1").addClass("hidden");
	 
  $("input#UserName").focus(function(){
		$("#tip1").attr("aria-hidden","false");
		$("#tip1").removeClass("hidden");
		
  });
    $("input#UserName").mouseover(function(){
		$("#tip1").attr("aria-hidden","false");
		$("#tip1").removeClass("hidden");
  });
   // repeat for the keyboard accessibility for all buttons, enter makes it click...
		 $("input#UserName").blur(function(){
		$("#tip1").attr("aria-hidden","true");
		$("#tip1").addClass("hidden");
  });
  
    $("input#UserName").mouseleave(function(){
		$("#tip1").attr("aria-hidden","true");
		$("#tip1").addClass("hidden");
  });
		
		$("input#UserName").keydown(function(ev){
		if (ev.which ==27)  {
						 $("#tip1").attr("aria-hidden","true");
						 $("#tip1").addClass("hidden");
						 ev.preventDefault(); 
						 return false;
						 }
  });
		 
});
  
 
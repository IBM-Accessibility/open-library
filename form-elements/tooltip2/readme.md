<div class="main" id="main1"  aria-labelledby="h11">
<h1 id="h11">ARIA Tooltip Example</h1>
<div>
  <p>Tab to the text box, or put your mouse on it.</p>
  <p>
  <label for="topLoginUserName" class="humana-bold">
    Username 
  </label>
    <input autocomplete="off" class="input-text " id="UserName" name="UserName" type="text" value="" aria-describedby="tip1" />
    <span id="tip1" class="tooltip" role="tooltip" >Also known as User ID</span></p>
										
									</div>
                                    
                                    
                                    


<h2>Notes:</h2>
<ul>
  <li>The tooltip  never receives focus. Focus stays on the textbox. </li>
  <li>The tooltip widget can shown via keyboard focus or by the onmouse event. </li>
  <li>The tooltip widget can be hidden by removing focus from the text box or by moving the mouse off the textbox. </li>
  <li>The tooltip widget can be hidden by pressing the Escape key </li>
  <li>The tooltip is only hidden via JavaScript and CSS selectors. If JavaScript is not available the tooltip is shown.</li>
</ul>
<p>For more best practice patterns see  <a href="http://www.w3.org/WAI/PF/aria-practices/#tooltip">making a tooltip.</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Step by Step: How we made the tooltip (tutorial)</h2>
<p>In <a href="http://www.deque.com/learn-aria-step-1-understanding-roles-states-relationships-focus">the  discussion on ARIA</a>, we discussed 5 steps to making complex things  accessible with ARIA. <br />
</p>
<ol>
  <li> Alert users to  what each elements is: Their role (such as checkbox).</li>
  <li> Alert users to  their properties and important relationships (such as disabled, required,and  other labels).</li>
  <li> Alert users to  what each element is doing: The state (such as checked).</li>
  <li> Alert users to  changes in their state.</li>
  <li> Make sure widgets  are keyboard accessible and focus works predictably. Events can be triggered  though the keyboard, and it should be intuitive to the user. All controls  should receive focus via tabbing though the keyboard.</li>
</ol>
<h3>Step 1: Set roles. </h3>
<p><br />
  Our form uses HTML standard form controls so we do not need  form control roles as well. The only thing that needs a role is the tooltip.</p>
<p><code> &lt;span id=&quot;tip1&quot; class=&quot;tooltip&quot; role=&quot;tooltip&quot; &gt;Also known as User ID&lt;/span&gt;<br/>
</code></p>
<h3>Step 2: Set  properties and important relationships</h3>
<p>We want to make sure the structure, relationships between elements and groups, properties and labels are all clear in the code. The relationship between the tooltip and the form control is not clear from the DOM. We use aria-describedby to solve this type of problem.</p>
<p><code>&lt;input  class=&quot;input-text&quot; id=&quot;UserName&quot; name=&quot;UserName&quot; type=&quot;text&quot; value=&quot;&quot; <strong>aria-describedby=&quot;tip1&quot;</strong> /&gt;</code></p>
<p>Note that it is always worth looking at any <a href="http://accessibility.athena-ict.com/aria/aria-required.shtml">requirements</a> such as required states, and <a href="http://accessibility.athena-ict.com/aria/ARIA-quick-reference.shtml"> supported states</a> for your roles before deciding what properties and states you need. </p>
<h3>Step 3: Set the initial states</h3>
<p>A good rule of thumb is that elements that change how they look often have  states that can change at the same time. The tooltip changes from being  non-visible to visible. So we are going to use  aria-hidden  as our state.</p>
<p>We will use CSS selectors to show and hide the tooltip based on the aria-hidden value. Now we will not need to change their CSS class in the code, only the value of aria-hidden.</p>
<p>In the CSS:</p>
<p><code>span[aria-hidden=&quot;true&quot;] {display:none;}<br />
  span[aria-hidden=&quot;false&quot;] {display:block;}</code><br />
</p>
<p>We are only going to set the initial state when the page loads. This will make the content degrade gracefully, and the tooltip to be open if scripts are not working. We will do this by setting <code>aria-hidden='true'</code>in the document ready function. This way if scripts are working the tooltip will be hidden, but if scripts are not supported the user will still get the content.</p>
<p><code>$(document).ready(function(){<br />
$(&quot;#tip1&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);</code>....</p>
<p><strong>A word about backward compatibility....</strong></p>
<p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browser I added a class hidden:</p>
<p><code>.hidden {display:none;}</code></p>
<p>I then added &quot;hidden&quot; to the class attribute in the HTML to hide the hidden items in older browsers.</p>
<p><code>class = &quot;... hidden&quot;</code></p>
<p><strong>In the script,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
<p><code>$(&quot;%tip1&quot;).addClass(&quot;hidden&quot;);</code></p>
<p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
<p><code>$(&quot;#tip1&quot;).removeClass(&quot;hidden&quot;);</code><br />
</p>
<p>This makes the script much more robust in older browsers.</p>
<h4>Step 4: Set changes in state.</h4>
<p>We discussed above that we are using the aria state of aria-hidden  and we are using CSS selectors so that whenever <code>aria-hidden='true'</code> the tooltip will be hidden and when <code>aria-hidden='false'</code> the message will be visible. </p>
<p>In the code we have a  function to  change the values of aria-hidden when the tooltip should be visible.</p>
<p><code>$(&quot;input#UserName&quot;).mouseover(function(){<br />		$(&quot;#tip1&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);<br />
  }); </code>
</p>
<p>Similarly we will set <code>aria-hidden='true'</code> when the mouseleave() event is triggered.</p>
<p> For older browsers we also had <code>$(&quot;#tip1&quot;).addClass(&quot;hidden&quot;);</code> (see above) </p>
<h4>Step 4: Manage focus and keyboard accessibility.</h4>
<p>Managing the focus for the tooltip is easy. The tooltip  never receives focus. Focus stays on the textbox. The tooltip role is automatically read to the user and no response  is required, there is no need to set focus.</p>
<p>All the other controls are standard HTML controls and so the  focus  has been taken care of.<br />
</p>
<p>Next  let's deal with the keyboard accessibility. Firstly, we need to make sure the same functions are triggered by device independent events (such as focus() and blur() ) as for mouse events (such as mouseover(),  mouseleave() ). For example. </p>
<p><code>$(&quot;input#UserName&quot;).focus(function(){<br />
$(&quot;#tip1&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);<br />
});</code></p>
<p>For this design pattern, we also want the user to be able to close the tooltip using the esc key.</p>
<p><code>$(&quot;input#UserName&quot;).keydown(function(ev){<br />
if (ev.which ==27)  {<br />
$(&quot;#tip1&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);<br />
ev.preventDefault(); <br />
return false;<br />
}<br />
});</code></p>


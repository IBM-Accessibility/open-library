<p>The dialog follows the  best practice design patterns from <a href="http://www.w3.org/TR/wai-aria-practices/#modal_dialog">Making a Dialog Modal.</a> For example, The user can not tab out of the dialog. To close or leave the dialog, they need to press either the OK or the cancel button. </p>
<h2>Step by Step: How we made the dialog (tutorial)</h2>
<p>In <a href="http://www.deque.com/learn-aria-step-1-understanding-roles-states-relationships-focus">the  discussion on ARIA</a>, we discussed 5 steps to making complex things  accessible with ARIA. <br />
  Let's take a quick   look at them again.</p>
<ol>
  <li>  Alert users to  what each elements is: Their role (such as checkbox).</li>
  <li>  Alert users to  their properties and important relationships (such as disabled, required,and  other labels).</li>
  <li>  Alert users to  what each element is doing: The state (such as checked).</li>
  <li>  Alert users to  changes in their state.</li>
  <li>  Make sure widgets  are keyboard accessible and focus works predictably. Events can be triggered  though the keyboard, and it should be intuitive to the user. All controls  should receive focus via tabbing though the keyboard.</li>
</ol>
<h3>Step 1: Set roles. </h3>
<p>Our buttons are HTML standard form controls so we do not need  form control roles as well. The Div that contained the dialog content however needs a role dialog as the tag &quot;Div&quot; does not  describe how it behaves.</p>
<h3>Step 2: Set  properties and important relationships</h3>
<p>We want to make sure the structure, relationships between elements and groups, properties and labels are all clear in the code. They can be clear from the standard HTML code, or  using ARIA.</p>
<p> Firstly note the<strong> structure. </strong>The dialog contents are all rapped inside the dialog role so that they belong together is implied in the code or DOM. So the the groups are clear. </p>
<p>What about<strong> properties an</strong><strong>d labels</strong>?</p>
<p>The role dialog really describes the behavior quite well so there is little to add. The only property we need to set is to set the dialog header as it's label using aria-labelledby. </p>
<p><code>&lt;div id=&quot;mydialog&quot; aria-hidden=&quot;true&quot; role=&quot;dialog&quot; class=&quot;dialogclass&quot; aria-labelledby=&quot;dialogheader&quot;&gt;<br />
  &lt;div class=&quot;whitebox&quot;&gt;<br />
  &lt;h1 id=&quot;dialogheader&quot; tabindex=&quot;0&quot; &gt;login&lt;/h1&gt;</code></p>
<p>Note that it is always worth looking at any <a href="http://accessibility.athena-ict.com/aria/aria-required.shtml">requirments</a> such as required states, and <a href="http://accessibility.athena-ict.com/aria/ARIA-quick-reference.shtml"> supported states</a> for your roles before deciding what properties and states you need. </p>
<h3>Step 3: Set the initial states</h3>
<p>A good rule of thumb is elements that change how they look often have  states that can change. The dialog changes in that it goes from being visible to invisible. So we are going to use  aria-hidden=&quot;true&quot; on the dialog initially and change it's value when it is shown.</p>
<p>We also use CSS selectors, to show and hide the dialog based on the aria-hidden value. Now I do not need to change their CSS class in the code, only the value of aria-hidden.</p>
<p><code>div[aria-hidden='true'] {<br />
display: none;<br />
}</code></p>
<p><strong>A word about backward compatibility....</strong></p>
<p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browser I added a class hidden:</p>
<p><code>.hidden {display:none;}</code></p>
<p>I then added &quot;hidden&quot; to the class attribute in the HTML to hide the hidden items in older browsers.</p>
<p><code>class = &quot;... hidden&quot;</code></p>
<p>&nbsp;</p>
<h4>Step 4: Set changes in state.</h4>
<p>We discussed above that the dialog uses the aria state of aria-hidden, and we are using CSS selectors so that whenever <code>aria-hidden='true'</code> the dialog will be hidden and when <code>aria-hidden='false'</code> the dialog will be visible. </p>
<p>In the code we have a  function to open the dialog by changing the values of aria-hidden. </p>
<p><code>$(&quot;div#mydialog&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);</code></p>
<p><strong>For older browsers,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
<p><code>$(&quot;....&quot;).addClass(&quot;hidden&quot;);</code></p>
<p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
<p><code>$(&quot;...&quot;).removeClass(&quot;hidden&quot;);</code><br />
</p>
<p>This makes the script much more robust in older browsers.</p>
<h4>Step 4: Manage focus and keyboard accessibility.</h4>
<p>Both the focus and keyboard accessibility needs to be managed. We also need to make the dialog <em>modal </em>- so that users stay in the dialog until they actively close it.</p>
<p>Firstly  lets deal with the keyboard accessibility and make sure our jQuery selectors are device independent. In the code we have used mouse events such as &quot;click()&quot; to trigger the button function  such as : <code>&quot;$(&quot;input#login&quot;).click(function()&quot;</code> </p>
<p>We need to add device independent events as well for people who can not use a mouse. </p>
<p>The following function gives keyboard accessibility for all the buttons, so that pressing enter when a button has focus (key-code 13) is the same as clicking the button with a mouse. <br />
  <code>$(&quot;input[type='button']&quot;).keydown(function(ev) {<br />
if (ev.which ==13)  {<br />
$(this).click()<br />
}<br />
});</code></p>
<p>Next we need to think about focus. For this design pattern a few things have to happen. Firstly the dialog should get focus when it is opened. Also, as the dialog is modal we want the rest of the page content (inside div main1) to be removed from the tabbing order. We do that by setting the tabindex of the main content  to -1. Altogether the code to open the dialog looks like this: </p>
<p> <code>$(&quot;input#login&quot;).click(function(){<br />
$(&quot;div#mydialog&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);<br />
$(&quot;div#main1&quot;).attr(&quot;tabindex&quot;,&quot;-1&quot;);<br />
$(&quot;#dialogheader&quot;).focus();<br />
});</code></p>
<p>We also want to trap the focus so that when the dialog is open the user will not be able to just tab out of the dialog into the main content. They need to close the dialog in order to leave it. For example, when the user is on the  the first item in the dialog,  pressing shift-alt will take them to the last element in the dialog. <br />
  <br />
  <code>$(&quot;#dialogheader&quot;).keydown(function(ev){<br />
if (ev.shiftKey &amp;&amp; ev.which == 9)  {<br />
$(&quot;#ok&quot;).focus();<br />
ev.preventDefault(); <br />
}<br />
});</code><br />
</p>
<p>Another aspect of this design pattern is that the user can also close the dialog by pressing the esc key.<br />
</p>
<p>  <code>  if (ev.which == 27)  {<br />
  $(&quot;input#cancel&quot;).click();}<br />
</code></p>
<p>Finally we need to manage the focus when the user closes the dialog. This involves, hiding the dialog, removing it from the tabbing order (tabindex = -1) putting the main content back in the tabbing order (tabindex = 0) and returning the focus to where it was before we opened the dialog.</p>
<p> <code>$(&quot;input#cancel&quot;).click(function(){<br />
$(&quot;div#mydialog&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);<br />
$(&quot;div#main1&quot;).attr(&quot;tabindex&quot;,&quot;0&quot;);<br />
$(&quot;input#login&quot;).focus() ;<br />
ev.preventDefault();<br />
 }); </code></p>
 
</div>


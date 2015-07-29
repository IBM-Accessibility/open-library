<h2>Notes:  </h2>
<p>Although the code is short and simple, it is fully accessible. This example uses: </p>
<ol>
  <li>aria-selected to show what tab is selected</li>
  <li>aria-controls to show the relationship between tabs and tab panels</li>
  <li>aria-hidden, to hide the unselected tab panel</li>
  <li>When an tab is selected the following states are toggled: aria-selected in both tab elements and aria-hidden on both tab panels.</li>
  <li> CSS selectors are used to bind aria-hidden and CSS display:none.</li>
  <li>CSS selectors are used to bind aria-selected and the classes for selected or non selected tab panels.</li>
  <li>Keyboard accessibility is given by  adding the enter key to the basic click event in the jQuery code.</li>
  <li>The tabs can also toggle using the left and right arrow keys (as a jQuery function)</li>
  <li>Note that often only the active tab is in the tabbing order. However, in this example both tabs are always in the tabbing order. I felt this pattern worked better for this context.</li>
</ol>
<p>&nbsp;</p>
<h2>Step by Step: How we made the tab panel (tutorial)</h2>
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
<p>Lots to do here. We have two tabs, and tabs need to be in a containing tab list. You can think of them as list items in a list. </p>
<p><code>&lt;ul class=&quot;tablist&quot; <strong>role=&quot;tablist&quot;</strong>&gt;<br/>
  &lt;li id=&quot;tab1&quot; class=&quot;tab&quot; <strong>role=&quot;tab&quot;</strong> ...&gt;Prices&lt;/li&gt;<br/>
&lt;li id=&quot;tab2&quot; class=&quot;tab&quot; <strong>role=&quot;tab&quot;</strong> </code><code> ...&gt;Features &lt;/li&gt;<br/>&lt;/ul&gt;</code></p>
<p>We also have tab panels</p>
<pre id="line1">&lt;div id="panel1" class="panel"  <strong>role="tabpanel" ....</strong> &gt;
<span id="line18"></span><span id="line19"></span>&lt;h3 ....&gt;Prices&lt;/h3&gt; 
List of prices<span id="line24"></span>&lt;/div&gt;  <span id="line25"></span></pre>
<p>Note that the panel content uses headers, as per good accessible authoring practice. Any content in the panels needs to be accessible. </p>
<h3>Step 2: Set  properties and important relationships</h3>
<p>We want to make sure the structure, relationships between elements and groups, properties and labels are all clear in the code. They can be clear from the standard HTML code, or  using ARIA.</p>
<p> Firstly note the<strong> structure. </strong>The tabs are all rapped inside the tablist role so that they belong together is implied in the code or DOM. So that group is clear.</p>
<p>However the relationship between the tabs and the panel is not clear from the code, so we need to use aria. </p>
<p>With tab panels, the tabs really label the panels (they are a bit like headers) and the tabs control the panels. In other words clicking on the tabs controls what panel is visible. So now we have:</p>
<pre id="line2"> <span id="line7"> </span>  <span id="line8"> </span> 
&lt;ul class="tablist" role="tablist"&gt;  <span id="line9"> </span>  <span id="line10"> </span>   
&lt;li id="tab1" class="tab" <strong>aria-controls="panel1"</strong> role="tab" ...&gt;Prices&lt;/li&gt;  <span id="line11"> </span>  <span id="line12"> </span>   
&lt;li id="tab2" class="tab" <strong>aria-controls="panel2"</strong> role="tab" ..&gt;Features &lt;/li&gt;  <span id="line13"> </span>  <span id="line14"> </span>   
&lt;/ul&gt;  <span id="line15"> </span>  <span id="line16"> 
</span>  <span id="line17"> 
</span>&lt;div id="panel1" class="panel" <strong>aria-labelledby="tab1"</strong> role="tabpanel" ..&gt;  <span id="line3"> </span>  <span id="line4"> </span> 
&lt;h3 ..&gt;Prices&lt;/h3&gt;  <span id="line20"> </span>  <span id="line21"> </span>  <span id="line22"> </span>  <span id="line23"> </span>       
 List of prices     <span id="line5"> 
</span>&lt;/div&gt; 
 <span id="line6"> </span>  <span id="line26"> </span>
&lt;div id="panel2" class="panel" <strong>aria-labelledby="tab2"</strong> role="tabpanel" ..&gt;  <span id="line27"> </span>  <span id="line28"> </span>  
&lt;h3 ..&gt;Features&lt;/h3&gt;  <span id="line29"> </span>  <span id="line30"> 
</span>List of product features....  <span id="line31"> </span>  <span id="line32"> </span>  <span id="line33"> </span> 
&lt;/div&gt;  <span id="line34"> </span>  <span id="line35"> </span>
 </pre>
<p>Note that it is always worth looking at any <a href="http://accessibility.athena-ict.com/aria/aria-required.shtml">requirements</a> such as required states, and <a href="http://accessibility.athena-ict.com/aria/ARIA-quick-reference.shtml"> supported states</a> for your roles before deciding what properties and states you need. </p>
<h3>Step 3: Set the initial states</h3>
<p>A good rule of thumb is elements that change how they look often have  states that can change. The tab change in that they go from looking selected to looking not selected. The panels change from being  visible to non-visible. So we are going to use  aria-hidden and aria-selected as our states.</p>
<p>We also use CSS selectors, to change the look of the tabs and show and hide the panels based on the aria-hidden value. Now I do not need to change their CSS class in the code, only the value of aria-hidden or aria-selected.</p>
<p>In the CSS:</p>
<p><code>li[aria-selected='true'] {<br>
color: black;<br>
background-color: #fff;<br>
border-bottom: 1px solid white;<br>
}</code></p>
<p><code>div[aria-hidden='true'] {<br>
  display: none;<br>
  }</code><br>
</p>
<p>and the updated HTML:</p>
<p><code>&lt;ul class="tablist" role="tablist"&gt; <br/> 
  &lt;li id="tab1" class="tab" aria-controls="panel1" aria-selected="true" role="tab"..&gt;<br/>Prices&lt;/li&gt; <br/> 
  &lt;li id="tab2" class="tab" aria-controls="panel2" role="tab" aria-selected="false" ..&gt;<br/>Features &lt;/li&gt; <br/> &lt;/ul&gt; </code></p>
<p><code><br/>
  &lt;div id="panel1" class="panel" aria-labelledby="tab1" role="tabpanel" aria-hidden="false"&gt; <br/> 
  &lt;h3 ..&gt;Prices&lt;/h3&gt; <br/> List of prices <br/>
  &lt;/div&gt; <br/> 
</code></p>
<p><code>&lt;div id="panel2" class="panel" aria-labelledby="tab2" role="tabpanel" aria-hidden="true"&gt; <br/> 
&lt;h3 ..&gt;Features&lt;/h3&gt; <br/>List of product features.... <br/> &lt;/div&gt;</code></p>
<p>&nbsp;</p>
<p><strong>A word about backward compatibility....</strong></p>
<p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browser I added a class hidden:</p>
<p><code>.hidden {display:none;}</code></p>
<p>I then added &quot;hidden&quot; to the class attribute in the HTML to hide the hidden items in older browsers.</p>
<p><code>class = &quot;... hidden&quot;</code></p>
<p>&nbsp;</p>
<h4>Step 4: Set changes in state.</h4>
<p>We discussed above that we are using the aria states of aria-hidden and aria-selected, and we are using CSS selectors so that whenever <code>aria-hidden='true'</code> the panels will be hidden and when <code>aria-hidden='false'</code> the panels will be visible. The look of the tabs will likewise change based on the value of aria-selected.</p>
<p>In the code we have a  function to  change the values of aria-hidden and aria-selected whenever a tab is clicked. </p>
<pre id="line36">$("li[role='tab']").click(function(){  <br/>	$("li[role='tab']").attr("aria-selected","false"); //deselect all the tabs <br/> 	$(this).attr("aria-selected","true");  // select this tab<br/>	var tabpanid= $(this).attr("aria-controls"); //find out what tab panel this tab controls  <br/>   var tabpan = $("#"+tabpanid);  <br/>	$("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels <br/>	tabpan.attr("aria-hidden","false");  // show our panel<br/> });</pre>
<p><strong>For older browsers,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
<p><code>$(&quot;....&quot;).addClass(&quot;hidden&quot;);</code></p>
<p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
<p><code>$(&quot;...&quot;).removeClass(&quot;hidden&quot;);</code></p> 
Or, I set the class name to panel (and delete any other classes)</p>
<p><code>&quot;...&quot;.className = &quot;panel&quot;;</code></p>
<p>This makes the script much more robust in older browsers.</p>
<h4>Step 4: Manage focus and keyboard accessibility.</h4>
<p>Both the focus and keyboard accessibility needs to be managed. Firstly lets make sure the tabs and visible tab panel can be tabbed to from the keyboard. As our tabs are line items, they would not normally receive focus or be in the tab order. To change this we add tabindex = 0 to any element that should be able to receive focus. Now the completed HTML looks like: </p>
<p><code>&lt;ul class="tablist" role="tablist"&gt; <br/>
&lt;li id="tab1" class="tab" aria-controls="panel1" aria-selected="true" role="tab" tabindex="0"&gt;<br/>
Prices&lt;/li&gt; <br/>
&lt;li id="tab2" class="tab" aria-controls="panel2" role="tab" aria-selected="false" tabindex="0"&gt;<br/>
Features &lt;/li&gt; <br/>
&lt;/ul&gt; </code></p>
<p><code><br/>
  &lt;div id="panel1" class="panel" aria-labelledby="tab1" role="tabpanel" aria-hidden="false"&gt; <br/>
  &lt;h3 tabindex="0"&gt;Prices&lt;/h3&gt; <br/>
  List of prices <br/>
  &lt;/div&gt; <br/>
</code></p>
<p><code>&lt;div id="panel2" class="panel" aria-labelledby="tab2" role="tabpanel" aria-hidden="true"&gt; <br/>
  &lt;h3 tabindex="0"&gt;Features&lt;/h3&gt; <br/>
  List of product features.... <br/>
  &lt;/div&gt;</code></p>
<p><code><br />
</code>Next  let's deal with the keyboard accessibility and make sure our jQuery selectors are device independent. In the code we  used the mouse event  &quot;click()&quot; to trigger the button function: <code>$("li[role='tab']").click(function()</code></p>
<p>We need to add events as well for people who can not use a mouse. </p>
<p>The following function gives keyboard  accessibility for our tabs, so that pressing enter when a tab has focus (key-code 13) is the same as clicking the tab with a mouse. </p>
<p><br />
  <code>$(&quot;li[role='tab']&quot;).keydown(function(ev) {<br />
    if (ev.which ==13)  {<br />
    $(this).click()<br />
    }<br />
  });</code></p>
<p>For this design pattern we want the right and left arrow keys inside the  tab list to switch the tabs, moving the focus and toggling the selection.  Altogether the code for this keyboard functionality looks like this: </p>
<p><code>//This adds keyboard function that pressing an arrow left or arrow right from the tabs toggle the tabs.   <br />
  $("li[role='tab']").keydown(function(ev) {  <br />if ((ev.which ==39)||(ev.which ==37))  {  <br />	
  &nbsp;var selected= $(this).attr("aria-selected");  <br />
  &nbsp;if  (selected =="true"){  <br />
  &nbsp;&nbsp; $("li[aria-selected='false']").attr("aria-selected","true").focus() ;  <br />
  &nbsp;&nbsp; $(this).attr("aria-selected","false");  <br /> 
  &nbsp;&nbsp; var tabpanid= $("li[aria-selected='true']").attr("aria-controls");  <br /> 
  &nbsp;&nbsp; var tabpan = $("#"+tabpanid);  <br /> 
  &nbsp;&nbsp; $("div[role='tabpanel']").attr("aria-hidden","true");  <br /> 
&nbsp;&nbsp; tabpan.attr("aria-hidden","false");</code><br/>&nbsp;&nbsp; }<br/>
}<br/>
<code>});</code></p>
<p>Author: Lisa Seeman </p>
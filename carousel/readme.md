Submitted by Lisa Seeman.
<h2>Notes</h2>
The carousel is completely accessible. 
<ul>
  <li>Each image needs to have  valid alt text</li>
  <li>This example uses aria-hidden on the carousel items that are not shown</li>
  <li>The carousel rapper has aria-live=&quot;polite&quot;</li>
  <li>Buttons are keyboard accessible, and use aria-label to clarify the symbols.</li>
</ul>
<h2>Step by Step: How we made the carousel accessible</h2>
<p>In  <a href="http://www.deque.com/learn-aria-step-1-understanding-roles-states-relationships-focus">the  discussion on ARIA</a>, we discussed 5 steps to making complex things  accessible with ARIA. <br />
Lets take a quick  look at them again.</p>
<ul>
  <li> 1.Â  Alert users to  what each elements is: Their role (such as checkbox).</li>
  <li> 2.Â  Alert users to  their properties and important relationships (such as disabled, required,and  other labels).</li>
  <li> 3.Â  Alert users to  what each element is doing: The state (such as checked).</li>
  <li> 4.Â  Alert users to  changes in their state.</li>
  <li> 5.Â  Make sure widgets  are keyboard accessible and focus works predictably. Events can be triggered  though the keyboard, and it should be intuitive to the user. All controls  should receive focus via tabbing though the keyboard.</li>
</ul>
<h3>Step 1: Set roles. </h3>
<p>Our buttons are HTML standard form controls so we do not need  form control roles as well. The carousel items are list items, which is  accurate. However the carousel container is a live region, so although we do not set its role we will set aria-live property when we get there.</p>
<h3>Step 2: Set  properties and important relationships</h3>
<p>We want to make sure the structure, relationships between elements and groups, properties and labels are all clear in the code. They can be clear from the standard HTML code, or  using ARIA.</p>
<p> Firstly note the<strong> structure.</strong></p>
<ul>
  <li>The carousel items are list items in the same list, so the fact that they belong together is implied in the code or DOM</li>
  <li>The buttons are   inside a fieldset - so that shows that they are a groups</li>
</ul>
<p>So the the groups are clear. </p>
<p>Now lets look at the <strong>relationships between groups.</strong></p>
<ul>
  <li>The buttons control the carousel That is not clear without ARIA. So we add <strong>aria-controls=&quot;carousel&quot;.</strong></li></ul>
  <p>What about<strong> properties?</strong></p>
  <p>The content of the carousel changes so we will use  aria-live=&quot;polite&quot;. This means that the user will be read the new content at the next convenient point. However the user will not be interrupted in the middle of a task. </p>
  <p>Quick reminder.... </p>
  <ul>
    <li>aria-live=&quot;off&quot;: This is the default value that indicates that a region is not live, and changes will not be announced. </li>
    <li>aria-live=&quot;polite&quot;: The update should be announced at the next graceful interval, such as when the user stops typing. </li>
    <li>aria-live=&quot;assertive&quot;:  The update is announced to the user immediately. As this is obtrusive, a value of assertive should only be used when the update is urgent such as a session time out</li>
  </ul>
  <p><strong> and labels</strong>?</p>
  <p>Looking at the buttons' fieldset   - it is clear visually that they are buttons for the carousel, but they do not have a legend. So I used aria-label=&quot;carousel buttons&quot; to give them a label for screen readers.</p>
  <p>The buttons for next, previous and pause used symbols that made sense visually but do not make sense when read - so they also needed a labels. </p>
  <p>Altogether the code for the buttons looked like this:</p>
  <p> <code>&lt;fieldset <strong>aria-label=&quot;carousel buttons&quot; </strong>class=&quot;carousel-buttons&quot; aria-controls=&quot;carousel&quot;&gt;<br />
&lt;button value=&quot;pause&quot; id=&quot;pause&quot; <strong>aria-label=&quot;pause&quot;</strong> class=&quot;carousel-button&quot;&gt;||&lt;/button&gt;    &lt;button value=&quot;go&quot; id=&quot;go&quot; class=&quot;carousel-button&quot;&gt;play&lt;/button&gt;<br />
&lt;button value=&quot;prev&quot; <strong>aria-label=&quot;previous&quot;</strong> id=&quot;prev&quot; class=&quot;carousel-button&quot;&gt;&lt;&lt;&lt;/button&gt;<br />
&lt;button value=&quot;next&quot; id=&quot;next&quot; <strong>aria-label=&quot;next&quot;</strong> class=&quot;carousel-button&quot;&gt;&gt;&gt;&lt;/button&gt;<br />
&lt;/fieldset&gt;</code></p>
  <h3>Step 3: Set the initial states</h3>
  <p>A good rule of thumb is elements that change how they look often have  states that can change.</p>
  <p>The carousel items change how they look. They go from being visible to invisible. So we are going to use aria-hidden=&quot;false&quot; on the carousel items that is shown and aria-hidden=&quot;true&quot; on the carousel items that are hidden.</p>
<p>For example </p>
  <p><code>&lt;li <strong>aria-hidden=&quot;true&quot;</strong> class=&quot;carousel-item&quot;  id=&quot;item-3&quot; &gt; <br />
  &lt;img src=&quot;three.jpg&quot; alt=&quot;3&quot; class=&quot;carousel-image&quot; /&gt;<br />
  &lt;h2 class=&quot;carousel-heading&quot;&gt;Item 3 &lt;span class=&quot;block&quot;&gt;for your carousel&lt;/span&gt;&lt;/h2&gt;<br />
  &lt;div&gt;&lt;p&gt;Your carousel can show pictures and text that help you brand your website ad company.&lt;/p&gt;&lt;/div&gt; <br />
  &lt;/li&gt; </code></p>
  <p>Note that this item has a header and an image in it. As per  accessibility best practice the heading is marked as a heading and the image has good alt text.</p>
  <p>We also use CSS selectors, to show and hide the carousel items based on the aria-hidden value. Now I do not need to change their CSS class in the code, only the value of aria-hidden.</p>
  <p><code>li[aria-hidden='true'] {
    display: none;
    }<br />
li[aria-hidden='false'] {
display:block ;
}</code></p>
  <p><strong>A word about backward compatibility....</strong></p>
  <p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browser I added a class hidden:</p>
  <p><code>.hidden {display:none;}</code></p>
  <p>I then added &quot;hidden&quot; to the class attribute in the HTML to hide the hidden items in older browsers.</p>
  <p><code>class = &quot;... hidden&quot;</code></p>
  <p><br />
  </p>
  <h3>Step 4: Set changes in state.</h3>
  <p>We discussed above that the carousel items use the aria state of aria-hidden, and we are using CSS selectors so that when ever <code>aria-hidden='true'</code> the item will be hidden and when <code>aria-hidden='false'</code> the item will be visible. </p>
  <p>In the code we have a  function to switch slides - IE it will hide the old carousel item and show the new carousel item (variable slide) by changing the values of aria-hidden. </p>
  <p><code>$(&quot;li.carousel-item&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);<br />
  ....<br />
  $(&quot;li.carousel-item:eq(&quot;+slide+&quot;)&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);</code></p>
  <p><strong>For backward compatibility,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
  <p><code>$(&quot;....&quot;).addClass(&quot;hidden&quot;);</code></p>
  <p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
  <p><code>$(&quot;...&quot;).removeClass(&quot;hidden&quot;);</code><br />
  </p>
  <p>This makes the script much more robust in older browsers.</p>
<h4>Step 4: Manage focus and keyboard accessibility.</h4>
<p>This is relatively easy in this example. There are no widgets that need the focus managed as standard HTML controls have been used for all the buttons, and any content that is hidden is removed from the DOM.</p>
<p>However we do need to make sure our jQuery selectors are device independent. In the code we have used mouse events such as &quot;click()&quot; to trigger the button function  such as : <code>&quot;$(&quot;button#next&quot;).click(function()&quot;</code>. We need to add device independent events as well for people who can not use a mouse.</p>
<p>We use a single function so that the keypress event will trigger the click event on all the buttons. Here it is:</p>
<p><code>$(&quot;button&quot;).keypress(function(ev) {<br />
if (ev.which ==13)  {<br />
$(this).click();<br />
ev.preventDefault(); <br />
 }<br />
});</code></p>
<p>That will work on all button elements. If you have other tags that are clickable using jQuery you will need to add their selector to the function. </p>
<p>Note the use of <strong>preventDefault()</strong> after  setting the Â focus. This will prevent an extra  shift-tab from occurring. PreventDefault() ensures that the default action  is not executed. You can use a jQuery return false, but that will also ensures  that a stopPropagation() is executed - prohibiting parent elements from  receiving these events as well. </p>
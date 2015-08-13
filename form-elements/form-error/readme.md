<p>&nbsp;</p>
<p><em>Notes: This form is a test for ARIA properties. We want the error text to be read as soon as the form is submitted with empty text and we want the instructions below to be read with the label of the search form. The form itself does nothing. </em></p>
<div id="divinstruction">
  <p>This search is for the mysite.com (not the web)</p>

  </div>
  </div>
<h2>Notes:</h2>
Although the code is short and simple, it is fully accessible. This example uses:
<ol>
  <li>aria-describedby to make all instructions and relevant information read with the form field.</li>
  <li> aria-required is also used on the  form field</li>
  <li>The error message uses the alert role that makes sure the focus is properly managed </li>
  <li>When an error is found the following  states are toggled: aria-invalid in the form element and aria-hidden on the error message. </li>
  <li>CSS selectors are used to bind aria-hidden and CSS display:none.</li>
  </ol>
  <p>&nbsp;</p>
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
  <p><br>
Our form uses HTML standard form controls so we do not need  form control roles as well. But does anything else need a role? <br>
Look at the error message in the screen shots above. It is  tagged as a header, but is that really all it is? 
Headers typically belong in a table of content. A header is  an element that provides structure, summarizing what a section of content is. Â </p>
  <p>  Our error message does not really do that. In fact, its role  is very different. It alerts the user to a problem with content above. That is  a big part of our accessibility problem: our header does not act like a header.  It changes based on the user interaction, it toggles between visible and invisible.  Functionally, it acts more like an alert box then a header so we are going to use ARIA role alert to let the assistive technology (the user system) know what it should expect from  it. </p>
  <p>Rule of thumb - Elements that change how they look based on  user interaction often need a role. Check the element tag name to check that any changes are expected that element. If they are not expected, you probably need a role.  </p>
  <p><code>&lt;div id=&quot;e1&quot;  role = &quot;alert&quot;...&gt; You need to enter a search term before pressing submit&lt;/div&gt;<br/>
  </code></p>
  <h3>Step 2: Set  properties and important relationships</h3>
  <p>We want to make sure the structure, relationships between elements and groups, properties and labels are all clear in the code. They can be clear from the structure of the HTML code (or DOM), or  using ARIA.</p>
  <p>Our form has instructions and context information below the form that   a screen reader user would not get to before they submit the form. This   is a classic accessibility problem with forms. The relationship between the instructions and the form control is not clear from the DOM. We use aria-describedby to solve this type of problem.</p>
  <p>Another really useful aria state for forms is <code>aria-required</code>. Aria-required indicates if a form field is required. Putting them together we have</p>
  <code>&lt;input <strong>aria-describedby= &quot;divinstruction&quot;</strong>  <strong>aria-required=&quot;true&quot;</strong> type=&quot;text&quot; name=&quot;text1&quot; id =&quot;text1&quot;/&gt;</p>
  <p>&lt;div <strong>id=&quot;divinstruction&quot;</strong>&gt;<br>
  &lt;p&gt;This search is for the mysite.com (not the web)&lt;/p&gt;<br>
  &lt;/div&gt;</code>
  <p>Note that it is always worth looking at any <a href="http://accessibility.athena-ict.com/aria/aria-required.shtml">requirements</a> such as required states, and <a href="http://accessibility.athena-ict.com/aria/ARIA-quick-reference.shtml"> supported states</a> for your roles before deciding what properties and states you need. </p>
  <h3>Step 3: Set the initial states</h3>
  <p>A good rule of thumb is elements that change how they look often have  states that can change. The error message change from being  non-visible to visible. So we are going to use  aria-hidden  as our states.</p>
  <p>We also use CSS selectors, to change the look of the tabs and show and hide the panels based on the aria-hidden value. Now I do not need to change their CSS class in the code, only the value of aria-hidden or aria-selected.</p>
  <p>In the CSS:</p>
  <p><code>div[aria-hidden=&quot;true&quot;] {display:none;}<br>
  div[aria-hidden=&quot;false&quot;] {display:block;}</code><br>
  </p>
  <p>and the updated HTML:</p>
  <p><code>&lt;div id=&quot;e1&quot; aria-hidden=&quot;false&quot; role = &quot;alert&quot;&gt; You need to enter a search term before pressing submit&lt;/div&gt;</code></p>
  <p>We set <code>aria-hidden='false'</code>in the HTML, and set <code>aria-hidden='true'</code>in the document ready function so that it is hidden as soon as the document load. This way the alert roles works better with older screen readers then setting setting <code>aria-hidden='true'</code> in the initial HTML.. </p>
  <h4>Step 4: Set changes in state.</h4>
  <p>We discussed above that we are using the aria states of aria-hidden and aria-selected, and we are using CSS selectors so that whenever <code>aria-hidden='true'</code> the panels will be hidden and when <code>aria-hidden='false'</code> the message will be visible. </p>
  <p>In the code we have a  function to  change the values of aria-hidden when the code is validated. We can also set aria-invalid=&quot;true&quot; so that screen reader users will know where the problem is. </p>
  <pre id="line36">$(&quot;#test1&quot;).attr(&quot;aria-invalid&quot;,&quot;true&quot;);<br>$(&quot;#e1&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);</pre>
  <p><strong>A word about backward compatibility....</strong></p>
  <p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browser I added a class hidden:</p>
<p><code>.hidden {display:none;}</code></p>
  <p><strong>In the script,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
  <p><code>$(&quot;#e1&quot;).addClass(&quot;hidden&quot;);</code></p>
  <p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
<p><code>$(&quot;#e1&quot;).removeClass(&quot;hidden&quot;);</code><br />
  </p>
  <p>This makes the script much more robust in older browsers.</p>
  <p><strong>Also</strong>, not all older browsers treat the alert role as having aria-live=assertive as implied. Therefor I also used aria-live=&quot;assertive&quot; for our alert. This makes the alert role more robust. <strong>However in some browsers it can make the alert be read twice</strong> (stutter). For very important messages, I felt it was worth having it read twice and working in more browsers.</p>
  <p><code>&lt;div id=&quot;e1&quot; aria-live=&quot;assertive&quot; role=&quot;alert&quot; aria-hidden=&quot;false&quot;  &gt; You need to enter a search term before pressing submit<br/>&lt;/div&gt;</code></p>
<h4>Step 4: Manage focus and keyboard accessibility.</h4>
<p>Initially the alert box is hidden and out of the tabbing  order; however, as the alert role is automatically read to the user and no response  is required, there is no need to set focus.</p>
  <p>All the other controls are standard HTML controls and so the  focus  has been taken care of.<br>
  </p>
  <p>Next  let's deal with the keyboard accessibility. We made sure to use device independent events that can be triggered by the keyboard.</p>
  <p>Firstly  lets deal with the keyboard accessibility and make sure our jQuery selectors are device independent. In the code we have used mouse events such as &quot;click()&quot; to trigger the button function  such as : </p>
  <p><code>$(&quot;#go&quot;).click(function()</code>{</p>
  <p>We need to add events as well for people who can not use a mouse. </p>
  <p>The following function gives keyboard accessibility , so that pressing enter the button has focus (key-code 13) is the same as clicking the button with a mouse. </p>
  <p><br />
    <code>$(&quot;#go&quot;).keydown(function(ev) {<br />
      if (ev.which ==13)  {<br />
      $(this).click()<br />
      }<br />
      });</code></p>
  <p>Thats it. Enjoy.</p>
  <p>&nbsp;</p>
  <p>Author: Lisa Seeman</p>



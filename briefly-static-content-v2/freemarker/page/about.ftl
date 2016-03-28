<#import "../template/page.ftl" as pt/>
<#import "../template/heading.ftl" as h/>

<@pt.page title="About">

<@h.heading/>

<#if userAccount??>
<div class="alert alert-info" role="alert">
  <span class="glyphicon glyphicon-check" aria-hidden="true"></span>
  <span class="sr-only">Info:</span>Already logged in as ${userAccount.username}.
</div>
</#if>

<!-- Sign in userId=${userId?c}. Generated at ${currentTime?c}. -->

<p>Demo User Service Application written in Java by using Spring MVC, Freemarker, Jetty, brikar and user-service.</p>
<hr/>
<p>&copy; Alexander Shabanov, 2015</p>

</@pt.page>
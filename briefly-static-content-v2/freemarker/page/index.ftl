<#import "../template/page.ftl" as pt/>
<#import "../template/catalog.ftl" as cat/>

<@pt.page title="Index">

<div class="jumbotron">
  <h1>Hello, world!!!</h1>
  <p>Lorem ipsum dolorem sic amet...</p>
  <p>And another line!</p>
  <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
</div>

<hr/>
<@cat.list catalogElementList=catalogElements/>

</@pt.page>
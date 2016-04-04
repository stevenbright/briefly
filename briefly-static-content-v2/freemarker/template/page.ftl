<#macro page title>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <meta name="Author" content="Alex" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>Briefly v2 &raquo; ${title}</title>

    <link rel="stylesheet" type="text/css" href="/assets/libs/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/assets/libs/bootstrap/css/bootstrap-theme.css" />
    <link rel="stylesheet" type="text/css" href="/assets/css/global.css" />
  </head>
  <body>

  <#-- Navigation -->
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
      <#-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#g-app-navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/g/index"><span class="glyphicon glyphicon-book" aria-hidden="true"></span>&nbsp;Briefly</a>
      </div>
      <div class="collapse navbar-collapse" id="g-app-navbar-collapse">
        <ul class="nav navbar-nav">
          <li><a href="/g/articles">Articles</a></li>
          <li class="nav-divider"></li>
          <li><a href="/g/about">About</a></li>
          <li class="nav-divider"></li>
          <li><a href="/g/logout">Logout</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <#if userAccount??>
              <a href="#" class="navbar-nav pull-right">${userAccount.username}</a>
            <#else>
              <a href="/g/login" class="navbar-nav pull-right">Login</a>
            </#if>
          </li>
        </ul>
      </div> <#-- /.navbar-collapse -->
    </div> <#-- /.container -->
  </nav>

  <div id="main-content" class="container">
    <#nested/>
  </div>

  <div id="footer">
  </div>

  <#-- Bundle Page Script -->
  <script type="text/javascript" src="/assets/js/bundle.js"></script>
</body>
</html>

</#macro>

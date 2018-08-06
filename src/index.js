(function() {
  function log (msg, cls) {
    $('<li class="' + (cls || 'info') + '">' + msg + '</li>').appendTo('#log')
  }
  function errorCallback(err) {
    log(err.message || err.responseText || err.statusText || err, 'error');
  }

  var dataFairConfig = window.DATA_FAIR_CONFIG;
  if (!dataFairConfig) {
    log('Failed to read DATA_FAIR_CONFIG. You probably did not access this application through a data-fair configuration.', 'error');
    return;
  }
  log('Read DATA_FAIR_CONFIG: ' + JSON.stringify(dataFairConfig));

  // Current active user can be found in id_token cookie.. It contains the 2 first parts (header + payload) of a JWT token
  var jwt = Cookies.get('id_token')
  var user;
  if (jwt) {
    user = atob(jwt.split('.')[1]);
    log('Current active user: ' + user);
  } else {
    log('No active user session was found');
  }

  if (user) {
    // Logout is a POST ajax action
    $('<button>logout</button>')
      .on('click', function() {
        $.ajax({method: 'POST', url: dataFairConfig.dataFairUrl + '/api/v1/session/logout'})
          .then(function() {
            window.location.reload()
          }, errorCallback);
      })
      .appendTo('#actions');
  } else {
    // Login is simply a link
    var redirect = encodeURIComponent(window.location.href + '?id_token=')
    $('<a href="' + dataFairConfig.dataFairUrl + '/api/v1/session/login?redirect=' + redirect + '">login</a>')
      .appendTo('#actions');
  }


  // The application definition in data-fair contains various metadata and the permissions of the current user
  $.ajax({url: dataFairConfig.dataFairUrl + '/api/v1/applications/' + dataFairConfig.applicationId, json: true})
    .then(function(application) {
      log('Fetched application definition: ' + JSON.stringify(application))
      if (application.userPermissions.indexOf('writeConfig') !== -1) {
        log('The user has the permission to write the config of the application. We can show the config link.', 'success');
        // The "/config" URL is a convention that must be respected for proper integration in data-fair.
        $('<a href="' + dataFairConfig.exposedUrl + '/config">edit configuration</a>').appendTo('#actions')
      } else {
        log('The user does not have the permission to write the config of the application. We cannot show the config link.', 'error')
      }
    }, errorCallback);
})();

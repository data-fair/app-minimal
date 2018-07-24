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

  // The application definition in data-fair contains various metadata and the permissions of the current user
  var configUrl = dataFairConfig.dataFairUrl + '/api/v1/applications/' + dataFairConfig.applicationId + '/configuration';
  $.ajax({url: configUrl, json: true})
    .then(function(configuration) {
      log('Fetched application configuration: ' + JSON.stringify(configuration))
      // datasets and remoteServices and stnadard part of application.configuration (whose structure is otherwise free)
      // it is important to use them properly so that linking works well in data-fair
      configuration.datasets = configuration.datasets || []
      configuration.remoteServices = configuration.remoteServices || []
      $('#config').val(JSON.stringify(configuration, null, 2))

      // Save the config with a PUT ajax query
      $('#saveConfig')
        .prop('disabled', false)
        .on('click', function() {
          $.ajax({
            method: 'PUT',
            url: configUrl,
            processData: false,
            contentType: 'application/json',
            data: $('#config').val()
          }).then(function() {
            window.location.reload();
          }, errorCallback);
        });
    }, errorCallback);

  // We can use other parts of data-fair API, like listing datasets to help filling the configuration
  $.ajax({url: dataFairConfig.dataFairUrl + '/api/v1/datasets?size=200&select=title,href', json: true})
    .then(function(res) {
      log('Fetched ' + res.results.length + ' dataset(s)');
      var datasets = res.results;
      var select = $('#selectDataset');
      for(var i = 0; i < datasets.length; i++) {
        select.append($('<option value="' + datasets[i].href + '">' + datasets[i].title + '(' + datasets[i].owner.name + ')</option>'));
      }
      select.on('change', function(value) {
        var configuration = JSON.parse($('#config').val())
        configuration.datasets = [{href: value, key: 'main'}]
        $('#config').val(JSON.stringify(configuration, null, 2))
      })
    })
})();

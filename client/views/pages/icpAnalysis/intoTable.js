Template.InfoTable.onCreated(function() {
  var self = this
  self.autorun(function() {
    self.subscribe('baxx_geo_stat', {
      context: self.data.context,
      region: 0
    })
  })
})


Template.InfoTable.onRendered(function() {
  var ctx = this.data.context
  function textInfo(domId, option, data) {
    var table = $('<table class="table table-hover table-striped no-margins"></table>')
    table.append($('<thead><tr><th>#</th><th>' + option.ta + '</th><th>' + option.tb + '</th></tr></thead>'))
    var tbody = $('<tbody></tbody>')
    for (var i = 0; i < data.length; ++i) {
      var d = data[i];
      var tr = $('<tr></tr>')
      tr.append($('<th>' + (i + 1) + '</th>'))
      tr.append($('<td>' + d.name + '</td>'))
      tr.append($('<td>' + d.value + '</td>'))
      tbody.append(tr)
    }
    table.append(tbody)
    $('#' + domId).empty().append(table)
  }
  console.log('asdf');
  this.autorun(function() {
    var r = BaxxGeoStat.find({context: ctx, region: 0}).fetch()
    console.log(r);
    textInfo('infotable-' + ctx, {ta: '省市', tb: '数量'}, r)
  })
})


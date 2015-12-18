Template.configBox.onRendered(function() {
  var pd = Template.parentData(1)
  var id = pd.context + pd.attr
  $('.start-' + id).datepicker({
    format: 'yyyy-mm-dd'
  })
  $('.end-' + id).datepicker({
    format: 'yyyy-mm-dd'
  })
})

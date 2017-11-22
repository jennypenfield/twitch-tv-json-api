/* global $ */

$(document).ready(function () {
  // Fetch FCC status/info
  const TWITCH_URL = 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?'
  $.getJSON(TWITCH_URL).done(displayFccStatus).fail(function (e) {
    $('#fccStatus').html('Technical difficulties. Please try again later.')
  })

  function displayFccStatus (data) {
    if (data.stream === null) {
      $('#fccStatus').html('Free Code Camp is currently <u>offline</u>')
    } else {
      $('#fccStatus').html('Free Code Camp is currently online')
    }
  }
})

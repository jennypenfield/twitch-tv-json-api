/* global $ */

$(document).ready(function () {
  // Fetch FCC status/info
  const TWITCH_URL = 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?'
  $.getJSON(TWITCH_URL).done(displayFccStatus).fail(function (e) {
    $('#fccStatus').html('Technical difficulties determining Free Code Camp status.' +
    'Please try again later.')
  })

  function displayFccStatus (apiData) {
    if (apiData.stream === null) {
      $('#fccStatus').html('Free Code Camp is currently OFFLINE')
    } else {
      $('#fccStatus').html('Free Code Camp is currently ONLINE')
    }
  }

  // Fetch FCC followers logo, name, and status from API
  const FCC_FOLLOWERS_URL = 'https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels/?callback=?'
  $.getJSON(FCC_FOLLOWERS_URL).done(pushFollowers).fail(function (e) {
    $('#displayResults').html('Technical difficulties. Please try again later')
  })

  // Push the followers logos, names, and statuses into the "channels" array
  function pushFollowers (apiData) {
    let channels = []
    for (let i = 0; i < apiData.follows.length; i++) {
      let logo = apiData.follows[i].channel.logo
      let displayName = apiData.follows[i].channel.display_name
      let status = apiData.follows[i].channel.status
      channels.push(logo, displayName, status)
    }
    displayFollowers(channels)
  }

  // Loop through array with logo, name, and status, every third index
  function displayFollowers (channels) {
    for (let i = 0; i <= channels.length - 3; i += 3) {
      $('#followerList').append(
        '<div class="row">' +
          '<div class="col-md-4 logos text-center"><img src="' + channels[i] +
          '" width="125" height="125" style="padding:10px" alt="logo" /img></div>' +
          '<div class="col-md-4 text-center">' + channels[i + 1] + '</div>' +
          '<div class="col-md-4 text-center">' + channels[i + 2] + '</div>' +
        '</div'
      )
    }
  }
})

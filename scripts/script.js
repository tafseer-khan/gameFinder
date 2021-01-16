function getGame(genre) {

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://rawg-video-games-database.p.rapidapi.com/games?genres=" + genre + "&page=" + (Math.floor(Math.random() * MAX_PAGE_NUM) + 1),
    "method": "GET",
    "headers": {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    $('#choose-your-genre').hide();

    let game = response.results[Math.floor(Math.random() * MAX_GAME_NUM)];
    
    if (game.name != null) {
      $('#game-title').show();
      $('#game-title').text(game.name);
    }
    else
      $('#game-title').hide();
    

    if (game.esrb_rating != null) {
      $('#esrb-rating').show();
      $('#esrb-rating-data').text(game.esrb_rating.name);
    }
    else 
      $('#esrb-rating').hide();
      

    if (game.platforms != null && game.platforms.length != 0) {
      let platformsStr = '', i = 1;

      for (let x of game.platforms) {
        platformsStr += x.platform.name;
        // If not at last index
        if (i != game.platforms.length)
          platformsStr += ', '

        i++;
      }
      $('#platforms-available').show();
      $('#platforms-available-data').text(platformsStr);
    }
    else 
      $('#platforms-available').hide();


    if (game.metacritic != null) {
      $('#metacritic-score').show();
      $('#metacritic-score-data').text(game.metacritic);
    }
    else 
      $('#metacritic-score').hide();
      
    
    if (game.released != null) {
      $('#released-date').show();
      $('#released-date-data').text(game.released);
    }
    else
      $('#released-date').hide();


    if (game.background_image != null) {
      $('#game-image').show();
      $('#game-image').attr('src', game.background_image);
    }
    else 
      $('#game-image').hide();
      
    
    if (game.short_screenshots != null && game.short_screenshots.length >= 3) {
      $('.secondary-game-image').show();

      for (let i = 0, j = 0; i <= (3 - 1); i++, j++) {
        if (game.short_screenshots[j + 1].image.localeCompare(game.background_image) == 0)
          j++;

        $('.secondary-game-image').eq(i).attr('src', game.short_screenshots[j + 1].image);
      }
    }
    else 
      $('.secondary-game-image').hide();

    if (game.background_image != null) {
      $('#game-image').show();
      $('#game-image').attr('src', game.background_image);
    }
    else 
      $('#game-image').hide();

    $('#game-display').show();


    // Only showing this temporarily because we don't have access to the YouTube API
    let iFrame = document.getElementById('embedded-video').contentWindow.document.open();
    iFrame.write('Sorry, we can\'t seem to find a video right now!');
    iFrame.close();

    getPlaylist(genre);
    // getVideo(game.name);
  });
      
}

function getVideo(game) {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: YT_API_KEY,
      q: game + " Gameplay",
      part: 'snippet',
      maxResults: 1,
      type: 'video',
      videoEmbeddable: true
    },
    success: function(response) {
      $('#embedded-video').attr('src', 'https://www.youtube.com/embed/' + response.items[0].id.videoId);
    },
    error: function(response) {
      console.log("Request failed");
      let iFrame = document.getElementById('embedded-video').contentWindow.document.open();
      iFrame.write('Sorry, we can\'t seem to find a video right now!');
      iFrame.close();
    }
  });
}

function getPlaylist(genre) {
  let link;
  // example
  link = 'https://soundcloud.com/therealwooyaa/sets/gaming';

  switch (genre) {
    case 'action':

      break;
    case 'adventure':

      break;
    case 'role-playing-games-rpg':

      break;
    case 'strategy':

      break;
    case 'shooter':

      break;
    case 'simulation':
      
      break;
    case 'platformer':

      break;
    case 'racing':

      break;
    case 'massively-multiplayer':

      break;
    case 'fighting':

      break;
    default:
      console.log('genre error');
      break;
  }

  let widget = SC.Widget(document.getElementById('soundcloud-playlist'));
  widget.load(link, { auto_play: true });
}

$(document).ready(function() {

  $(document).foundation();

  $('.genre').on('click', function() {
    let genre = ($(this).text()).toLowerCase().split(' ').join('-');

    // Change rpg to RAWG API specific search criteria
    if (genre.localeCompare('rpg') == 0)
      genre = 'role-playing-games-rpg';

    getGame(genre);
  });
});
$(document).ready(function() {

  $(document).foundation();

  var genre;
  $('.genre').on('click',function(){

    var G = Math.floor(Math.random() * 20);
    var P = Math.floor(Math.random() * 100);

    genre = ($(this).text()).toLowerCase().split(' ').join('-');

    if (genre.localeCompare('rpg') == 0)
      genre = 'role-playing-games-rpg';
      
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rawg-video-games-database.p.rapidapi.com/games?genres=" + genre + "&page=" + P,
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "16f6042a71mshd7819557aed7c23p19670cjsn3b86dc1f29bc",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
      }
    }; $.ajax(settings).done(function (response) {
    console.log(response);
    var randomGame = response.results[G];
    console.log(randomGame);
    var gameName = randomGame.name;
    console.log(gameName);
      getVideo(gameName);
    });

  });

});

function getVideo(gameName) {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
        key: 'AIzaSyDSyXZxaXvDhXHkf6U7g9jstwgGKO51rrc',
        q: gameName + " Gameplay",
        part: 'snippet',
        maxResults: 1,
        type: 'video',
        videoEmbeddable: true,
    },
    success: function(data){
        embedVideo(data)
    },
    error: function(response){
        console.log("Request Failed");
    }
  });
}

function embedVideo(data) {
$('#embedded-video').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
// $('h3').text(data.items[0].snippet.title)
// $('.description').text(data.items[0].snippet.description)
}


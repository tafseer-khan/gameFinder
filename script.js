$(document).ready(function() {

  $(document).foundation();

  var genre;
  $('.genre').on('click',function(){

    var G = Math.floor(Math.random() * 20);
    var P = Math.floor(Math.random() * 100);
    let gameName = "";
    

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
    }; 
    $.ajax(settings).done(function (response) {
    console.log(response);
    var randomGame = response.results[G];
    console.log(randomGame);
    gameName = randomGame.name;
    console.log(gameName);
    var score = randomGame.metacritic;
    console.log(score);
    var aPlatforms = ""
    for(i = 0; i < randomGame.platforms.length; i++){
      aPlatforms = randomGame.platforms[i].platform.name +", "+ aPlatforms
    }
    console.log(aPlatforms)
    if(randomGame.esrb_rating != null){
      var esrb = randomGame.esrb_rating.name}
    if(randomGame.esrb_rating === null){
      var esrb = 'Not Defined'
    }
    console.log(esrb)
    var game_image = randomGame.background_image
    console.log(game_image)
    $('#game-information').empty().append('<h2 id="game_title">TITLE</h2>')
    $('#game_title').text(gameName)
    $('#game-information').append('<img id ="game_image"></img>')
    $('#game_image').attr('src',game_image)
    if(esrb != 'Not Defined'){
      $('#game-information').append('<p id="esrb_rating">')
      $('#esrb_rating').text("ESRB: "+esrb)
    }
    $('#game-information').append('<p id="platforms_available">')
    $('#platforms_available').text("Platforms Available: "+aPlatforms)
    $('#game-information').append('<p id="metacritic_score">')
    if(score != null){
      $('#metacritic_score').text('Metacritic Score: '+score)
    }
      getVideo(gameName)
      });
    



  });

});

function getVideo(gameName) {
  // return new Promise(resolve,reject){
    return $.ajax({
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
        // resolve(data)
    },
    error: function(response){
        console.log("Request Failed");
        // reject(response)
    }
  });
  

}
// }
 

function embedVideo(data) {
$('#embedded-video').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);}
// $('h3').text(data.items[0].snippet.title)
// $('.description').text(data.items[0].snippet.description)


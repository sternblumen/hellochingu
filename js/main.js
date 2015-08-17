if(annyang){
annyang.setLanguage('ko');
var cardRandom;
var symbols = ['아','어','오'];

$('.symbol').hide();

annyang.addCommands({
  '아': function() {
  },
  '어': function() {
  },
  '오': function() {
  }
});

annyang.addCallback('resultMatch', function (userSaid) {
	if ($('.symbol.'+ userSaid).is(':visible')){
		$('#message').fadeOut().text('¡Bien!').fadeIn();
		$('#userSaid').text(userSaid);
		console.log(userSaid);
	}else{
		$('#message').fadeOut().text('Estás muy cerca ' +userSaid+ ' ¡Intenta de nuevo!').fadeIn();
		console.log(userSaid);
		$('#userSaid').text(userSaid);
	}
});

annyang.addCallback('resultNoMatch', function (results) {
  $('#message').fadeOut().text('No estás hablando coreano :)').fadeIn();
  console.log(results);
});


cardRandom = Math.floor((Math.random() * symbols.length));
$('.symbol.'+ symbols[cardRandom]).show();

$('#next').click(function() {
  $('.symbol').hide();
  $('#message').fadeOut().text('');
  $('#userSaid').text('');
  cardRandom = Math.floor((Math.random() * symbols.length));
  $('.symbol.'+ symbols[cardRandom]).show();

});

annyang.start();
}


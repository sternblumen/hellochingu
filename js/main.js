if (annyang) {
	annyang.setLanguage('ko');

	// annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
	//   console.log('-------- resultMatch --------');
	//   console.log(userSaid);
	//   console.log(commandText);
	//   console.log(phrases);
	// });

	annyang.addCallback('resultNoMatch', function (results) {
		console.log('-------- resultNoMatch --------');
		console.log(results);
		annyang.pause();
		swal({
				title: "Ups!",
				text: "Aún no estás hablando coreano",
				type: "error",
				showCancelButton: true,
				cancelButtonText: "Intentar de nuevo",
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Ir al siguente",
				closeOnConfirm: true
			},
			function(){
				var nextSymbol = Math.floor((Math.random() * 145) + 1);
				// redirigir al usuario a un nuevo symbol, palabra o letra.
				window.location = "/#/symbol/"+nextSymbol;
			});
	});


	annyang.start();
}


var app = angular.module('hellochingu', ['ngRoute']);


app.service('Symbols', function() {
	return [
		'아','어','이','오','우','으',
		'야','여','요','유',
		'애','에',
		'얘','예',
		'와','워','위','의',
		'왜','외','웨',

		'ㄱ','ㄲ','ㅋ',
		'ㄷ','ㄸ','ㅌ',
		'ㅅ','ㅆ',
		'ㅈ','ㅉ','ㅊ',
		'ㅂ','ㅃ','ㅍ',
		'ㅁ','ㄴ','ㅇ','ㄹ','ㅎ',

		'가','거','기','고','구','그','갸','겨','교','규','개','게','걔','꼐','과','괘','괴','궈','궤','귀','긔',

		'나','너','니','노','누','느','냐','녀','뇨','뉴','내','네','냬','녜','놔','놰','뇌','눠','눼','뉘','늬',

		'다','더','디','도','두','드','댜','뎌','됴','듀','대','데','댸','뎨','돠','돼','되','둬','뒈','뒤','듸',

		'라','러','리','로','루','르','랴','려','료','류','래','레','럐','례','롸','뢔','뢰','뤄','뤠','뤼','릐',

		'마','머','미','모','무','므','먀','며','묘','뮤','매','메','먜','몌','뫄','뫠','뫼','뭐','뭬','뮈','믜',



	];
});



app.config(function($routeProvider){

	$routeProvider.when('/',{
		controller:'HomeController as home',
		templateUrl:'templates/home.html'
	});

	$routeProvider.when('/symbol/:symbolId',{
		controller:'SymbolController as single',
		templateUrl:'templates/symbols.html'
	});

	$routeProvider.otherwise({
		redirectTo:'/'
	});

});



app.controller('HomeController',function ($location){
	annyang.pause();
	this.message = 'estas mal';
	this.mostrar = true;

	this.showRandomSymbol = function() {
		//generar un numero random
		$location.path('/symbol/1');
	};

});


app.controller('SymbolController',function($routeParams, $location, Symbols){
	console.log(Symbols.length);

	this.showRandomSymbol = function() {
		annyang.pause();
		var nextSymbol = Math.floor((Math.random() * Symbols.length) + 1);
		$location.path('/symbol/'+ nextSymbol);
	};

	this.showSuccessMessage = function() {
		console.log('-------- resultMatch --------');
		annyang.pause();
		// si entro aqui, significa que dijo bien la palabra o letra.
		// mostrar mensaje de exito.
		swal({
			title: "Fighting!",
			text: "",
			type: "success",
			confirmButtonText: "Siguiente",
			closeOnConfirm: true
		}, function(){

			var nextSymbol = Math.floor((Math.random() * Symbols.length) + 1);
			// redirigir al usuario a un nuevo symbol, palabra o letra.
			window.location = "/#/symbol/"+nextSymbol;

		});
	};

	this.symbol = Symbols[$routeParams.symbolId-1];
	var command = {};
	command[this.symbol] = this.showSuccessMessage;
	annyang.addCommands(command);
	annyang.resume();
});





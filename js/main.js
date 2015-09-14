window.section = "";

if (annyang) {
	annyang.setLanguage('ko');

	annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
	  console.log('-------- resultMatch --------');
	  console.log(userSaid);
	  console.log(commandText);
	  console.log(phrases);
	});

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
				//tiene que tomar el lenght del service donde está actualmente
				var nextSymbol = Math.floor((Math.random() * window.length) + 1);
				// redirigir al usuario a un nuevo symbol, palabra o letra.
				window.location = "/#/"+window.section+"/"+nextSymbol;

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

app.service('Vocabulary', function() {
	return [
		'이','오','아가','아이','오이',
		'가구','구두','거리','고기',

		'가','거','나라','나이','누나',
		'다리','도러',
		'라디오','오리','우리','기러기',

		'나무','머리','머자','어머니','다리미',
		'바나나','바지','바다','비누','아버지',
		'사자','시소','서류','버스','가수',
		'지구','지도','주스','주소','여자',
		'하나','하마','허리','휴지','호두',

		'새','해','무지개','노래',
		'게','세수','네모','베개',
		'얘기','세계시','차례',
		'사놔','화가','과자','도와요',
		'돼지','왜',
		'뇌','교회','교외',
		'더워요','주워요',
		'웨이트','스웨터',
		'가위','귀','쥐',
		'의사','의자','회의',

		'차','치마','고추','티셔츠',
		'코','커피','카메라','스키',
		'토마토','아파트','타다','기타',
		'포도','우픞','피자','스파게티',
		'토끼','콕기리','까마귀','꼬리',
		'메뚜기','따다','뜨다','뛰다',
		'뿌리','오빠','아빠','예쁘다',
		'싸다','아가씨','아저씨','쓰다',
		'찌개','짜다','찌다',

		'책','수박','식사','태극기','악수',
		'부엌','밖','깎다','복다',
		'눈','산','전화','변지','언니',
		'닫다','숟가락','옷','젓가락','있다',
		'낮','꽂','끝','밭','까맣다',
		'달','말','별','울다','얼굴',
		'몸','삼','밤','곰','감',
		'밥','입','컵','수업','직업',
		'잎','숲','무릎','앞','옆',
		'강','병','공','비행기','빵'


	];
});

app.service('LectureA', function() {
	return [
		'별','생각하기보다','기도하기로','한다',
		'기도하기보다','미소짓기로','한다',
		'미소짓기보다','손을','잡아주기로','한다'
	];
});

app.service('LectureB', function() {
	return [
		'사랑해','사랑했지만',
		'내가','부족했어나','봐',
		'혹시','우연','이라도',
		'한','순간','만이라도','널',
		'볼','수','있을까?'

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

	$routeProvider.when('/vocabulary/:symbolId',{
		controller:'VocabularyController as vocabulary',
		templateUrl:'templates/vocabulary.html'
	});

	$routeProvider.when('/lectura-a/:symbolId',{
		controller:'LectureAController as lecturaa',
		templateUrl:'templates/lectura-a.html'
	});

	$routeProvider.when('/lectura-b/:symbolId',{
		controller:'LectureBController as lecturab',
		templateUrl:'templates/lectura-b.html'
	});

	$routeProvider.when('/pronombres',{
		controller:'Pronombres as pronombres',
		templateUrl:'templates/pronombres.html'
	});

	$routeProvider.otherwise({
		redirectTo:'/'
	});

});



app.controller('HomeController',function ($location){

	this.alphabet = function() {
		$location.path('/symbol/1');
	};

	this.vocabulary = function() {
		$location.path('/vocabulary/1');
	};

	this.lecturaa = function() {
		$location.path('/lectura-a/1');
	};

	this.lecturab = function() {
		$location.path('/lectura-b/1');
	};

	this.pronombres = function() {
		$location.path('/pronombres');
	};


});


app.controller('SymbolController',function($routeParams, $location, Symbols){

	window.section="symbol";
	window.length= Symbols.length;

	this.showRandomSymbol = function() {
		var nextSymbol = Math.floor((Math.random() * Symbols.length) + 1);
		$location.path('/symbol/'+ nextSymbol);
	};

	this.showSuccessMessage = function() {
		console.log('-------- resultMatch --------');
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

});



app.controller('VocabularyController',function($routeParams, $location, Vocabulary){

	window.section="vocabulary";
	window.length= Vocabulary.length;

	this.showRandomSymbol = function() {
		annyang.pause();
		var nextSymbol = Math.floor((Math.random() * Vocabulary.length) + 1);
		$location.path('/vocabulary/'+ nextSymbol);
	};

	this.showSuccessMessage = function() {
		console.log('-------- resultMatch --------');


		// si entro aqui, significa que dijo bien la palabra o letra.
		// mostrar mensaje de exito.
		swal({
			title: "Fighting!",
			text: "",
			type: "success",
			confirmButtonText: "Siguiente",
			closeOnConfirm: true
		}, function(){

			var nextSymbol = Math.floor((Math.random() * Vocabulary.length) + 1);
			// redirigir al usuario a un nuevo symbol, palabra o letra.
			window.location = "/#/vocabulary/"+nextSymbol;

		});
	};

	this.symbol = Vocabulary[$routeParams.symbolId-1];
	var command = {};
	command[this.symbol] = this.showSuccessMessage;
	annyang.addCommands(command);


});


app.controller('LectureAController',function($routeParams, $location, LectureA){

	window.section="lectura-a";
	window.length= LectureA.length;

	this.showRandomSymbol = function() {
		var nextSymbol = Math.floor((Math.random() * LectureA.length) + 1);
		$location.path('/lectura-a/'+ nextSymbol);
	};

	this.showSuccessMessage = function() {
		console.log('-------- resultMatch --------');
		// si entro aqui, significa que dijo bien la palabra o letra.
		// mostrar mensaje de exito.
		swal({
			title: "Fighting!",
			text: "",
			type: "success",
			confirmButtonText: "Siguiente",
			closeOnConfirm: true
		}, function(){

			var nextSymbol = Math.floor((Math.random() * LectureA.length) + 1);
			// redirigir al usuario a un nuevo symbol, palabra o letra.
			window.location = "/#/lectura-a/"+nextSymbol;

		});
	};

	this.symbol = LectureA[$routeParams.symbolId-1];
	var command = {};
	command[this.symbol] = this.showSuccessMessage;
	annyang.addCommands(command);


});


app.controller('LectureBController',function($routeParams, $location, LectureB){

	window.length= LectureB.length;
	window.section="lectura-b";


	this.showRandomSymbol = function() {
		var nextSymbol = Math.floor((Math.random() * LectureB.length) + 1);
		$location.path('/lectura-b/'+ nextSymbol);
	};

	this.showSuccessMessage = function() {
		console.log('-------- resultMatch --------');
		// si entro aqui, significa que dijo bien la palabra o letra.
		// mostrar mensaje de exito.
		swal({
			title: "Fighting!",
			text: "",
			type: "success",
			confirmButtonText: "Siguiente",
			closeOnConfirm: true
		}, function(){

			var nextSymbol = Math.floor((Math.random() * LectureB.length) + 1);

			// redirigir al usuario a un nuevo symbol, palabra o letra.
			window.location = "/#/lectura-b/"+nextSymbol;

		});
	};

	this.symbol = LectureB[$routeParams.symbolId-1];
	var command = {};
	command[this.symbol] = this.showSuccessMessage;
	annyang.addCommands(command);


});




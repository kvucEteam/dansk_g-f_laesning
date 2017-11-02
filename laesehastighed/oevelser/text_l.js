//abc :

//555:

$(window).load(function() {

//microhint($('#speed'), "Hej hej") 



	var
	start_fart;
	var fart;
	var str = 100;
	var myTimer;
	var running = false;
	var text_read = 0;
	var top;
	var runde_sec = 0;

	var big_Timer;

	// Lav et Array med alle kapitlerne og Skraml det rundt.
	var kapitel_Array = new Array();

	$(".kapitel").each(function(index) {
		//kapitel_Array.push($this)
		var kapitel = ($(this).html());
		kapitel_Array.push(kapitel);
	});
	function Shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	Shuffle(kapitel_Array);
	////alert (kapitel_Array.length);

	// jQuery to dump out new values to element with ID of 'dump'
	$(function() {
		$("#tekst").empty();
		for(var i = 0; i < kapitel_Array.length; i++) {
			$("#tekst").append(kapitel_Array[i]);
		}
	});
	//

	//EDITER antal runder + multiplikator:

	//alert($("#tekst").attr("value"));
	if($("#tekst").attr("value") == "abc") {
		//alert("abc, MAIIN");
		var timer_Array = new Array([180, 1, "Almindelig læsning"], [480, 1.5, "Hurtiglæsning"], [240, 3, "Spurtlæsning"]);
	} else if($("#tekst").attr("value") == "555") {
		var timer_Array = new Array([300, 1, "Almindelig læsning"], [300, 1.5, "Hurtiglæsning"], [300, 3, "Spurtlæsning"]);
		//alert("555, MAIIN");
	}

	var runde = 0;

	var text_total_length = parseInt(($("#tekst").css("height")));

	//////alert(text_total_length);

	$("#opatekst").html($("#tekst").html());

	function check_speed() {
		//alert("RS:" + runde_sec);
		$(".feed").html("Aktuel læsehastighed: <b>" + timer_Array[runde][2] + "</b> (i <b>" + (runde_sec - 1) + "</b> sekunder endnu)");
		runde_sec--;
		if(runde_sec == 0) {
			change_speed();
		}

	}

	function change_speed() {
		//alert("fart:" + fart + "runde_sec" + runde_sec);

		if(runde < 2) {
			runde++;
		} else {
			runde = 0;
		}
		runde_sec = timer_Array[runde][0];
		fart = start_fart / timer_Array[runde][1];
		//$(".feed").text("Aktuel læsehastighed:" + timer_Array[runde][2]);

	}

	function animer_maske() {
		//alert (fart);
		var m = $('#mask');
		var position = m.position();
		var total = position.left + m.width();
		top = position.top;
		console.log("leftpos:" + position.left);
		////alert (top);
		m.animate({
			
			left : '+=10',
		}, fart, 'linear', function() {
			
			if(total < 580) {
				if(running == true) {
					animer_maske();
				}
			} else {
				setTimeout(function() {
					flytned();
				}, 200);
			}
		});
		$('#tekst').animate({
			left : '-=10',
		}, fart, 'linear', function() {
		});
	}

	function flytned() {//////alert("flyt");
		if(top < 363) {
			$('#mask').animate({
				top : '+=19',
				left : '0px'
			}, fart * 3, function() {
				setTimeout(function() {
					if(running == true) {
						animer_maske();
					}
				}, fart * 6);
			});

			$("#opatekst").animate({
				//top : '-=19'
			}, {
				duration : fart * 3,
				queue : false

			});
			//////alert ($("#opatekst").css("top"));
			$('#tekst').animate({
				top : '-=19',
				left : '0px'
			}, fart * 3, function() {

			});
		} else {
			skift_linje();
		}
	}

	function skift_linje() {

		$('#mask').animate({
			top : '0px',
			left : '0px'
		}, fart * 3, function() {
			setTimeout(function() {
				if(running == true) {
					animer_maske();
				}
			}, fart * 6);
		});

		$("#opatekst").animate({
			top : '-=399px'
		}, {
			duration : fart * 3,
			queue : false

		});
		//////alert ($("#opatekst").css("top"));
		$('#tekst').animate({
			top : '-=19px',
			left : '0px'
		}, fart * 3, function() {

		});
		text_read = text_read + 399;
		////alert((text_read) + "," + text_total_length);
	}

	var check_timer = setInterval(function() {
		//$(".feed").text("os" + top);
		/*if(text_read + top > text_total_length) {
		 var r = confirm("Læsningen er slut, click OK for at træne igen.");
		 if(r == true) {
		 window.location.reload();
		 } else {
		 ////alert("Farvel og tak!");
		 clearInterval(check_timer);
		 running = false;
		 $("body").toggle();
		 }

		 }*/
	}, 100);
	/*$("#p_button").click(function() {
	 $(this).toggle();
	 clearInterval(big_Timer);
	 });*/
	$('#p_button').toggle();

	$("#s_button").click(function() {
		if(runde_sec == 0) {
			runde_sec = timer_Array[runde][0];
		}
		start_fart = parseInt($("#read_speed").val());
		if(start_fart > 0) {
			start_fart = 9960 / start_fart;
			fart = start_fart;
			//var l_hast = parseInt($("#read_speed").val());

			//alert(start_fart + "," + fart);
			big_Timer = setInterval(function() {
				check_speed();

			}, 1000);
			animer_maske();
			$(this).toggle();
			$('#p_button').toggle();
			running = true;
			//$("#speed").html("Læsning igang med læsehastighed: <b> " + l_hast + "</b>");
			$(".feed").html("Aktuel læsehastighed: <b>" + timer_Array[runde][2] + "</b> (i <b>" + (runde_sec - 1) + "</b> sekunder endnu)");

		} else {
			alert("Du skal skrive din normale læsehastighed i feltet!")

		}
	});

	$("#p_button").click(function() {
		clearInterval(big_Timer);
		//alert("fart:" + fart);
		running = false;
		$(this).toggle();
		$('#s_button').toggle();
	});
});

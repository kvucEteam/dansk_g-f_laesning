//abc :

//555:

$(window).load(function() {

	var seconds = 0;
	var running = false;

	$(".s_button").click(function() {
		$('.s_button').unbind('click');
		$('.s_button').text("Stop læsning");

		var big_Timer = setInterval(function() {
			seconds++;
		}, 1000);

		$(".s_button").click(function() {
			$('.s_button').unbind('click');
			$('.s_button').eq(1).toggle();
			$('.s_button').text("Prøv igen");
			//$('#tekst').slideToggle(1000);
			
			var l_hast = Math.round(915 / (seconds / 60));
			
			//alert (lhast); 
			
			$('#feed').html("<h4>Resultat</h4>Du læste teksten på " + seconds + " sekunder.<br/> Din læsehastighed er <b>" + l_hast + "</b><br/>Din læsehastighed skal du huske og anvende i læseøvelserne.")

			$(".s_button").click(function() {
				location.reload();
			});
		});
	});
});

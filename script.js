$(document).on('focus','input.input_content', function() {
	$(this).parent().addClass('is-in');
})

/*$(document).on('change','input.input_content', function() {
	str = $(this).val();
	if 
})*/

$(document).on('blur','input.input_content', function() {
	str = $(this).val(); 
	if (str.length<1){
		$(this).parent().removeClass('is-in');	
	} 
})
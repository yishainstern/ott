var update = {
	title: 'עדכן סיסמא',
	sub_title: 'הכנס את סיסמתך הישנה ואת הסהמא החדשה, אחר כך לחץ על כפתור ה"עדכן"',
	inputs: [{name: 'curent_password', label: 'סיסמא נוכחית (6 עד 8 תווים)'},{name: 'curent_password', label: 'סיסמא חדשה (6 עד 8 תווים)'}]
}

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
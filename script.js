var details = {
		//email: 'yishai@gmail.com',
		firstName : 'ישי'
}

var update = {
	title: 'עדכן סיסמא',
	form_name:'update_password_form',
	sub_title: 'הכנס את סיסמתך הישנה ואת הסהמא החדשה, אחר כך לחץ על כפתור ה"עדכן"',
	inputs: [{name: 'curent_password', label: 'סיסמא נוכחית (6 עד 8 תווים)',type: 'password'},
			{name: 'new_password', label: 'סיסמא חדשה (6 עד 8 תווים)',type: 'password'}],
	button:{id:'update_password',value:'עדכן סיסמא'},
	forgot:true
}

var reset = {
	title: 'אפס סיסמא',
	form_name:'reset_password_form',
	sub_title: 'רק תוודא שהמייל שלך הוא המעודכן ותלחץ על שלח.... אנחנו נשלח למייל שלך סיסמא חדשה לאיפוס',
	inputs: [{name: 'email', label: 'שם משתמש',type: 'text'}],
	button:{id:'reset_password',value:'אפס סיסמא'},
	forgot:false	
}


var user = {
	title: 'עדכון פרטים',
	form_name:'user_details_form',
	sub_title: 'רק תוודא שהמייל שלך הוא המעודכן ותלחץ על שלח.... אנחנו נשלח למייל שלך סיסמא חדשה לאיפוס',
	inputs: [{name: 'firstName', label: 'שם פרטי',type: 'text'},{name: 'lastName', label: 'שם משפחה',type: 'text'},{name: 'email', label: 'שם משתמש',type: 'text'}],
	button:{id:'update_details',value:'עדכן נתונים'},
	forgot:false	
}

var choose = {
	title: 'בחר סיסמא חדשה',
	form_name:'new_password_form',
	sub_title: 'תכניס את הקוד שקיבלת באימייל ותוסיף את הקוד החדש שלך',
	inputs: [{name: 'code', label: 'הקוד שקיבלת',type: 'text'},{name: 'new_password', label: 'סיסמא חדשה',type: 'password'}],
	button:{id:'choose_password',value:'שנה סיסמא'},
	forgot:false	
}


function start_popup(){
	return '<div class="ca_mask"><div class="inner_display"></div><div class="ca_middle_wrapper"><div class="ca_popup_wrapper"><div class="x_popup_wrapper"><div class="x_popup"></div><div class="popup_content_wrapper">';
}

function end_popup(){
	return '</div></div></div></div>';
}

function title_bulid(title){
	return '<div class="popup_title">'+title+'</div>';
}

function sub_title_bulid(title){
	return '<div class="popup_sub_title">'+title+'</div>';
}

function input_obj(obj,details){
	ans = {};
	if (obj.type){
		ans.type = 'type="'+obj.type+'"';
	}else{
		ans.type = 'type="text"';
	}
	if (obj.name){
		ans.name = 'name="'+obj.name+'"';
		ans.id = 'id="'+obj.name+'"';
		if (details[obj.name]){
			ans.value = 'value="'+details[obj.name]+'"';
		}else {
			ans.value = '';
		}
	}else{
		ans.name = '';
		ans.id = '';	
		ans.value = '';	
	}
	return ans.type + ' ' + ans.name + ' ' + ans.id + ' ' + ans.value;
}

function is_in(obj,details){
	if (details[obj.name]){
		return 'is-in';
	}else{
		return '';
	}
}

function inputs(inputs_array,details){
	str = '';
	if (details['email']){
		str = str +'<input type="hidden" name="userName" value="'+details['email']+'" />';
	}
	for (i = 0; i < inputs_array.length; i++) {
		str_input = '<div class="popup_input_wrapper '+is_in(inputs_array[i],details)+'"><label class="lable_input">';
		if (inputs_array[i].label){
			label = inputs_array[i].label;
		}else{
			label = '';
		}
		str_input = str_input + label + '</label>' + '<input class="input_content" ';
		input_object = input_obj(inputs_array[i],details);
		str_input = str_input + input_object;
		str_input = str_input + '/></div>';
		str = str + str_input; 
	}
	return str;
}

function form_bulid(obj,details){
	if (obj.form_name){
		form_name = obj.form_name;
	}else{
		form_name = 'form_name';
	}
	str = '<form name="'+form_name+'" id="'+form_name+'">';
	str = str + inputs(obj.inputs,details);
	str = str +'</form>';
	return str;
}

function popup_content(obj,details){
	title = title_bulid(obj.title);
	sub_title = sub_title_bulid(obj.sub_title);
	form = form_bulid(obj,details);
	return title + sub_title + form;
}

function button_bulid(obj,details){
	if(obj.button){
		id = obj.button.id;
		value = obj.button.value;
	}
	if (obj.forgot){
		forgot = '<div class="forgot_password">שכחתי סיסמא</div>';
	}else{
		forgot = '';
	}
	return '<input type="button" class="popup_click" value="'+value+'" id="'+id+'"/>'+forgot;
}

function create_popup(obj,details){
	str = start_popup();
	str = str+ popup_content(obj,details);
	str = str + button_bulid(obj,details);
	str = str + end_popup();
	console.log(str);
	$('body').html(str);
}

//create_popup(choose,details);
//create_popup(user,details);
//create_popup(reset,details);
//create_popup(update,details);


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
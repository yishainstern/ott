$('head').append('<link rel="stylesheet" type="text/css" href="style.css">').append('<link rel="stylesheet" type="text/css" href="fonts.css">');
$(document).on('focus','input.input_content', function() {$(this).parent().addClass('is-in');})
$(document).on('blur','input.input_content', function() {str = $(this).val(); if (str.length<1){$(this).parent().removeClass('is-in');	}})
var input_length; var myVar; var arr; var form_name; var data_to_send; var popup_details;var popup_callback; var popup_args;
function close_pop_up(){$('.ca_mask').remove();}
function success_update_password(data){
	console.log(data);
	//create_popup(reset,popup_details);
	close_pop_up();
	popup_callback(popup_args);
}
var update = {
	action: 'update_password',
	title: 'עדכן סיסמא',
	form_name:'update_password_form',
	sub_title: 'הכנס את סיסמתך הישנה ואת הסהמא החדשה, אחר כך לחץ על כפתור ה"עדכן"',
	inputs: [{name: 'curent_password', label: 'סיסמא נוכחית (6 עד 8 תווים)',type: 'password',err: "סיסמא חייבית להיות בין 6 ל 8 תווים"},
			{name: 'new_password', label: 'סיסמא חדשה (6 עד 8 תווים)',type: 'password',err: "סיסמא חייבית להיות בין 6 ל 8 תווים"}],
	button:{id:'update_password',value:'עדכן סיסמא'},
	button_bottom:true,
	button_bottom_text:'שכחתי סיסמא'
}
function success_reset_password(data){
	console.log(data);
	create_popup(choose,popup_details);
}
var reset = {
	action: 'reset_password',
	title: 'אפס סיסמא',
	form_name:'reset_password_form',
	sub_title: 'רק תוודא שהמייל שלך הוא המעודכן ותלחץ על שלח.... אנחנו נשלח למייל שלך סיסמא חדשה לאיפוס',
	inputs: [{name: 'email', label: 'שם משתמש',type: 'text',err:'שדה האימייל חייב להיות מלא'}],
	button:{id:'reset_password',value:'אפס סיסמא'},
	button_bottom:true,
	button_bottom_text:'כבר קיבלתי מייל'
}
function success_user_details(data){
	console.log(data);
	close_pop_up();
	popup_callback(popup_args);
}
var user = {
	action: 'user_details',
	title: 'עדכון פרטים',
	form_name:'user_details_form',
	sub_title: 'רק תוודא שהמייל שלך הוא המעודכן ותלחץ על שלח.... אנחנו נשלח למייל שלך סיסמא חדשה לאיפוס',
	inputs: [{name: 'firstName', label: 'שם פרטי',type: 'text'},{name: 'lastName', label: 'שם משפחה',type: 'text'},{name: 'email', label: 'שם משתמש',type: 'text', err:"שדה מייל חייב להיות מלא"}],
	button:{id:'update_details',value:'עדכן נתונים'},
	forgot:false	
}
function success_new_password(data){
	console.log(data);
	close_pop_up();
	popup_callback(popup_args);
}
var choose = {action: 'new_password',title: 'בחר סיסמא חדשה',form_name:'new_password_form',sub_title: 'תכניס את הקוד שקיבלת באימייל ותוסיף את הקוד החדש שלך',inputs: [{name: 'current_password', label: 'הקוד שקיבלת',type: 'password',err:'שדה לא יכול להיות ריק'},{name: 'new_password', label: 'סיסמא חדשה',type: 'password',err:'שדה לא יכול להיות ריק'}],button:{id:'choose_password',value:'שנה סיסמא'},forgot:false};
function start_popup(){ return '<div class="ca_mask"><div class="inner_display"></div><div class="ca_middle_wrapper"><div class="ca_popup_wrapper"><div class="x_popup_wrapper"><div class="x_popup"></div><div class="popup_content_wrapper">';}
function end_popup(){return '</div></div></div></div>';}
function title_bulid(title){return '<div class="popup_title">'+title+'</div>';}
function sub_title_bulid(title){return '<div class="popup_sub_title">'+title+'</div>';}
function input_obj(obj,details){
	ans = {};
	if (obj.type){ans.type = 'type="'+obj.type+'"';
	}else{ans.type = 'type="text"';}
	if (obj.name){
		ans.name = 'name="'+obj.name+'"';
		ans.id = 'id="'+obj.name+'"';
		if (details[obj.name]){ans.value = 'value="'+details[obj.name]+'"';}else {ans.value = '';}
	}else{
		ans.name = ''; ans.id = ''; ans.value = '';	
	}
	return ans.type + ' ' + ans.name + ' ' + ans.id + ' ' + ans.value;
}
function is_in(obj,details){ if (details[obj.name]){return 'is-in';}else{return '';}}
function inputs(inputs_array,details){
	str = '';
	if (details['email']){
		str = str +'<input type="hidden" name="userName" value="'+details['email']+'" />';
	}
	for (i = 0; i < inputs_array.length; i++) {
		str_input = '<div class="popup_input_wrapper '+is_in(inputs_array[i],details)+'"><label class="lable_input">';
		if (inputs_array[i].label){ label = inputs_array[i].label;
		}else{ label = ''; }
		if(inputs_array[i].err){ err = '<div class="pop_up_error">'+inputs_array[i].err+'</div>';
		}else{ err = ''; }
		str_input = str_input + label + '</label>' + '<input class="input_content" '; input_object = input_obj(inputs_array[i],details); str_input = str_input + input_object; str_input = str_input + '/>'; str_input = str_input + err; str_input = str_input + '</div>'; str = str + str_input; 
	}
	return str;
}
function form_bulid(obj,details){
	if (obj.form_name){ form_name = obj.form_name;
	}else{form_name = 'form_name'; }
	str = '<form class="popup_form" name="'+form_name+'" id="'+form_name+'">'; str = str + inputs(obj.inputs,details); str = str +'</form>';
	return str;
}
function popup_content(obj,details){
	title = title_bulid(obj.title); sub_title = sub_title_bulid(obj.sub_title); form = form_bulid(obj,details);
	return title + sub_title + form;
}
function button_bulid(obj,details){
	if(obj.button){ id = obj.button.id; value = obj.button.value; }
	if(obj.action){ action = obj.action;
	}else{ action = ""; }
	if (obj.button_bottom){
		forgot = '<div class="popup_click_underline" action="'+action+'">'+obj.button_bottom_text+'</div>';
	}else{ forgot = ''; }
	return '<input type="button" class="popup_click" action="'+action+'" value="'+value+'" id="'+id+'"/>'+forgot;
}
function update_is_in(){
	form = document.forms.namedItem(form_name);
	data_to_send = new FormData(form);
	arr = $('.input_content');
	for (i=0;i<arr.length;i++){
		str = $(arr[i]).attr('name');
		str = data_to_send.get(str);
		$(arr[i]).focus(); $(arr[i]).blur();
		if (str || str.length >0){ $(arr[i]).parent().addClass('is-in'); } 
	}
}
function check_yellow(){ tmp = $('.input_content'); if(tmp.length==input_length){ clearTimeout(myVar); update_is_in(); }else{ /*nothing*/} }
function create_popup(obj,details){ str = start_popup(); str = str+ popup_content(obj,details); str = str + button_bulid(obj,details); str = str + end_popup(); $('.ca_mask').remove(); $('body').append(str); input_length = obj.inputs.length; form_name = obj.form_name; myVar = setTimeout(check_yellow, 500); }
function pop_alert(name){
	str = $('input[name="'+name+'"]').val(); sib = $('input[name="'+name+'"]').siblings('.pop_up_error');
	if (str==""&&sib.length>0){ $('input[name="'+name+'"]').siblings('.pop_up_error').show(); return true; }
	return false;
}
function return_json(){
	flag = false; arr_form = $('.popup_form');
	if (arr_form.length > 0){
		var my_form = arr_form[0]; formData = new FormData(my_form); obj = {};
		for(var pair of formData.entries()) {							
			if (pop_alert(pair[0])){ flag = true; } obj[pair[0]] = pair[1];}
		if (flag){ return false; }else{ return obj;	}
	}else {return null; }
}
$('html').on('change','input.input_content',function(event){
	if ($(this).val()==""){ $(this).siblings(".pop_up_error").show();
	}else { $(this).siblings(".pop_up_error").hide();}		
});
$('html').on('click','.x_popup',function(){close_pop_up();popup_callback(popup_args)});
function caller(action,obj){
	console.log(obj);
	$.ajax({
		url:'http://ott.local/ajax.json', method: 'post', dataType: 'json', processData: false, data: obj,
		success: function(data){
			if (typeof window['success_'+action]=='function'){ tmp_func = window['success_'+action]; tmp_func(data); }
		}
	});
}
$('html').on('click','.popup_click',function(){
	tmp_action = $(this).attr('action'); obj = return_json();
	if (obj == false){return;
	}else {caller(tmp_action,obj);	}	
});
$('html').on('click','.popup_click_underline',function(){
	tmp_action = $(this).attr('action');
	switch (tmp_action){
		case 'reset_password': create_popup(choose,popup_details); break;
		case 'update_password': create_popup(reset,popup_details); break;
	}
});
function event_popup(str,obj,func,args){
	tmp_obj = window[str];
	popup_details = obj;
	popup_callback = func;
	popup_args = args;
	if (tmp_obj){
		create_popup(tmp_obj,obj);
	}else {
		alert('somthing rong');
	}
}
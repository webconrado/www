//ON PAGE INIT
myApp.onPageInit('login', function (page) {
	$$('.login_btn').on('click', login);
});

//VALIDATE EMAIL
function email_check(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
} 

//CHECK TOKEN
function check_token(silent){
	var formData = new Object();
	valid_token=false;
	formData.token = localStorage.token;
	stringData = JSON.stringify(formData);
	route = "/token";
	$.ajax({
		type: "POST",
		async:false,
		url: webserviceURL+route,
		data: stringData,
		success: success,
		error:error
	});
	function success(data,status){
		if(data.text.length>0){
			if(!silent){
				myApp.alert(data.text);
				logout();
			}
			localStorage.clear();
		}else{
			valid_token=true;
		}
	}
	function error(data,status){
		if(status=="error"){
			myApp.alert(text_error);
		}else{
			myApp.alert(data.text);
		}
		logout();
	}
	return valid_token;
}

//AUTOLOGIN
function autologin(){
	if(localStorage.token){
		if(check_token(1)==true){
			if(welcomescreen){
				welcomescreen.close();
			}
			//CADASTRO FINALIZAR
			if(localStorage.cadastro==1){
				//ENDERECO FINALIZAR
				if(localStorage.enderecos>0){
					mainView.router.loadPage('home.html');
				}else{
					mainView.router.loadPage('enderecos.html');
				}
			}else{
				mainView.router.loadPage('cadastro_finalizar.html');
			}
		}
	}
}

//LOGOUT
function logout(){
	myApp.confirm("Deseja mesmo efetuar logout?",function(){
		localStorage.clear();
		mainView.router.loadPage('index.html');
		myApp.showIndicator();
		setTimeout(function(){
			myApp.closeModal();
			myApp.hideIndicator();
			location.reload();
		},1000);
	})
}


//LOGIN
function login(email,senha){
	myApp.showPreloader();
	var formData = myApp.formToJSON('#login_form');
	if(email && senha){
		formData.email = email;
		formData.senha = senha;
	}
	if(formData.senha.length>0 && formData.email.length>0){
		stringData = JSON.stringify(formData);
		route = "/login";
		$.ajax({
			type: "POST",
			url: webserviceURL+route,
			data: stringData,
			success: success,
			error:error
		});
		function success(data,status){
			console.log(data);
			myApp.hidePreloader();
			if(data.text.length>0){
				myApp.alert(data.text);
			}else{
				localStorage.token = data.token;
				localStorage.cadastro = data.cadastro;
				localStorage.enderecos = data.enderecos;
				autologin();
			}
		}
		function error(data,status){
			console.log(data);
			if(status=="error"){
				myApp.alert(text_error);
			}else{
				myApp.alert(data.text);
			}
		}
	}else{
		myApp.hidePreloader();
		myApp.alert(text_fields_error);
	}
}

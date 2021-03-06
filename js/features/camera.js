//CAMERA ACTION SHEET MOBILE
function action_sheet_camera(){
	var buttons = [
		{
			text: 'Tirar foto',
			onClick: function () {
				camera();
			}
		},
		{
			text: 'Álbum de fotos',
			onClick: function () {
				camera("album");
			}
		},
		{
			text: 'Cancelar',
			color: 'red'
		},
	];
	myApp.actions(this,buttons);
}

//CAMERA to LocalStorage
function camera(type){
	if(type=="album"){
		//navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:480,targetHeight:480,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		//navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:480,targetHeight:480,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		console.log(image);
		localStorage.setItem("camera",image);
		upload(localStorage.camera,"/usuario_foto/"+localStorage.token);
	}
	function error(message) {
		console.log('Failed because: ' + message);
	}
}


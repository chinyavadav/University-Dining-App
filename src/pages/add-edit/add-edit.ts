import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-add-edit',
 	templateUrl: 'add-edit.html',
 })
 export class AddEditPage {
 	mealOptions=[];
 	meal:any;
 	selectedItem:number;
 	mealTypes=["Breakfast","Lunch & Supper"];
 	public title:string;
 	defaultPhotoPath:string="assets/imgs/meal.jpg";
 	imgPath=this.defaultPhotoPath;
 	public formAddEdit: FormGroup;

 	constructor(public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 		let meal=navParams.get('meal')
 		if(!meal){
 			this.title="Add Meal";
 		}else{
 			this.meal=meal;
 			this.title=meal.fldtitle;
 			if(this.meal.fldpicture!=""){
 				this.imgPath=this.meal.fldpicture;
 			}
 			this.selectedItem=this.mealTypes.indexOf(meal.fldtype);
 		}
 		this.formAddEdit=this.formBuilder.group({
 			title: ['',Validators.required],      
 			description: ['',Validators.required],
 			cost: ['',Validators.required],
 			type: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad AddEditPage');
 	}

 	getMeals() {
 		console.log(this.global.session);
 		this.http.get(this.global.serverAddress+"api/meals-for-menu.php")
 		.subscribe(data => {
 			console.log(data);

 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	returnHome(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	addEdit() {
 		if(this.formAddEdit.valid && this.imgPath!=this.defaultPhotoPath){
 			let loader = this.loadingCtrl.create({
 				content: "Processing...",
 				spinner:"bubbles"
 			});

 			loader.present();
 			let postData:any;
 			postData=this.formAddEdit.value;
 			postData["picture"]=this.imgPath;
 			let mybaseURL:string;
 			if(this.meal){
 				mybaseURL=this.global.serverAddress+"api/edit_meal.php?meal_id="+this.meal.fldmeal_id;
 			}else{
 				mybaseURL=this.global.serverAddress+"api/add_meal.php";
 			}
 			this.http.post(mybaseURL, JSON.stringify(postData))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response = JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					loader.dismiss();
					/*if(this.imgPath!=this.defaultPhotoPath){
 						this.uploadImage(response.meal_id);
 					}*/
 					let alert = this.alertCtrl.create({
 						title: 'Meal',
 						subTitle: this.title+' Meal successfully saved!',
 						buttons: ['OK']
 					});
 					alert.present();
 					this.navCtrl.popToRoot();
 					//this.returnHome();
 				}else{
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Edit Meal',
 						subTitle: this.title+' Meal could not be saved!',
 						buttons: ['OK']
 					});
 					alert.present();
 				}
 			}, error => {
 				loader.dismiss();
 				let toast = this.toastCtrl.create({
 					message: 'Resolve Connectivity Issue!',
 					duration: 3000,
 					position: 'bottom',
 					cssClass: 'dark-trans',
 					closeButtonText: 'OK',
 					showCloseButton: true
 				});
 				toast.present();
 			}
 			);
 		}else{
 			let toast = this.toastCtrl.create({
 				message: 'Properly fill in all details!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 	}

 	takePhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			//sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			encodingType: this.camera.EncodingType.JPEG,
 			mediaType: this.camera.MediaType.PICTURE,
 			saveToPhotoAlbum: false,
 			allowEdit: false,
 			targetWidth:  500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not access camera!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

/* 	uploadImage(meal_id){
 		//show loading
 		let loader = this.loadingCtrl.create({
 			content: "Uploading Image..."
 		});
 		loader.present();
 		//create file transfare object
 		if(this.imgPath!=this.defaultPhotoPath){
 			const fileTransfare: FileTransferObject=this.transfare.create();
 			//option transfare
 			let options: FileUploadOptions={
 				fileKey: 'photo',
 				fileName: meal_id+".jpg",
 				chunkedMode: false,
 				httpMethod: "post",
 				mimeType: "image/jpeg",
 				headers: {}
 			}
 			fileTransfare.upload(this.imgPath, this.global.serverAddress+"api/upload.php", options)
 			.then((data) =>{
 				loader.dismiss();       
 			}, (err)=> {
 				loader.dismiss();
 				let toast = this.toastCtrl.create({
 					message: 'Could not upload image!',
 					duration: 3000,
 					position: 'bottom',
 					cssClass: 'dark-trans',
 					closeButtonText: 'OK',
 					showCloseButton: true
 				});
 				toast.present();
 			});
 		}else{
 			loader.dismiss();
 			let toast = this.toastCtrl.create({
 				message: 'No image to upload seleted!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 		loader.dismiss();
 	}*/

 	getPhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			saveToPhotoAlbum: false,
 			allowEdit: true,
 			targetWidth: 500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not open Gallery!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

 }

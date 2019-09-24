import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
/**
 * Generated class for the StaffLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-staff-login',
 	templateUrl: 'staff-login.html',
 })
 export class StaffLoginPage {
 	private loginForm: FormGroup;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, private formBuilder: FormBuilder,public global:GlobalProvider, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController, private storage: Storage) {
 		this.loginForm=this.formBuilder.group({
 			username: ['',Validators.required],
 			password: ['',Validators.required]
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad StaffLoginPage');
 	}

 	loginFxn(){
 		if(this.loginForm.valid){
 			let loader = this.loadingCtrl.create({
 				content: "Authenticating...",
 				spinner:"bubbles"
 			});
 			loader.present();
 			this.http.post(this.global.serverAddress+"api/staff-login.php", JSON.stringify(this.loginForm.value))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response=JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					let toast = this.toastCtrl.create({
 						message: 'Login was successfully',
 						duration: 3000,
 						position: 'bottom',
 						cssClass: 'dark-trans',
 						closeButtonText: 'OK',
 						showCloseButton: true
 					});
 					toast.present();
 					//this.global.accessLevel="CITIZEN";
 					this.navCtrl.setRoot(HomePage);           
 					this.storage.set("session",response);
 					this.global.session=response;
 					this.global.accessLevel="STAFF";
 				}else{
 					let alert = this.alertCtrl.create({
 						title: 'Login',
 						subTitle: 'Failed to Login!',
 						buttons: ['OK']
 					});
 					alert.present();
 				}  
 			}, error => {
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
 			loader.dismiss();
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

 	forget(){
 		let toast = this.toastCtrl.create({
 			message: 'Contact ITS Department for assistance!',
 			duration: 3000,
 			position: 'bottom',
 			cssClass: 'dark-trans',
 			closeButtonText: 'OK',
 			showCloseButton: true
 		});
 		toast.present();
 	}

 	studentLogin() {
 		this.navCtrl.setRoot(LoginPage);
 	}

 }

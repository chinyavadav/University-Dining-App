import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-feedback',
 	templateUrl: 'feedback.html',
 })
 export class FeedbackPage {
 	feedback:any;
 	private feedbackForm: FormGroup;
 	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, private formBuilder: FormBuilder,public global:GlobalProvider, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController) {
 		this.feedbackForm=this.formBuilder.group({
 			regno: ['',Validators.required],
 			feedback: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad FeedbackPage');
 	}

 	submit(){
 		if(this.feedbackForm.valid){
 			let loader = this.loadingCtrl.create({
 				content: "Submitting...",
 				spinner:"bubbles"
 			});
 			loader.present();
 			this.http.post(this.global.serverAddress+"api/feedback.php", JSON.stringify(this.feedbackForm.value))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response=JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					let toast = this.toastCtrl.create({
 						message: 'Feedback was successfully submitted',
 						duration: 3000,
 						position: 'bottom',
 						cssClass: 'dark-trans',
 						closeButtonText: 'OK',
 						showCloseButton: true
 					});
 					toast.present();
 					this.navCtrl.popToRoot();           
 				}else{
 					let alert = this.alertCtrl.create({
 						title: 'Feedback',
 						subTitle: 'Feedback could not be submitted!',
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

 }

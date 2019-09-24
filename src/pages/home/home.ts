import { Component } from '@angular/core';
import { NavController,AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { TopupPage } from '../topup/topup';
import { MealMenuPage } from '../meal-menu/meal-menu';
import { FeedbacksPage } from '../feedbacks/feedbacks';
import { MealsPage } from '../meals/meals';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	meals:any;
	constructor(public toastCtrl: ToastController, private alertCtrl: AlertController, private storage: Storage,public navCtrl: NavController,public global:GlobalProvider, public http: Http) {
	}

	ionViewDidLoad() {
		if(this.global.accessLevel=='STUDENT'){
			this.getRecommended();
		}
		console.log('ionViewDidLoad HomePage');
	}

	updateMin(value){
		this.http.get(this.global.serverAddress+"api/update_min.php?regno="+this.global.session.fldregno+"&val="+value)
		.subscribe(data => {
			console.log(data);
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				let alert = this.alertCtrl.create({
					title: 'Menu',
					subTitle: 'Minimum Balance successfully updated!',
					buttons: ['OK']
				});
				alert.present();
				this.getSession();
			}else{
				let toast = this.toastCtrl.create({
					message: 'Minimum Balance could not be updated!',
					duration: 3000,
					position: 'bottom',
					cssClass: 'dark-trans',
					closeButtonText: 'OK',
					showCloseButton: true
				});
				toast.present();
			}
		}, error => {
			console.log("failed");
			let toast = this.toastCtrl.create({
				message: 'Minimum Balance could not be updated!',
				duration: 3000,
				position: 'bottom',
				cssClass: 'dark-trans',
				closeButtonText: 'OK',
				showCloseButton: true
			});
			toast.present();
		}
		);
	}

	editMin(){
		let min=(this.global.session.fldlower_theshold/100).toFixed(2);
		const prompt = this.alertCtrl.create({
			title: 'Home',
			message: "Minimum Theshold: $",
			inputs: [
			{
				name: 'minimum',
				placeholder: 'Minimum Amount',
				value: min.toString()
			},
			],
			buttons: [
			{
				text: 'Cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Update',
				handler: data => {
					this.updateMin(data.minimum);
				}
			}
			]
		});
		prompt.present();

	}

	ionViewDidEnter(){
		if(this.global.accessLevel=='STUDENT'){
			this.getSession();
		}
	}

	menu(){
		this.navCtrl.push(MealMenuPage);
	}

	allmeals(){
		this.navCtrl.push(MealsPage);
	}

	feedback(){
		this.navCtrl.push(FeedbacksPage);
	}

	getSession() {
		this.http.get(this.global.serverAddress+"api/session.php?regno="+this.global.session.fldregno)
		.subscribe(data => {
			console.log(data);
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				this.global.session=response;
				this.storage.set("session",response);
			}
		}, error => {
			console.log("failed");
		}
		);
	}

	getRecommended() {
		this.http.get(this.global.serverAddress+"api/recommended.php?regno="+this.global.session.fldregno)
		.subscribe(data => {
			console.log(data);
			let response=JSON.parse(data["_body"]);
			this.meals=response;
		}, error => {
			console.log("failed");
		}
		);
	}

	topup(){
		this.navCtrl.push(TopupPage);
	}
}

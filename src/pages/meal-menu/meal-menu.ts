import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the MealMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-meal-menu',
 	templateUrl: 'meal-menu.html',
 })
 export class MealMenuPage {
 	meals=[];
 	total:number;
 	productsURL:string;
 	baseURL:string;
 	pending_meals_menu=[];
 	constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidEnter() {
 		this.getMeals();
 		if(this.global.accessLevel=='STAFF'){
 			this.getPendingMeals();
 		}else{

 		}
 		console.log('ionViewDidLoad MealMenuPage');
 	}

 	filterMeals(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.meals=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.meals = this.meals.filter((meal) => {
 					return ((meal.flddescription.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	getMeals() {
 		this.baseURL=this.global.serverAddress+"api/meals-for-menu.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.meals=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	getPendingMeals() {
 		this.baseURL=this.global.serverAddress+"api/pending_meals_menu.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.pending_meals_menu=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}
 	
 	add(meal_id) {
 		this.baseURL=this.global.serverAddress+"api/add_to_menu.php?meal_id="+meal_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Menu',
 					subTitle: 'Meal added successfully!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.getMeals();
 				this.getPendingMeals();
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Meal could not be added to menu!',
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
 				message: 'Meal could not be added to menu!',
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

 	remove(meal_id) {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/remove-from-menu.php?meal_id="+meal_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Menu',
 					subTitle: 'Meal deleted successfully!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.getMeals();
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Meal could not be deleted!',
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
 		}
 		);
 	}

 	book(meal) {
 		if(parseInt(meal.fldcost)<=parseInt(this.global.session.fldbalance)){
 			this.baseURL=this.global.serverAddress+"api/book.php?meal_id="+meal.fldmeal_id+"&regno="+this.global.session.fldregno;
 			this.http.get(this.baseURL)
 			.subscribe(data => {
 				console.log(data);
 				let response=JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					let alert = this.alertCtrl.create({
 						title: 'Menu',
 						subTitle: 'Meal successfully booked!',
 						buttons: ['OK']
 					});
 					alert.present();
 				}else{
 					let toast = this.toastCtrl.create({
 						message: 'Meal could not be booked!',
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
 			}
 			);
 		}else{
 			let alert = this.alertCtrl.create({
 				title: 'Menu',
 				subTitle: 'Insufficient funds to Book Meal!',
 				buttons: ['OK']
 			});
 			alert.present();
 		}
 	}

 	showAlert() {
 		let alert = this.alertCtrl.create();
 		alert.setTitle('Meals');

 		for (var key in this.pending_meals_menu) {
 			alert.addInput({
 				type: 'radio',
 				label: this.pending_meals_menu[key].fldtitle,
 				value: this.pending_meals_menu[key].fldmeal_id,
 				checked: false
 			});
 		}


 		alert.addButton('Cancel');
 		alert.addButton({
 			text: 'OK',
 			handler: data => {
 				console.log(data);
 				this.add(data);
 			}
 		});
 		alert.present();
 	}

 }

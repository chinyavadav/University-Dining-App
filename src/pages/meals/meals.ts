import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { AddEditPage } from '../add-edit/add-edit';

/**
 * Generated class for the MealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-meals',
 	templateUrl: 'meals.html',
 })
 export class MealsPage {

 	meals=[];
 	total:number;
 	productsURL:string;
 	baseURL:string;
 	constructor(public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad MealsPage');
 	}

 	ionViewDidEnter() {
 		this.initMeals();
 		console.log('ionViewDidLoad MealsPage');
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

 	initMeals() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/meals.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.meals=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	edit(meal){
 		this.navCtrl.push(AddEditPage, {'meal':meal});
 	}

 	add(){
 		this.navCtrl.push(AddEditPage);
 	}
 }

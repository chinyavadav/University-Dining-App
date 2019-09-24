import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the FeedbacksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-feedbacks',
 	templateUrl: 'feedbacks.html',
 })
 export class FeedbacksPage {

 	feedbacks=[];
 	total:number;
 	constructor(public alertCtrl: AlertController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		this.initFeedbacks();
 		console.log('ionViewDidLoad FeedbacksPage');
 	}

 	filterFeedbacks(ev: any) {
 		this.http.get(this.global.serverAddress+"api/feedbacks.php")
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.feedbacks=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.feedbacks = this.feedbacks.filter((feedback) => {
 					return ((feedback.fldmessage.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	show(feedback){
 		let alert = this.alertCtrl.create({
 			title: feedback.fldregno,
 			subTitle: feedback.fldmessage,
 			buttons: ['OK']
 		});
 		alert.present();
 	}

 	initFeedbacks() {
 		this.http.get(this.global.serverAddress+"api/feedbacks.php")
 		.subscribe(data => {
 			console.log(data);
 			this.feedbacks=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	pushStatement(statement){
 		//this.navCtrl.push(ParliamentarianPage, {'parliamentarian':parliamentarian});
 	}

 }

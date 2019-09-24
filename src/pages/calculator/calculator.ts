import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { FormBuilder, FormGroup} from '@angular/forms';
import { TopupPage } from '../topup/topup';
/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-calculator',
 	templateUrl: 'calculator.html',
 })
 export class CalculatorPage {
 	average:any;
 	private calculatorForm: FormGroup;
 	constructor(private alertCtrl: AlertController,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider, public http: Http) {
 		this.calculatorForm=this.formBuilder.group({
 			breakfast: [false],
 			lunch: [false],
 			supper: [false]
 		});
 	}

 	ionViewDidLoad() {
 		this.getAverages();
 		console.log('ionViewDidLoad CalculatorPage');
 	}

 	calculate(){
 		if(this.average){
 			let sum=0;
 			let data=this.calculatorForm.value;
 			let averageBreakfast=this.average.averageBreakfast;
 			let averageLunchSupper=this.average.averageLunchSupper;
 			if(data.breakfast==true){
 				sum=sum+parseInt(averageBreakfast);
 			}
 			if(data.lunch==true){
 				sum=sum+parseInt(averageLunchSupper);
 			}
 			if(data.supper==true){
 				sum=sum+parseInt(averageLunchSupper);
 			}
 			let balance=parseInt(this.global.session.fldbalance);
 			let days=Math.round(balance/sum);
 			const alert = this.alertCtrl.create({
 				title: 'MSU DH',
 				subTitle: 'Forecast: <b>'+days+' Days</b>',
 				buttons: ['OK']
 			});
 			alert.present();
 		}else{
 			const alert = this.alertCtrl.create({
 				title: 'MSU DH',
 				subTitle: 'Forecast Unsuccessful!',
 				buttons: ['OK']
 			});
 			alert.present(); 			
 		}
 	}

 	getAverages() {
 		this.http.get(this.global.serverAddress+"api/average.php")
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			this.average=response;
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	topup(){
 		this.navCtrl.push(TopupPage);
 	}

 }

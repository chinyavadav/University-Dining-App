import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the StatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statement',
  templateUrl: 'statement.html',
})
export class StatementPage {
 	transactions=[];
 	total:number;
 	constructor(public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		this.initTransactions();
 		console.log('ionViewDidLoad StatementPage');
 	}

 	filterTransactions(ev: any) {
 		this.http.get(this.global.serverAddress+"api/transactions.php?regno="+this.global.session.fldregno)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.transactions=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.transactions = this.transactions.filter((transaction) => {
 					return ((transaction.flddescription.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initTransactions() {
 		this.http.get(this.global.serverAddress+"api/transactions.php?regno="+this.global.session.fldregno)
 		.subscribe(data => {
 			console.log(data);
 			this.transactions=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	pushStatement(statement){
 		//this.navCtrl.push(ParliamentarianPage, {'parliamentarian':parliamentarian});
 	}
}

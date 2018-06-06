import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {} as User;
  constructor(private afAuth: AngularFireAuth
    ,public navCtrl: NavController) {

  }
  async normalLogin(user: User){
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
    }catch(e){
      console.error(e);
    }
  }
  logWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then( res => {
        console.log('From --Facebook--');
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  
  logWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( res => {
        console.log('From --Google--');
        
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  logWithTwitter() {

  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
}

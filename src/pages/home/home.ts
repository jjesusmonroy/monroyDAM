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
    if(this.afAuth.auth){
      this.afAuth.auth.signOut();
    }
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then( res => {
        console.log('From --Facebook--');
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  
  logWithGoogle() {
    if(this.afAuth.auth){
      this.afAuth.auth.signOut();
    }
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( res => {
        console.log('From --Google--');
        
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  logWithTwitter() {
    if(this.afAuth.auth){
      this.afAuth.auth.signOut();
    }
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then( res => {
        console.log('From --Twitter--');
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  logWithGithub(){
    if(this.afAuth.auth){
      this.afAuth.auth.signOut();
    }
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then( res => {
        console.log('From --Github--');
        console.log(res);
        this.navCtrl.push('QrscannerPage');
      });
  }
  logOut(){
    this.afAuth.auth.signOut();
  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
}

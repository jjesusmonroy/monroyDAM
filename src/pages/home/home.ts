import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";

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

  }
  logWithGoogle() {

  }
  logWithTwitter() {

  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
}

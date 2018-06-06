import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {
    correo: '',
    password: ''
  }
  constructor(public navCtrl: NavController) {

  }

  logWithFacebook() {

  }
  logWithGoogle() {

  }
  logWithTwitter() {

  }
}

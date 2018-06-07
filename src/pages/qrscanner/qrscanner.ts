import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  constructor(private barcodeText:string,
    private barcodeFormat:string,
    private platform:Platform,
    public barcodeScanner:BarcodeScanner, public plt:Platform,
    public navCtrl: NavController, public navParams: NavParams) {
      this.platform=plt;
      this.navCtrl=navCtrl;
  }

  qrScann(){
    console.log('scannig product barcode');
    this.plt.ready().then(() => {
      this.barcodeScanner.scan().then((result) => {
        if (!result.cancelled) {
          this.barcodeText = result.text;
          this.barcodeFormat = result.format;
          console.log(result.text);
          console.log("Formaaaaat" +this.barcodeFormat);
          console.log("Teeeext" +this.barcodeText);
        }
      }, (error) => {
        console.log('error when scanning product barcode');
      });
    });
  }

  
}

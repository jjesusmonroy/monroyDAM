import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {
  private bcData;
  public photo;
  public contact;
  public aux;
  public auxName;

  public flag:boolean;
  
  constructor(public contacts: Contacts
    ,private barcodeText:string,
    private barcodeFormat:string,
    private platform:Platform,
    public barcodeScanner:BarcodeScanner, public plt:Platform,
    public navCtrl: NavController, public navParams: NavParams) {
      this.platform=plt;
      this.navCtrl=navCtrl;
      this.aux=[];
      this.auxName=[];
      this.contact={};
      this.flag=false;
  }

  qrScann(){
    console.log('scannig product barcode');
    this.plt.ready().then(() => {
      this.barcodeScanner.scan().then((result) => {
        if (!result.cancelled) {
          this.barcodeText = result.text;
          this.barcodeFormat = result.format;
          console.log(result.text);
          this.bcData=result.text;
          this.obtainData();
          this.flag=true;
          console.log("Formaaaaat" +this.barcodeFormat);
          console.log("Teeeext" +this.barcodeText);
        }
      }, (error) => {
        console.log('error when scanning product barcode');
        this.flag=false;
      });
    });
  }
  obtainData() {
    this.bcData = this.bcData.replace("ORG", "");
    this.bcData = this.bcData.replace("EMAIL;WORK;INTERNET", "");
    this.bcData = this.bcData.replace("URL", "");
    this.bcData = this.bcData.replace("TEL;CELL", "");
    this.bcData = this.bcData.replace("TEL", "");
    this.bcData = this.bcData.replace("TEL;FAX", "");
    this.bcData = this.bcData.replace("ADR", "");
    this.bcData = this.bcData.replace("END", "");

    this.aux = this.bcData.split(":");
    //this.contact.name = this.contact.name.replace(";", " ");
    this.auxName=this.aux[3].split(";");
    this.contact.name =this.auxName[1].replace("FN","");
    this.contact.lastname= this.auxName[0];
    this.contact.org = this.aux[5].replace("TITLE","");
    this.contact.email = this.aux[11];//P
    this.contact.site = this.aux[13];//P
    this.contact.cel = this.aux[9];
    this.contact.phone = this.aux[8];
    this.contact.fax = this.aux[10];

    this.contact.address = this.aux[7].replace("WORK;VOICE","");

    this.contact.street = this.contact.address.split(";")[2];
    this.contact.city = this.contact.address.split(";")[3];
    this.contact.state = this.contact.address.split(";")[4];
    this.contact.zipcode = this.contact.address.split(";")[5];
    this.contact.country = this.contact.address.split(";")[6];
    this.photo = "https://api.adorable.io/avatars/200/" + this.contact.email;
  }
  crearContacto(){
    let contact: Contact = this.contacts.create();
    let avatar ="./assets/icon/avatar.png";
    contact.displayName = this.contact.name + ' ' + this.contact.lastname;

    contact.phoneNumbers = [new ContactField('Fijo', this.contact.phone),
      new ContactField('Movil', this.contact.cel)];
    contact.save().then(
      () => { 
        console.log('Contact Guardado!', contact)
      },
      (error: any) => {
        console.error('Error al guardar el contacto.', error)
      }
    );
  }
  saveOnFirebase(){

  } 
}

import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-robotcar',
  templateUrl: './robotcar.page.html',
  styleUrls: ['./robotcar.page.scss'],
})
export class RobotcarPage implements OnInit {

  public automatic: boolean;
  public potency: number;

  PairedList: pairedList;
  dataSend: string = "";

  constructor(private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) { this.automatic = false;}

  ngOnInit() {
  }
 
  

  moveForward(){
    console.log("forward");
    this.bluetoothSerial.write("f").then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

  moveBackwards(){
    this.bluetoothSerial.write("b").then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

  moveLeft(){
    this.bluetoothSerial.write("l").then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

  moveRigth(){
    this.bluetoothSerial.write("r").then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

  stop(){
    this.bluetoothSerial.write("s").then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

 

  public notify() {
    console.log("Toggled: "+ this.automatic); 
    this.bluetoothSerial.write(this.automatic).then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });

  }

  public rangeChange() {
    console.log("Range: "+ this.potency); 
    this.bluetoothSerial.write(this.potency).then(success =>{
      this.showToast(success);
    }, error =>{
      this.showError(error)
    });
  }

  async showError(error){
    let alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  async showToast(msj){
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }


}

interface pairedList {
  "class": number,
  "id": string,
  "address": string,
  "name": string

}


import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  pairedList: pairedList[];
  listToggle:boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";
  list: pairedList[] =
  [{
    "class": 0,
    "id": "98:D3:31:70:18:F6",
    "address": "98:D3:31:70:18:F6",
    "name": "HC06_Mauri"
}]


  constructor(private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) {this.checkBluetoothEnabled();  }

  ngOnInit() {
  }

  checkBluetoothEnabled(){
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
      
    }, error => {
      this.showError("Please Enable Bluetooth")
    });
  }

  listPairedDevices() {
/*
    this.listToggle = true;
    this.pairedList = this.list;
*/

    this.bluetoothSerial.list().then(success =>{
      this.pairedList = success;
      this.listToggle = true;
    }, error =>{
      this.showError("Please Enable Bluetooth")
      this.listToggle = false;
    });


  }
  selectDevice(){
    console.log(this.pairedDeviceID)
   let connectedDevice: pairedList = this.pairedList[this.pairedDeviceID];
    if(!this.pairedDeviceID){
      this.showError('Select Paired Device to connect');
      return;
    }
    console.log(connectedDevice)
    let address = connectedDevice.address;
    let name = connectedDevice.name;
    console.log(address)
    this.connect(address)
  }

  connect(address){
    this.bluetoothSerial.connect(address).subscribe(success =>{
      this.deviceConnected();
      this.showToast("Successfully Connected");
    }, error =>{
      this.showError("Error: Connecting to Device");
    });
  }

  deviceConnected(){
    this.bluetoothSerial.subscribe('\n').subscribe(success =>{
      this.handleData(success);
      this.showToast("Connected Successfully");
    }, error =>{
      this.showError(error)
    });

  }
  handleData(data){
    this.showToast(data);
  }

  sendData(){
    this.dataSend+='\n';
    this.showToast(this.dataSend);

    this.bluetoothSerial.write(this.dataSend).then(success =>{
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


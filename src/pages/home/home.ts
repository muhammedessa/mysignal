import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mysignaltitle = '';
  mysignalbody  = '';

   mysignaltitle2  = '';
  mysignalbody2= '';


  constructor(public navCtrl: NavController,private oneSignal: OneSignal) {
    this.oneSignalApp();
  }



  oneSignalApp(){


    this.oneSignal.startInit('40240051-3543-473f-b4c7-06fddd5e5c0a', '601471789612');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
     // do something when notification is received
   //  alert('notification is received');
    alert( JSON.stringify(data.payload.title+data.payload.body)  );

       this.mysignaltitle =data.payload.title;
      this.mysignalbody = data.payload.body;
    });

    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      // do something when a notification is opened
      alert('notification is opened');
      this.mysignaltitle2 = res.notification.payload.title;
      this.mysignalbody2 =res.notification.payload.body;
    });
    this.oneSignal.endInit();



  }

}

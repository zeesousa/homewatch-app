import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "page-show-weather",
  templateUrl: "show.html",
})
export class ShowWeatherPage {
  homewatch: Homewatch;
  weather: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.weather = this.navParams.data.thing;
  }

  async ionViewDidLoad() {
    try {
      let response = await this.homewatch.status(this.weather).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }
}

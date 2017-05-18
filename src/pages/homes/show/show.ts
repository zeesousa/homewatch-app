import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { ListHomesPage } from "../list/list";
import { NewThingPage } from "../../things/new/new";
import { ShowHomePopoverPage } from "./popover";
import { ShowLightPage } from "../../things/light/show";

@Component({
  selector: "show-home-page",
  templateUrl: "show.html",
})
export class ShowHomePage {
  homewatch: Homewatch;
  home: any;
  things: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    let response = await this.homewatch.things(this.home).listThings();
    this.things = response.data;
  }

  editThing(thing: any) {
    this.navCtrl.push(NewThingPage, { home: this.home, thing });
  }

  newThing() {
    this.navCtrl.push(NewThingPage, { home: this.home });
  }

  getIconFromType(type: string) {
    switch (type) {
      case "Things::Light":
        return "bulb";
      case "Things::Lock":
        return "lock";
      case "Things::Thermostat":
        return "thermometer";
      case "Things::Weather":
        return "sunny";
      default:
        return "help";
    }
  }

  async showPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShowHomePopoverPage, { home: this.home });

    popover.onDidDismiss(async (deleted) => {
      if (deleted) this.navCtrl.setRoot(ListHomesPage);
    });

    popover.present({
      ev: myEvent
    });
  }

  showThing(thing: any) {
    switch (thing.type) {
      case "Things::Light":
        return this.navCtrl.push(ShowLightPage, { thing });
    }
  }
}
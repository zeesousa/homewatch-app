import { Storage } from "@ionic/storage";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController, LoadingController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomewatchApiService } from "../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { LoginPage } from "../pages/users/login/login";
import { SignUpPage } from "../pages/users/sign-up/sign-up";
import { EditProfilePage } from "../pages/users/sign-up/edit";
import { ListHomesPage } from "../pages/homes/list/list";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  homewatch: HomewatchApi;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string, method: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, homewatchApiService: HomewatchApiService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.homewatch = homewatchApiService.getApi();
    this.setInterceptors();
    this.initializeApp();

    this.pages = [
      { title: "Your Homes", component: ListHomesPage, icon: "home", method: "setRoot" },
      { title: "Profile", component: EditProfilePage, icon: "person", method: "push" },
      { title: "Logout", component: LoginPage, icon: "exit", method: "setRoot" }
    ];
  }

  setInterceptors() {
    let loadingCtrl = this.loadingCtrl;

    this.homewatch.axios.interceptors.request.use(async function (config) {
      config.loading = loadingCtrl.create({
        content: "Please wait..."
      });
      config.loading.present();

      return config;
    });

    this.homewatch.axios.interceptors.response.use(function (response) {
      if (response.config.loading) response.config.loading.dismiss();

      return response;
    }, async (error) => {
      if (error.config.loading) error.config.loading.dismiss();

      if (error.response.status === 401) {
        await this.storage.remove("HOMEWATCH_USER");
        this.nav.setRoot(LoginPage);
        this.toastCtrl.create({ message: "Unauthorized access!", showCloseButton: true, duration: 5000 }).present();
      } else {
        this.toastCtrl.create({ message: "Couldn't reach the servers!", showCloseButton: true, duration: 5000 }).present();
      }
      return Promise.reject(error);
    });
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openPage(page) {
    //if logging out, clear user data
    if (page.component === LoginPage) {
      await this.storage.remove("HOMEWATCH_USER");
    }

    switch (page.method) {
      case "push":
        this.nav.push(page.component);
        break;
      case "setRoot":
        this.nav.setRoot(page.component);
        break;
    }
  }
}

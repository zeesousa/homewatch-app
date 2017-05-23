import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { LoginPage } from "../pages/users/login/login";
import { SignUpPage } from "../pages/users/sign-up/sign-up";
import { EditProfilePage } from "../pages/users/sign-up/edit";
import { ListHomesPage } from "../pages/homes/list/list";
import { NewHomePage } from "../pages/homes/new/new";
import { ShowHomePage } from "../pages/homes/show/show";
import { ShowHomePopoverPage } from "../pages/homes/show/popover";
import { NewThingPage } from "../pages/things/new/new";
import { ShowThingPage } from "../pages/things/show/show";
import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";
import { ShowThermostatPage } from "../pages/things/devices/thermostat/show";
import { ShowWeatherPage } from "../pages/things/devices/weather/show";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule } from "@ionic/storage";
import { HomewatchApiService } from "../services/homewatch_api";
import { ThingsInfo } from "../services/things_info";
import { ThingStatusService } from "../services/thing_status";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowThingPage,
    ShowLightPage,
    ShowLockPage,
    ShowThermostatPage,
    ShowWeatherPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowThingPage,
    ShowLightPage,
    ShowLockPage,
    ShowThermostatPage,
    ShowWeatherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HomewatchApiService,
    ThingsInfo,
    ThingStatusService
  ]
})

export class AppModule { }

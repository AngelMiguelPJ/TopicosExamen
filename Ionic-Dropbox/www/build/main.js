webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropbox; });
throw new Error("Cannot find module \"@angular/core\"");
throw new Error("Cannot find module \"@angular/http\"");
throw new Error("Cannot find module \"rxjs/add/operator/map\"");
throw new Error("Cannot find module \"ionic-native\"");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { Observable } from 'rxjs/Observable';
var Dropbox = /** @class */ (function () {
    function Dropbox(http) {
        this.http = http;
        this.folderHistory = [];
        this.appKey = 'n46jonkl2gd5usy';
        this.redirectURI = 'http://localhost:8100/';
        this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
    }
    Dropbox.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    Dropbox.prototype.getUserInfo = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://api.dropboxapi.com/2-beta-2/users/get_current_account', "null", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Dropbox.prototype.getFolders = function (path) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        var folderPath;
        if (typeof (path) == "undefined" || !path) {
            folderPath = {
                path: ""
            };
        }
        else {
            folderPath = {
                path: path
            };
            if (this.folderHistory[this.folderHistory.length - 1] != path) {
                this.folderHistory.push(path);
            }
        }
        return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Dropbox.prototype.goBackFolder = function () {
        if (this.folderHistory.length > 0) {
            this.folderHistory.pop();
            var path = this.folderHistory[this.folderHistory.length - 1];
            return this.getFolders(path);
        }
        else {
            return this.getFolders();
        }
    };
    Dropbox.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browser = new __WEBPACK_IMPORTED_MODULE_3_ionic_native__["InAppBrowser"](_this.url, '_blank');
            var listener = browser.on('loadstart').subscribe(function (event) {
                //Ignore the dropbox authorize screen
                if (event.url.indexOf('oauth2/authorize') > -1) {
                    return;
                }
                //Check the redirect uri
                if (event.url.indexOf(_this.redirectURI) > -1) {
                    listener.unsubscribe();
                    browser.close();
                    var token = event.url.split('=')[1].split('&')[0];
                    _this.accessToken = token;
                    resolve(event.url);
                }
                else {
                    reject("Could not authenticate");
                }
            });
        });
    };
    Dropbox = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [Object])
    ], Dropbox);
    return Dropbox;
}());

//# sourceMappingURL=dropbox.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
throw new Error("Cannot find module \"@angular/core\"");
throw new Error("Cannot find module \"ionic-angular\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dropbox__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, dropbox) {
        this.navCtrl = navCtrl;
        this.dropbox = dropbox;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.dropbox.login().then(function (success) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }, function (err) {
            console.log(err);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login-page',template:/*ion-inline-start:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\pages\login-page\login-page.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button ion-button color="primary" (click)="login()">Authenticate with Dropbox</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\pages\login-page\login-page.html"*/
        }),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_3__providers_dropbox__["a" /* Dropbox */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login-page.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
throw new Error("Cannot find module \"@angular/core\"");
throw new Error("Cannot find module \"ionic-angular\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dropbox__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, dropbox, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.dropbox = dropbox;
        this.loadingCtrl = loadingCtrl;
        this.depth = 0;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dropbox.setAccessToken();
        this.folders = [];
        var loading = this.loadingCtrl.create({
            content: 'Syncing from Dropbox...'
        });
        loading.present();
        this.dropbox.getFolders().subscribe(function (data) {
            _this.folders = data.entries;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.openFolder = function (path) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Syncing from Dropbox...'
        });
        loading.present(loading);
        this.dropbox.getFolders(path).subscribe(function (data) {
            _this.folders = data.entries;
            _this.depth++;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.goBack = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Syncing from Dropbox...'
        });
        loading.present(loading);
        this.dropbox.goBackFolder().subscribe(function (data) {
            _this.folders = data.entries;
            _this.depth--;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Syncing from Dropbox...'
        });
        loading.present();
        this.dropbox.getFolders().subscribe(function (data) {
            _this.folders = data.entries;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Dropbox Demo\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button *ngIf="depth" (click)="goBack()"><ion-icon name="arrow-back"></ion-icon> Back</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-list>\n\n    <div *ngFor="let folder of folders">\n\n      <ion-item *ngIf="folder[\'.tag\'] == \'folder\'" detail-push (click)="openFolder(folder.path_lower)">\n\n        {{folder.name}}\n\n      </ion-item>\n\n      <ion-item *ngIf="folder[\'.tag\'] == \'file\'">\n\n        {{folder.name}}\n\n      </ion-item>\n\n    </div>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__providers_dropbox__["a" /* Dropbox */], Object])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"@angular/platform-browser-dynamic\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(4);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["platformBrowserDynamic"])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
throw new Error("Cannot find module \"@angular/platform-browser\"");
throw new Error("Cannot find module \"@angular/core\"");
throw new Error("Cannot find module \"ionic-angular\"");
throw new Error("Cannot find module \"@ionic-native/splash-screen\"");
throw new Error("Cannot find module \"@ionic-native/status-bar\"");
throw new Error("Cannot find module \"@angular/http\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dropbox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_page_login_page__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_page_login_page__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_page_login_page__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["StatusBar"],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["SplashScreen"],
                __WEBPACK_IMPORTED_MODULE_6__providers_dropbox__["a" /* Dropbox */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
throw new Error("Cannot find module \"@angular/core\"");
throw new Error("Cannot find module \"ionic-angular\"");
throw new Error("Cannot find module \"@ionic-native/status-bar\"");
throw new Error("Cannot find module \"@ionic-native/splash-screen\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_page_login_page__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_page_login_page__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\angel\Desktop\Ionic-Dropbox-app\ionic-2-dropbox-api\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["StatusBar"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["StatusBar"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["SplashScreen"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["SplashScreen"]) === "function" && _c || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c;
}());

//# sourceMappingURL=app.component.js.map

/***/ })
],[3]);
//# sourceMappingURL=main.js.map
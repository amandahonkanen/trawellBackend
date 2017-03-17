webpackJsonp([1,4],{

/***/ 1093:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(599);


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SessionService = (function () {
    // BASE_URL: string = 'http://localhost:3000';
    function SessionService(router, http) {
        this.router = router;
        this.http = http;
        this.isAuth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.BASE_URL = 'https://trawell.herokuapp.com';
        // set token if saved in local storage
        this.token = localStorage.getItem('token');
        var userFromLocal = localStorage.getItem("user");
        this.currentUser = JSON.parse(userFromLocal);
        // console.log("In constructor in service user", userFromLocal);
        // console.log("In constructor in service token", this.token);
        if (this.token != null) {
            // console.log("true");
            this.isAuth.emit(true);
        }
        else {
            // console.log("false");
            this.isAuth.emit(false);
        }
    }
    SessionService.prototype.canActivate = function () {
        if (localStorage.getItem('token')) {
            // logged in so return true\
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    SessionService.prototype.isAuthenticated = function () {
        return this.token != null ? true : false;
    };
    SessionService.prototype.setTraveller = function (travelerId) {
        console.log("setTraveller: ", travelerId);
        this.traveler = travelerId;
        console.log("setTraveller: after", travelerId);
    };
    SessionService.prototype.getTraveller = function () {
        console.log("getTraveller: ", this.traveler);
        return this.traveler;
    };
    SessionService.prototype.setRequest = function (requestId) {
        console.log("setTraveller: ", requestId);
        this.request = requestId;
        console.log("setRequest: after", requestId);
    };
    SessionService.prototype.getRequest = function () {
        console.log("getRequest: ", this.request);
        return this.request;
    };
    SessionService.prototype.signup = function (user) {
        var _this = this;
        return this.http.post(this.BASE_URL + "/signup", user)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            // console.log(response.json().user)
            if (token) {
                // set token property
                _this.currentUser = response.json().user;
                _this.token = token;
                _this.isAuth.emit(true);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(_this.currentUser));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(error); });
    };
    SessionService.prototype.login = function (user) {
        var _this = this;
        return this.http.post(this.BASE_URL + "/login", user)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            // console.log(response.json().user)
            if (token) {
                // set token property
                _this.currentUser = response.json().user;
                // console.log(this.currentUser)
                _this.token = token;
                _this.isAuth.emit(true);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(_this.currentUser));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(error); });
    };
    SessionService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isAuth.emit(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    SessionService.prototype.sendToken = function () {
        // console.log("sent from session")
        return this.http.post(this.BASE_URL + "/sendToken", { token: localStorage.getItem("token") });
        // .map((res) => res.json())
        // .map((res) => {
        //   console.log("receiving something")
    };
    SessionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _b) || Object])
    ], SessionService);
    return SessionService;
    var _a, _b;
}());
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = (function () {
    function UserService(http, SessionService) {
        this.http = http;
        this.SessionService = SessionService;
        this.BASE_URL = 'https://trawell.herokuapp.com/api';
    }
    UserService.prototype.getList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/users", options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.get = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/users/" + id, options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.edit = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.BASE_URL + "/users/" + user.id, user, options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.remove = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.BASE_URL + "/users/" + id, options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.search = function (city) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/users/city?name=" + city, options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return _this.error = err; });
    };
    //Get new Request
    UserService.prototype.getRequest = function (requestId) {
        // console.log("here is my problem?")
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/request/" + requestId, options)
            .map(function (res) { return res.json(); });
    };
    //Expert-details page -- request form
    UserService.prototype.booking = function (newRequest) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.BASE_URL + "/request", newRequest)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(err); });
    };
    //Request per User
    UserService.prototype.booked = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/booked", options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.removeRequest = function (requestId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.BASE_URL + "/request/" + requestId, options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.makeAgenda = function (newAgenda) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        console.log(newAgenda);
        console.log(this.BASE_URL);
        return this.http.post(this.BASE_URL + "/agenda", newAgenda)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(err); });
    };
    UserService.prototype.getAgenda = function (agendaId) {
        // console.log("here is my problem?")
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/agenda/" + agendaId, options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.removeAgenda = function (agendaId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.BASE_URL + "/agenda/" + agendaId, options)
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AgendaComponent = (function () {
    function AgendaComponent(session, userService, router, route, toastr) {
        this.session = session;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.agenda = {};
        this.user = {};
    }
    AgendaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.getAgenda(params['agendaId']);
        });
    };
    AgendaComponent.prototype.getAgenda = function (agendaId) {
        var _this = this;
        this.userService.getAgenda(agendaId)
            .subscribe(function (agenda) {
            _this.agenda = agenda;
            console.log("agenda", _this.agenda);
        });
    };
    AgendaComponent.prototype.removeAgenda = function (agendaId) {
        var _this = this;
        console.log("remove Request", this.agenda._id);
        this.userService.removeAgenda(this.agenda._id)
            .subscribe(function () {
            console.log("User agenda", _this.agenda.user);
            _this.toastr.success("You deleted the agenda");
            _this.router.navigate(['users', _this.agenda.user._id]);
        });
    };
    AgendaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-agenda',
            template: __webpack_require__(820),
            styles: [__webpack_require__(778)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === 'function' && _e) || Object])
    ], AgendaComponent);
    return AgendaComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=agenda.component.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvatarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AvatarComponent = (function () {
    function AvatarComponent(route, userService, router) {
        this.route = route;
        this.userService = userService;
        this.router = router;
    }
    AvatarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.paramId = params['id'];
        });
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({
            url: "https://trawell.herokuapp.com/api/users/" + this.paramId
        });
        this.uploader.onSuccessItem = function (item, response) {
            console.log('Success', response);
            _this.router.navigate(['users', _this.paramId]);
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            console.log('Error', response);
        };
    };
    AvatarComponent.prototype.addAvatar = function () {
        this.uploader.onBuildItemForm = function (item, form) {
        };
        this.uploader.uploadAll();
    };
    AvatarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-avatar',
            template: __webpack_require__(822),
            styles: [__webpack_require__(780)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], AvatarComponent);
    return AvatarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=avatar.component.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditComponent = (function () {
    function EditComponent(route, userService, sessionService, router) {
        this.route = route;
        this.userService = userService;
        this.sessionService = sessionService;
        this.router = router;
        this.editUser = {};
        this.currentUser = {};
        this.editUser = localStorage.getItem("user");
        var userFromLocal = localStorage.getItem("user");
        this.currentUser = JSON.parse(userFromLocal);
        console.log("user", this.currentUser);
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var paramId;
        this.route.params.subscribe(function (params) {
            paramId = params['id'];
            _this.userService.get(paramId)
                .subscribe(function (user) {
                console.log("user.city", user);
                _this.originalUser = user;
                // console.log("user", user);
                _this.editUser = {
                    id: _this.originalUser._id,
                    username: _this.originalUser.username,
                    name: _this.originalUser.name,
                    role: _this.originalUser.role,
                    password: _this.originalUser.password,
                    age: _this.originalUser.age,
                    interests: _this.originalUser.interests,
                    description: _this.originalUser.description,
                    languages: _this.originalUser.languages,
                    city: _this.originalUser.city
                };
            });
        });
    };
    EditComponent.prototype.save = function () {
        var _this = this;
        // console.log(this.editUser);
        // console.log("EdiUser ", this.editUser);
        // console.log("edit user city: ", this.editUser);
        // console.log("original user: ", this.originalUser)
        var user_id = this.originalUser._id;
        this.userService.edit(this.editUser).subscribe(function (user) {
            console.log(user);
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(user));
            _this.router.navigate(['users', user_id]);
        });
    };
    EditComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit',
            template: __webpack_require__(824),
            styles: [__webpack_require__(782)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpertDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExpertDetailsComponent = (function () {
    function ExpertDetailsComponent(router, route, userService, sessionService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.sessionService = sessionService;
        this.user = {};
        this.traveler = {};
        this.isAuth = false;
        this.newRequest = {
            name: '',
            startDate: '',
            endDate: '',
            city: '',
            traveler: '',
            expert: '',
            whoIsTravelling: '',
            mainInterests: '',
            mustKnows: '',
        };
        this.isCollapsed = true;
        this.token = localStorage.getItem('token');
        var userFromLocal = localStorage.getItem("user");
        this.currentUser = JSON.parse(userFromLocal);
        console.log("In constructor in service user", userFromLocal);
        // console.log("In constructor in service token", this.token);
        if (this.token != null) {
            // console.log("true");
            this.isAuth = true;
        }
        else {
            // console.log("false");
            this.isAuth = false;
        }
    }
    ExpertDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.route);
        this.route.params.subscribe(function (params) {
            _this.getUserDetails(params['id']);
        });
    };
    ExpertDetailsComponent.prototype.getUserDetails = function (id) {
        var _this = this;
        this.userService.get(id)
            .subscribe(function (user) {
            _this.user = user;
            console.log("user in getDetails: ", user);
        });
    };
    ExpertDetailsComponent.prototype.booking = function (request) {
        var _this = this;
        this.traveler = JSON.parse(localStorage.getItem("user"));
        var user = JSON.parse(localStorage.getItem("user"));
        this.newRequest.traveler = this.traveler._id;
        this.newRequest.expert = this.user._id;
        console.log("user in booking(expert) ", this.user._id);
        this.newRequest.expert = this.user._id;
        this.userService.booking(this.newRequest)
            .subscribe(function (result) {
            console.log("result booking ", result);
            _this.router.navigate(['booked']);
        }, function (error) { console.log(error); });
    };
    ExpertDetailsComponent.prototype.collapsed = function (event) {
        //  console.log(event);
    };
    ExpertDetailsComponent.prototype.expanded = function (event) {
        //  console.log(event);
    };
    ExpertDetailsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-expert-details',
            template: __webpack_require__(825),
            styles: [__webpack_require__(783)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */]) === 'function' && _d) || Object])
    ], ExpertDetailsComponent);
    return ExpertDetailsComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=expert-details.component.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(user, router) {
        this.user = user;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.goToSearch = function () {
        console.log(this.city);
        this.router.navigate(["/city"], { queryParams: { name: this.city } });
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(826),
            styles: [__webpack_require__(784)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(session, router, users, toastr) {
        this.session = session;
        this.router = router;
        this.users = users;
        this.toastr = toastr;
        this.user = {
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.session.login(this.user)
            .subscribe(function (result) {
            if (result === true) {
                var user_id = JSON.parse(localStorage.getItem("user"))._id;
                console.log(user_id);
                // login successful
                _this.router.navigate(['users', user_id]);
                _this.toastr.success("You logged in successfully");
            }
            else {
                // login failed
                // this.error = "Username or password is incorrect";
                _this.toastr.error("Username or password is incorrect");
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(827),
            styles: [__webpack_require__(785)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    function ProfileComponent(session, user, router, route) {
        this.session = session;
        this.user = user;
        this.router = router;
        this.route = route;
        this.agenda = {};
        this.booking = {};
        this.value = '';
        this.newAgenda = {
            request: '',
            user: '',
            breakfast1: '',
            breakfast2: '',
            breakfast3: '',
            lunch1: '',
            lunch2: '',
            lunch3: '',
            dinner1: '',
            dinner2: '',
            dinner3: '',
            morningActivity1: '',
            morningActivity2: '',
            morningActivity3: '',
            afternoonActivity1: '',
            afternoonActivity2: '',
            afternoonActivity3: '',
            eveningActivity1: '',
            eveningActivity2: '',
            eveningActivity3: '',
        };
        this.currentUser = this.session.currentUser || {};
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOninit profile");
        this.route.params.subscribe(function (params) {
            _this.get(params['id']);
            console.log("params", params);
        });
        // this.newAgenda.request = this.booking._id
    };
    ProfileComponent.prototype.ngOnChanges = function () {
        console.log("ngOnChanges");
    };
    ProfileComponent.prototype.get = function (id) {
        var _this = this;
        this.user.get(id)
            .subscribe(function (user) {
            _this.currentUser = user;
            console.log("user legs", user);
        });
    };
    ProfileComponent.prototype.makeAgenda = function (bookingId, userId) {
        this.newAgenda.request = bookingId;
        this.newAgenda.user = userId;
        // console.log("booking_id", this.booking._id)
        console.log("new Agenda after", this.newAgenda);
        this.user.makeAgenda(this.newAgenda)
            .subscribe(function (result) {
            console.log("result agenda ", result);
            //  this.router.navigate(['users', this.currentUser]);
        }, function (error) { console.log(error); });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(829),
            styles: [__webpack_require__(787)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session_service__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestConfirmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RequestConfirmComponent = (function () {
    function RequestConfirmComponent(router, session, route, userService) {
        this.router = router;
        this.session = session;
        this.route = route;
        this.userService = userService;
        this.request = {};
        this.booking = {};
        this.value = '';
        this.show = false;
        this.currentUser = this.session.currentUser || {};
    }
    RequestConfirmComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOninit Request Confirm");
        this.route.params.subscribe(function (params) {
            console.log("request", params);
            _this.getRequest(params['requestId']);
            //
            // this.route.params.subscribe(params => {
            //   this.get(params['id']);
            // });
        });
    };
    RequestConfirmComponent.prototype.showComponent = function () {
        this.show ? this.show = false : this.show = true;
    };
    RequestConfirmComponent.prototype.getRequest = function (requestId) {
        var _this = this;
        this.userService.getRequest(requestId)
            .subscribe(function (request) {
            _this.request = request;
            console.log("setting traveler", request.traveler);
            _this.session.setTraveller(request.traveler);
            _this.session.setRequest(request._id);
        });
    };
    RequestConfirmComponent.prototype.removeRequest = function (requestId) {
        var _this = this;
        console.log("remove Request", this.request._id);
        this.userService.removeRequest(this.request._id)
            .subscribe(function () {
            _this.router.navigate(['']);
        });
    };
    RequestConfirmComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-request-form',
            template: __webpack_require__(830),
            styles: [__webpack_require__(788)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _d) || Object])
    ], RequestConfirmComponent);
    return RequestConfirmComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=request-confirm.component.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RequestComponent = (function () {
    function RequestComponent(session, router, userService) {
        this.session = session;
        this.router = router;
        this.userService = userService;
        this.user = JSON.parse(localStorage.getItem("user"));
    }
    RequestComponent.prototype.ngOnInit = function () {
        console.log(this.user);
        console.log(localStorage);
        this.userService.booked()
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                console.log('result ok', result);
            }
            else {
                console.log('result ko', result);
            }
        });
    };
    RequestComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-request',
            template: __webpack_require__(831),
            styles: [__webpack_require__(789)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _c) || Object])
    ], RequestComponent);
    return RequestComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=request.component.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = (function () {
    function SignupComponent(session, router, users, toastr) {
        this.session = session;
        this.router = router;
        this.users = users;
        this.toastr = toastr;
        this.newUser = {
            username: '',
            password: ''
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.session.signup(this.newUser)
            .subscribe(function (result) {
            if (result === true) {
                var user_id = JSON.parse(localStorage.getItem("user"))._id;
                // login successful
                _this.router.navigate(['users', user_id]);
                _this.toastr.success("You signed up successfully");
            }
            else {
                // login failed
                _this.toastr.error("Username already taken");
            }
        });
    };
    SignupComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(832),
            styles: [__webpack_require__(790)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === 'function' && _d) || Object])
    ], SignupComponent);
    return SignupComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserlistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserlistComponent = (function () {
    function UserlistComponent(user, router, route) {
        this.user = user;
        this.router = router;
        this.route = route;
        this.city = [];
    }
    UserlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.search(params["name"]);
        });
    };
    UserlistComponent.prototype.search = function (cityName) {
        var _this = this;
        this.user.search(cityName)
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    UserlistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-userlist',
            template: __webpack_require__(833),
            styles: [__webpack_require__(791)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], UserlistComponent);
    return UserlistComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=userlist.component.js.map

/***/ }),

/***/ 598:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 598;


/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(723);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AgendaFormComponent = (function () {
    function AgendaFormComponent(session, user, router, route, toastr) {
        this.session = session;
        this.user = user;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.agenda = {};
        this.booking = {};
        this.value = '';
        this.newAgenda = {
            request: '',
            user: '',
            day: '',
            city: '',
            breakfast1: '',
            breakfast2: '',
            breakfast3: '',
            lunch1: '',
            lunch2: '',
            lunch3: '',
            dinner1: '',
            dinner2: '',
            dinner3: '',
            morningActivity1: '',
            morningActivity2: '',
            morningActivity3: '',
            afternoonActivity1: '',
            afternoonActivity2: '',
            afternoonActivity3: '',
            eveningActivity1: '',
            eveningActivity2: '',
            eveningActivity3: '',
        };
        this.currentUser = this.session.currentUser || {};
    }
    AgendaFormComponent.prototype.ngOnInit = function () {
        console.log("ngOninit createAgenda Confirm");
        // console.log("USER", this.currentUser);
        console.log("REQ", this.newAgenda.request);
        console.log("agenda-form", this.quote);
    };
    // this.newAgenda.request = this.booking._id
    AgendaFormComponent.prototype.ngOnChanges = function () {
        console.log("ngOnChanges");
    };
    AgendaFormComponent.prototype.makeAgenda = function (bookingId, userId) {
        var _this = this;
        this.newAgenda.request = bookingId;
        this.newAgenda.user = userId;
        console.log("booking_id", this.booking._id);
        console.log("user_id", this.quote);
        console.log("new Agenda after", this.newAgenda);
        this.user.makeAgenda(this.newAgenda)
            .subscribe(function (result) {
            console.log("result agenda ", result);
            console.log("REQ", _this.newAgenda.request);
            _this.toastr.success("One day of the agenda has been sent!");
            //  this.router.navigate(['users', this.currentUser]);
        }, function (error) { console.log(error); });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AgendaFormComponent.prototype, "quote", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AgendaFormComponent.prototype, "traveler", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AgendaFormComponent.prototype, "request", void 0);
    AgendaFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-agenda-form',
            template: __webpack_require__(819),
            styles: [__webpack_require__(777)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === 'function' && _e) || Object])
    ], AgendaFormComponent);
    return AgendaFormComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=agenda-form.component.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(session, toastr, vRef) {
        this.session = session;
        this.toastr = toastr;
        this.title = 'app works!';
        this.toastr.setRootViewContainerRef(vRef);
        if (localStorage.getItem("token")) {
            this.session.sendToken();
        }
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(821),
            styles: [__webpack_require__(779)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === 'function' && _c) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__booking_service__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__signup_signup_component__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_home_component__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__navbar_navbar_component__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__profile_profile_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__edit_edit_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__userlist_userlist_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_search_pipe__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__expert_details_expert_details_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__request_request_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__request_confirm_request_confirm_component__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__avatar_avatar_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__agenda_agenda_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__create_agenda_create_agenda_component__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__agenda_form_agenda_form_component__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ng2_toastr_ng2_toastr__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_ng2_toastr_ng2_toastr__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_11__signup_signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_15__profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_16__edit_edit_component__["a" /* EditComponent */],
                __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__["FileSelectDirective"],
                __WEBPACK_IMPORTED_MODULE_18__userlist_userlist_component__["a" /* UserlistComponent */],
                __WEBPACK_IMPORTED_MODULE_19__pipes_search_pipe__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_20__expert_details_expert_details_component__["a" /* ExpertDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_21__request_request_component__["a" /* RequestComponent */],
                __WEBPACK_IMPORTED_MODULE_22__request_confirm_request_confirm_component__["a" /* RequestConfirmComponent */],
                __WEBPACK_IMPORTED_MODULE_23__avatar_avatar_component__["a" /* AvatarComponent */],
                __WEBPACK_IMPORTED_MODULE_24__agenda_agenda_component__["a" /* AgendaComponent */],
                __WEBPACK_IMPORTED_MODULE_25__create_agenda_create_agenda_component__["a" /* CreateAgendaComponent */],
                __WEBPACK_IMPORTED_MODULE_26__agenda_form_agenda_form_component__["a" /* AgendaFormComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__["a" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap__["b" /* CollapseModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_27_ng2_toastr_ng2_toastr__["ToastModule"].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_9__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_10__booking_service__["a" /* BookingService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup_component__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_edit_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userlist_userlist_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__expert_details_expert_details_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__request_request_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__request_confirm_request_confirm_component__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__avatar_avatar_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__agenda_agenda_component__ = __webpack_require__(372);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });











var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_0__login_login_component__["a" /* LoginComponent */] },
    { path: 'users/:id/edit', component: __WEBPACK_IMPORTED_MODULE_4__edit_edit_component__["a" /* EditComponent */] },
    { path: 'users/:id/avatar', component: __WEBPACK_IMPORTED_MODULE_9__avatar_avatar_component__["a" /* AvatarComponent */] },
    { path: 'users/:id', component: __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'agenda/:agendaId', component: __WEBPACK_IMPORTED_MODULE_10__agenda_agenda_component__["a" /* AgendaComponent */] },
    { path: 'city/:id', component: __WEBPACK_IMPORTED_MODULE_6__expert_details_expert_details_component__["a" /* ExpertDetailsComponent */] },
    { path: 'user/:id', component: __WEBPACK_IMPORTED_MODULE_6__expert_details_expert_details_component__["a" /* ExpertDetailsComponent */] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_1__signup_signup_component__["a" /* SignupComponent */] },
    { path: 'city', component: __WEBPACK_IMPORTED_MODULE_5__userlist_userlist_component__["a" /* UserlistComponent */] },
    { path: 'booked', component: __WEBPACK_IMPORTED_MODULE_7__request_request_component__["a" /* RequestComponent */] },
    { path: 'request/:requestId', component: __WEBPACK_IMPORTED_MODULE_8__request_confirm_request_confirm_component__["a" /* RequestConfirmComponent */] },
    // { path: 'request/:requestId/', component: RequestConfirmComponent},
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BookingService = (function () {
    function BookingService(http, SessionService, UserService) {
        this.http = http;
        this.SessionService = SessionService;
        this.UserService = UserService;
        this.BASE_URL = 'https://trawell.herokuapp.com/api';
    }
    BookingService.prototype.getRequest = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/request/" + id, options)
            .map(function (res) { return res.json(); });
    };
    BookingService.prototype.requestPost = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.SessionService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.BASE_URL + "/request", options)
            .map(function (res) { return res.json(); });
    };
    BookingService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__session_service__["a" /* SessionService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _c) || Object])
    ], BookingService);
    return BookingService;
    var _a, _b, _c;
}());
//# sourceMappingURL=booking.service.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session_service__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAgendaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateAgendaComponent = (function () {
    function CreateAgendaComponent(router, session, route, userService) {
        this.router = router;
        this.session = session;
        this.route = route;
        this.userService = userService;
        this.traveler = {};
        this.request = {};
        this.value = '';
        this.isCollapsed = false;
        this.currentUser = this.session.currentUser || {};
    }
    CreateAgendaComponent.prototype.ngOnInit = function () {
        this.traveler = this.session.getTraveller();
        console.log("Traveler from usa", this.traveler);
        this.request = this.session.getRequest();
        console.log("Request from usa", this.request);
    };
    CreateAgendaComponent.prototype.collapsed = function (event) {
        //  console.log(event);
    };
    CreateAgendaComponent.prototype.expanded = function (event) {
        //  console.log(event);
    };
    CreateAgendaComponent.prototype.onEnter = function (value) {
        this.value = value;
        console.log(this.value);
        this.numberValue = Number(value);
        var items = [];
        for (var i = 1; i <= this.numberValue; i++) {
            items.push(i);
            console.log(items);
        }
        return items;
    };
    CreateAgendaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-agenda',
            template: __webpack_require__(823),
            styles: [__webpack_require__(781)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _d) || Object])
    ], CreateAgendaComponent);
    return CreateAgendaComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=create-agenda.component.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent(session, router, route) {
        var _this = this;
        this.session = session;
        this.router = router;
        this.route = route;
        this.session.isAuth
            .subscribe(function (isAuth) {
            // user will be false if logged out
            // or user object if logged in.
            console.log("in navbar event");
            _this.isAuth = isAuth;
        });
        this.user = JSON.parse(localStorage.getItem("user"));
    }
    NavbarComponent.prototype.ngOnInit = function () {
        if (this.session.token != null) {
            this.isAuth = true;
        }
        else {
            this.isAuth = false;
        }
    };
    NavbarComponent.prototype.logout = function () {
        this.session.logout();
        this.router.navigate(['/']);
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(828),
            styles: [__webpack_require__(786)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, field, value) {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(function (it) { return it[field].match(new RegExp(value, 'i')); });
    };
    SearchPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'filter',
            pure: false,
        }), 
        __metadata('design:paramtypes', [])
    ], SearchPipe);
    return SearchPipe;
}());
//# sourceMappingURL=search.pipe.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "body {\n\n}\n\n/*.agenda-view {\n  text-align: center;\n  /*color: #193F69;*/\n  /*position: relative;\n  background-color: #193F69;\n  background-size: cover;\n}*/\n\n/*.agenda-view {\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  /*opacity: 0.5;*/\n  /*z-index: -1;\nbackground-color:#193F69;\nbackground-repeat: no-repeat;\n  background-position: 50% 0;\n  -ms-background-size: cover;\n  -o-background-size: cover;\n  -moz-background-size: cover;\n  -webkit-background-size: cover;\n  background-size: cover;\n}*/\n\n.agenda {\n  color: #193F69;\n  width: 60%;\n  border-radius: 5%;\n  background-color: white;\n  border: 10px solid #193F69;\n  padding: 40px;\n  position:absolute;\n  top: 10%;\n  left: 20%;\n  text-align: center;\n}\n\n.dining {\n  padding-top: 20px;\n}\n\n.activity {\n  margin-top: 20px;\n}\n\n.option {\nfont-size: 16px;\n}\n\nbutton {\n  margin-top: 50px;\n  width: 100px;\n  background-color: white;\n  color: #193F69;\n}\n\nbutton:hover {\n  background-color: #84D7C4;\n  border: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".container {\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "#numberDays {\nwidth: 600px;\n}\n\nbutton {\n  width: 100px;\n  background-color: white;\n  color: #193F69;\n\n}\n\nbutton:hover {\n  background-color: #83D7C5;\n  color: white;\n  border: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "\nspan{\n  font-size: 16px;\n  font-weight: bold;\n  margin-left: 10%;\n}\n\n\n.request-button {\n  clear: both;\n}\n\n#seperate-line {\n  clear: both;\n}\n\n\n#grad {\n  /*border: 5px solid rgba(0,56,119,0.5);*/\n  /*height: 278px;*/\n}\n\n.box {\n  border: 5px solid rgb(25, 63, 105);\n}\n\n.card {\n  /*position: relative;*/\n  border-radius: 1px;\n  /*border: 7px solid rgb(25, 63, 105);*/\n  padding: 0;\n  height: 290px;\n  margin-left: -5px;\n  margin-top: 20px;\n}\n\n\n\nbutton{\n  background-color: rgb(25, 63, 105);\n  width: 100%;\n  height: 40px;\n  color: white;\n  z-index: 999;\n  border: 3px solid rgba(181, 220, 149,0.8);\n  box-shadow: -2px 7px 5px 4px rgba(181, 220, 149,0.3);\n}\n\n.button:hover {\n  background-color: rgb(25, 63, 105);\n}\n\n.card .avatar {\n  position: relative;;\n  z-index: 100;\n}\n\n.card .avatar img {\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  border: 5px solid rgba(252,252,252,0.8);\n  float: left;\n  margin-left: 30px;\n}\n\n.content{\n  margin-top: 50px;\n  /*color: white;*/\n}\n\n\np{\n  color: black;\n  margin-top: 10px;\n  margin-left: 20%;\n}\n\n.request-button {\n  height: 35px;\n  width: 200px;\n  font-size: 14px;\n  color: white;\n  border-radius: 5px;\n  border:none;\n  background-color: #464775;\n}\n\n.request-button:hover {\n  background-color: #464775;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".video1 {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    min-width: 100%;\n    min-height: 100%;\n    width: auto;\n    height: auto;\n    z-index: -100;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n            transform: translateX(-50%) translateY(-50%);\n    background-size: cover;\n    /*background-repeat: repeat;*/\n    -webkit-transition: 1s opacity;\n    transition: 1s opacity;\n}\n\n.info{\n    height: 450px;\n    /*z-index: 9999;*/\n    margin-top: 80px;\n    display: block;\n    background-color: white;\n    /*position: fixed;*/\n    width: 100%;\n    left: 0%;\n}\n\n\n.jumbotron {\n  opacity: 0.9;\n  margin-top: 50px;\n}\n\n#search-button {\n height: 35px;\n width: 120px;\n font-size: 14px;\n color: white;\n border-radius: 5px;\n border:none;\n background-color: #65B69A;\n\n}\n\n#search-button:hover {\n  background-color: white;\n  color: #65B69A;\n}\n\n\n.bottom{\n  height: 200px;\n  /*z-index: 9999;*/\n  margin-top: 500px;\n  display: inline-block;\n  background-color: white;\n  position: fixed;\n  width: 100%;\n  left: 0%;\n  padding: 50px;\n}\n\nh4{\n  font-weight: bold;\n}\n\n.col-md-12{\n  padding-bottom: 50px;\n}\n\n\n/*.col-md-4{\n  border-right:\n}*/\n\n\n.video-container {\n    /*position: fixed;*/\n    margin-top: -2%;\n    /*margin-left: -2%;*/\n    max-width: 100%;\n    max-height: 100%;\n    width: 200%;\n    height: auto;\n    z-index: -100;\n    right: 0%;\n    /*transform: translateX(-50%) translateY(-50%);*/\n    /*background-size: cover;*/\n    /*background-repeat: repeat;*/\n    -webkit-transition: 1s opacity;\n    transition: 1s opacity;\n    border-top: 3px solid (178, 220, 154);\n}\n\n.col-lg-8{\n  background-color: rgba(0,42,89,0.4);\n  z-index: 50;\n  margin-top: -40%;\n  margin-left: 15%;\n  height: 300px;\n}\n.expert{\n  position: absolute;\n  z-index: 100;\n  background-color: rgb(178, 220, 154);\n  border-radius: 2ß%;\n  margin-left: 23%;\n  margin-top: 12%;\n  width: 50%;\n  height:80px;\n  color: white;\n  font-family: 'Ubuntu', sans-serif;\n  font-size: 20px;\n  border: none;\n  box-shadow: 2px 7px 7px 7px rgba(181, 220, 149,0.3);\n}\n\n/*FOOTER*/\n\n.full {\n  margin-top: -1%;\n    width: 100%;\n}\n.gap {\n\theight: 30px;\n\twidth: 100%;\n\tclear: both;\n\tdisplay: block;\n}\n.footer {\n\tbackground: #EDEFF1;\n\theight: auto;\n\tpadding-bottom: 30px;\n\tposition: relative;\n\twidth: 100%;\n\tborder-bottom: 1px solid #CCCCCC;\n\tborder-top: 1px solid #DDDDDD;\n}\n.footer p {\n\tmargin: 0;\n}\n\n\n.footer-bottom {\n\tbackground: white;\n\tborder-top: 1px solid #DDDDDD;\n\tpadding-top: 10px;\n\tpadding-bottom: 10px;\n  margin-top: -1%;\n  z-index: 100;\n}\n.footer-bottom p.pull-left {\n\tpadding-top: 6px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".background{\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: -1;\n    opacity: 0.9;\n    background-image: url('/assets/shutterstock_417600592.jpg');\n    background-repeat: no-repeat;\n    background-position: 50% 0;\n    -ms-background-size: cover;\n    background-size: cover;\n}\n\n\n\n.panel {\n margin-top: 5%;\n opacity: 0.9;\n border: none;\n\n}\n\n.col-md-4{\n  background-color: none;\n  border: 10px solid rgba(252,252,252,0.8);\n  height: 300px;\n  margin-top: 200px;\n}\n\nbutton {\n  width: 100px;\n  background-color: #193F69;\n  color: white;\n\n}\n\nbutton:hover {\n  background-color: #74C0A9;\n  color: white;\n  border: none;\n}\n\na {\n  color: #74C0A9;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".navbar {\n  opacity: 0.6;\n  width: 100%;\n  height: 65px;\n  border-bottom: 2px solid rgb(178, 220, 154);\n\n}\n\n\n.navbar-brand {\n  font-size: 20px;\n  color: #464775;\n}\n\n\n.navbar-brand img{\n  z-index: 9999;\n  width: 20%;\n  padding: 0;\n  position: relative;\n  margin-top: -12px;\n  margin-left: 20px;\n  opacity: 1;\n}\n\n\n@media (max-width: 520px) {\n  .navbar-brand img {\n    margin-top: -18px;\n  }\n}\n\n@media (max-width: 320px) {\n  .navbar-brand img {\n    margin-top: -25px;\n  }\n}\n\n@media (max-width:414px) {\n  .navbar-brand img {\n    margin-top: -55px;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".image-circle {\n  height: 170px;\n  width: 170px;\n  margin-top: 50px;\n  margin-left: -90px;\n  position: absolute;\n  border-radius: 50%;\n  box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2), 3px 3px 6px rgba(252,252,252,0.7);\n  background-position: center center;\n  z-index: 5;\n}\n\nbutton{\n  margin-top: 15px;\n  /*width: 25%;\n  height: 40px;*/\n  border-radius: 5%;\n  background-color: #82D7C5;\n  border: none;\n  color: white;\n}\n\nbutton:hover {\n  background-color: white;\n  color: #82D7C5;\n  border: none;\n}\n\nspan {\n  font-weight: bold;\n}\n\n\n.container-fluid{\n  background-size: cover;\n  margin-top: -20px;\n  height: 400px;\n  background-image: url(\"/assets/city.jpg\");\n}\n\n\n.col-lg-6 {\n  padding-top: 40px;\n}\n\n.col-xs-12{\n  text-align: center;\n}\n\nth{\n  text-align: center;\n}\n\n#username {\n  margin-top: 280px;\n  /*margin-left: 55px;*/\n  font-size: 23px;\n  color: white;\n  font-family: 'Ubuntu', sans-serif;\n  /*float: left;*/\n}\n\n#userDescription {\n  font-size: 18px;\nfont-family: 'Ubuntu', sans-serif;\ncolor: lightgray;\n}\n\n#user-name-profile{\ntext-transform: uppercase;\n}\n\n\n\n.tabset {\n  margin-top: -40px;\n  float: right;\n}\n\n.details {\n  margin-top: 30px;\n}\n\n\n\n.bookings {\n  margin-top: 20px;\n}\n\n\n.bookings li {\n  margin-bottom: 20px;\n\n}\n\n\n.review {\n  margin-top: 20px;\n}\n\n.links {\n  color: #464775;\n}\n\n\n\n.tab-body{\n  background-color: white;\n      width: 100%;\n      table-layout: fixed;\n}\n\n\n.color {\n  color: black;\n}\n\n\n.details {\n  margin-top: 30px;\n}\n\n\n.itinerary-link {\n  margin-top: 30px;\n}\n\n\n.button {\n  width: 100%;\n}\n\n\n.panel {\n  border: none;\n  width: 50%;\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".request-container {\n  /*text-align: center;\nposit  /*display: flex;\n  align-items: center;\n  justify-content: center;*/\n  position: relative;\n  text-align: center;\n}\n\n.request-view {\n  background:#193F69;\n  border-radius: 5%;\n  position:absolute;\n  width: 600px;\n  height: 500px;\n  color:#fff;\n  margin-top: 20%;\n  left:50%;\n  padding:15px;\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n}\n\n.request-button {\n  margin-top: 60px;\n}\n\n.req-but {\n  width: 25%;\n  height: 40px;\n  border-radius: 5%;\n  background-color: white;\n  border: none;\n  color: #193F69;\n}\n\n.req-but:hover {\n  background-color: #82D7C5;\n  color: white;\n  border: none;\n}\n\n.create-form {\n  position:absolute;\n  margin-top: 550px;\n  left: 25%;\n}\n\n#fill-form {\n  margin-top: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "img{\n  width: 45%;\n  height:auto;\n  margin-left: 32%;\n}\n\np{\n  margin-left: 5%;\n  text-align: center;\n}\n\nspan{\n  font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".background{\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: -1;\n    opacity: 0.9;\n    background-image: url('/assets/shutterstock_493108981.jpg');\n    background-repeat: no-repeat;\n    background-position: 50% 0;\n    -ms-background-size: cover;\n    background-size: cover;\n}\n\n\n\n.panel {\n margin-top: 5%;\n opacity: 0.9;\n border: none;\n padding: 5px;\n\n}\n\n.col-md-4{\n  background-color: none;\n  border: 10px solid rgba(252,252,252,0.8);\n  height: 480px;\n  margin-top: 100px;\n\n}\n\nbutton {\n  width: 100px;\n  background-color: #193F69;\n  color: white;\n\n}\n\nbutton:hover {\n  background-color: #74C0A9;\n  color: white;\n  border: none;\n}\n\na {\n  color: #74C0A9;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".userlist-search{\n  margin-left: 30px;\n}\n\ninput[type=text] {\n    background-color: white;\n    background-image: url('http://www.freeiconspng.com/uploads/search-icon-png-2.png');\n    background-size: 15px;\n    background-position: 15px 5px;\n    background-repeat: no-repeat;\n    border-top: none;\n    border-left: none;\n    border-right: none;\n    border-bottom: 2px solid gray;\n    padding-left: 40px;\n}\n\n#grad {\n  background: rgba(0,42,89,0.9); /* fallback for old browsers */\n  background: -webkit-linear-gradient(to left, rgba(0,42,89,0.9)); /* Chrome 10-25, Safari 5.1-6 */\n  background: -webkit-linear-gradient(right, rgba(0,42,89,0.9));\n  background: linear-gradient(to left, rgba(0,42,89,0.9)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  background-size: cover;\n  /*border: 2px solid rgba(0,56,119,0.5)*/\n  height: 295px;\n}\n\n\n.card {\n  overflow: hidden;\n  position: relative;\n  /*border: 1px solid #CCC;*/\n  border-radius: 10px;\n  text-align: center;\n  padding: 0;\n  background-color: white;\n  color: rgb(136, 172, 217);\n  height: 400px;\n  margin-left: -5px;\n  margin-top: 20px;\n  box-shadow: -4px 4px 0px 2px rgba(209,209,209,0.37);\n}\n\n.card .header-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 20px;\n  border-bottom: 1px #FFF solid;\n  z-index: 1;\n}\n\n\n\nbutton{\n  background-color: white;\n  width: 50%;\n  height: 40px;\n  color: #0a407d;\n  border-radius: 35px;\n  margin-top: -370px;\n  z-index: 999999;\n  /*margin-bottom: -10px;*/\n  border: none;\n  box-shadow: -2px 7px 5px 4px rgba(0,56,119,0.5);\n}\n\n.card .avatar {\n  position: relative;;\n  margin-top: -295px;\n  /*margin-bottom: 20px;*/\n  z-index: 100;\n}\n\n.card .avatar img {\n  overflow: hidden;\n  width: 100%;\n  height: auto;\n  min-height: 200px;\n  max-height: 200px;\n  background: cover;\n  /*-webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;*/\n  /*border: 5px solid rgba(252,252,252,0.8);*/\n}\n\n.content{\n  /*margin-top: 50px;*/\n  /*color: white;*/\n}\n\n#name{\n  color: white;\n  margin-top: 20px;\n  font-size: 18px;\n}\n\np{\n  color: #004593;\n  margin-top: 100px;\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 394,
	"./af.js": 394,
	"./ar": 400,
	"./ar-dz": 395,
	"./ar-dz.js": 395,
	"./ar-ly": 396,
	"./ar-ly.js": 396,
	"./ar-ma": 397,
	"./ar-ma.js": 397,
	"./ar-sa": 398,
	"./ar-sa.js": 398,
	"./ar-tn": 399,
	"./ar-tn.js": 399,
	"./ar.js": 400,
	"./az": 401,
	"./az.js": 401,
	"./be": 402,
	"./be.js": 402,
	"./bg": 403,
	"./bg.js": 403,
	"./bn": 404,
	"./bn.js": 404,
	"./bo": 405,
	"./bo.js": 405,
	"./br": 406,
	"./br.js": 406,
	"./bs": 407,
	"./bs.js": 407,
	"./ca": 408,
	"./ca.js": 408,
	"./cs": 409,
	"./cs.js": 409,
	"./cv": 410,
	"./cv.js": 410,
	"./cy": 411,
	"./cy.js": 411,
	"./da": 412,
	"./da.js": 412,
	"./de": 414,
	"./de-at": 413,
	"./de-at.js": 413,
	"./de.js": 414,
	"./dv": 415,
	"./dv.js": 415,
	"./el": 416,
	"./el.js": 416,
	"./en-au": 417,
	"./en-au.js": 417,
	"./en-ca": 418,
	"./en-ca.js": 418,
	"./en-gb": 419,
	"./en-gb.js": 419,
	"./en-ie": 420,
	"./en-ie.js": 420,
	"./en-nz": 421,
	"./en-nz.js": 421,
	"./eo": 422,
	"./eo.js": 422,
	"./es": 424,
	"./es-do": 423,
	"./es-do.js": 423,
	"./es.js": 424,
	"./et": 425,
	"./et.js": 425,
	"./eu": 426,
	"./eu.js": 426,
	"./fa": 427,
	"./fa.js": 427,
	"./fi": 428,
	"./fi.js": 428,
	"./fo": 429,
	"./fo.js": 429,
	"./fr": 432,
	"./fr-ca": 430,
	"./fr-ca.js": 430,
	"./fr-ch": 431,
	"./fr-ch.js": 431,
	"./fr.js": 432,
	"./fy": 433,
	"./fy.js": 433,
	"./gd": 434,
	"./gd.js": 434,
	"./gl": 435,
	"./gl.js": 435,
	"./he": 436,
	"./he.js": 436,
	"./hi": 437,
	"./hi.js": 437,
	"./hr": 438,
	"./hr.js": 438,
	"./hu": 439,
	"./hu.js": 439,
	"./hy-am": 440,
	"./hy-am.js": 440,
	"./id": 441,
	"./id.js": 441,
	"./is": 442,
	"./is.js": 442,
	"./it": 443,
	"./it.js": 443,
	"./ja": 444,
	"./ja.js": 444,
	"./jv": 445,
	"./jv.js": 445,
	"./ka": 446,
	"./ka.js": 446,
	"./kk": 447,
	"./kk.js": 447,
	"./km": 448,
	"./km.js": 448,
	"./ko": 449,
	"./ko.js": 449,
	"./ky": 450,
	"./ky.js": 450,
	"./lb": 451,
	"./lb.js": 451,
	"./lo": 452,
	"./lo.js": 452,
	"./lt": 453,
	"./lt.js": 453,
	"./lv": 454,
	"./lv.js": 454,
	"./me": 455,
	"./me.js": 455,
	"./mi": 456,
	"./mi.js": 456,
	"./mk": 457,
	"./mk.js": 457,
	"./ml": 458,
	"./ml.js": 458,
	"./mr": 459,
	"./mr.js": 459,
	"./ms": 461,
	"./ms-my": 460,
	"./ms-my.js": 460,
	"./ms.js": 461,
	"./my": 462,
	"./my.js": 462,
	"./nb": 463,
	"./nb.js": 463,
	"./ne": 464,
	"./ne.js": 464,
	"./nl": 466,
	"./nl-be": 465,
	"./nl-be.js": 465,
	"./nl.js": 466,
	"./nn": 467,
	"./nn.js": 467,
	"./pa-in": 468,
	"./pa-in.js": 468,
	"./pl": 469,
	"./pl.js": 469,
	"./pt": 471,
	"./pt-br": 470,
	"./pt-br.js": 470,
	"./pt.js": 471,
	"./ro": 472,
	"./ro.js": 472,
	"./ru": 473,
	"./ru.js": 473,
	"./se": 474,
	"./se.js": 474,
	"./si": 475,
	"./si.js": 475,
	"./sk": 476,
	"./sk.js": 476,
	"./sl": 477,
	"./sl.js": 477,
	"./sq": 478,
	"./sq.js": 478,
	"./sr": 480,
	"./sr-cyrl": 479,
	"./sr-cyrl.js": 479,
	"./sr.js": 480,
	"./ss": 481,
	"./ss.js": 481,
	"./sv": 482,
	"./sv.js": 482,
	"./sw": 483,
	"./sw.js": 483,
	"./ta": 484,
	"./ta.js": 484,
	"./te": 485,
	"./te.js": 485,
	"./tet": 486,
	"./tet.js": 486,
	"./th": 487,
	"./th.js": 487,
	"./tl-ph": 488,
	"./tl-ph.js": 488,
	"./tlh": 489,
	"./tlh.js": 489,
	"./tr": 490,
	"./tr.js": 490,
	"./tzl": 491,
	"./tzl.js": 491,
	"./tzm": 493,
	"./tzm-latn": 492,
	"./tzm-latn.js": 492,
	"./tzm.js": 493,
	"./uk": 494,
	"./uk.js": 494,
	"./uz": 495,
	"./uz.js": 495,
	"./vi": 496,
	"./vi.js": 496,
	"./x-pseudo": 497,
	"./x-pseudo.js": 497,
	"./yo": 498,
	"./yo.js": 498,
	"./zh-cn": 499,
	"./zh-cn.js": 499,
	"./zh-hk": 500,
	"./zh-hk.js": 500,
	"./zh-tw": 501,
	"./zh-tw.js": 501
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 792;


/***/ }),

/***/ 819:
/***/ (function(module, exports) {

module.exports = "<!-- traveler :{{ traveler}}\nrequest: {{request}} -->\n\n<form>\n  <div class=\"form-group\">\n    <label for=\"Inputday\">Day</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"e.g. Day 1\" [(ngModel)]=\"newAgenda.day\" name=\"day\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"Inputcity\">City</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"City\" [(ngModel)]=\"newAgenda.city\" name=\"city\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputBreakfast\">Breakfast Options</label>\n    <input type=\"text\" class=\"form-control\"  placeholder=\"Breakfast 1\" [(ngModel)]=\"newAgenda.breakfast1\" name=\"breakfast\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Breakfast 2\" [(ngModel)]=\"newAgenda.breakfast2\" name=\"breakfast\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Breakfast 3\" [(ngModel)]=\"newAgenda.breakfast3\" name=\"breakfast\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputLunch\">Lunch Options</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Lunch 1\" [(ngModel)]=\"newAgenda.lunch1\" name=\"lunch1\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Lunch 2\" [(ngModel)]=\"newAgenda.lunch2\" name=\"lunch2\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Lunch 3\" [(ngModel)]=\"newAgenda.lunch3\" name=\"lunch3\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputDinner\">Dinner Options</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Dinner 1\" [(ngModel)]=\"newAgenda.dinner1\" name=\"dinner1\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Dinner 2\" [(ngModel)]=\"newAgenda.dinner2\" name=\"dinner2\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Dinner 3\" [(ngModel)]=\"newAgenda.dinner3\" name=\"dinner3\">\n  </div>\n\n\n\n  <div class=\"form-group\">\n    <label for=\"InputMorningActivity\">Morning Activity Options</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Morning Activity 1\" [(ngModel)]=\"newAgenda.morningActivity1\" name=\"MorningActivity1\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Morning Activity 2\" [(ngModel)]=\"newAgenda.morningActivity2\" name=\"MorningActivity2\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Morning Activity 3\" [(ngModel)]=\"newAgenda.morningActivity3\" name=\"MorningActivity3\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputAfternoonActivity\">Afternoon Activity Options</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Afternoon Activity 1\" [(ngModel)]=\"newAgenda.afternoonActivity1\" name=\"AfternoonActivity1\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Afternoon Activity 2\" [(ngModel)]=\"newAgenda.afternoonActivity2\" name=\"AfternoonActivity2\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Afternoon Activity 3\" [(ngModel)]=\"newAgenda.afternoonActivity3\" name=\"AfternoonActivity3\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputEveningActivity\">Evening Activity Options</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Evening Activity 1\" [(ngModel)]=\"newAgenda.eveningActivity1\" name=\"EveningActivity1\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Evening Activity 2\" [(ngModel)]=\"newAgenda.eveningActivity2\" name=\"EveningActivity2\">\n    <input type=\"text\" class=\"form-control\" placeholder=\"Evening Activity 3\" [(ngModel)]=\"newAgenda.eveningActivity3\" name=\"eveningActivity3\">\n  </div>\n\n <div class=\"form-group\">\n    <input type=\"text\" type=\"hidden\" class=\"form-control\" id=\"request\" #myInput name=\"request\" value=\"{{ request }}\">\n  </div>\n\n\n  <div class=\"form-group\">\n     <input type=\"hidden\" class=\"form-control\" id=\"user\" #userInput value=\"{{ traveler}}\">\n   </div>\n\n  <!-- <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"makeAgenda(myInput.value, userInput.value)\">Send</button> -->\n  <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"makeAgenda(myInput.value, userInput.value)\">Send</button>\n</form>\n\n<hr>\n"

/***/ }),

/***/ 820:
/***/ (function(module, exports) {

module.exports = "<div class=\"agenda-view\">\n\n<div class=\"agenda\">\n<h1>{{agenda.city}}: Day {{agenda.day}}</h1>\n\n<div class=\"dining\">\n  <div>\n    <h3>Breakfast Options:</h3>\n    <p class=\"option\">{{agenda.breakfast1}}</p>\n    <p class=\"option\">{{agenda.breakfast2}}</p>\n    <p class=\"option\">{{agenda.breakfast3}}</p>\n  </div>\n\n  <div>\n    <h3>Lunch Options:</h3>\n    <p class=\"option\">{{agenda.lunch1}}</p>\n    <p class=\"option\">{{agenda.lunch2}}</p>\n    <p class=\"option\">{{agenda.lunch3}}</p>\n  </div>\n\n  <div>\n    <h3>Dinner Options:</h3>\n    <p class=\"option\">{{agenda.dinner1}}</p>\n    <p class=\"option\">{{agenda.dinner2}}</p>\n    <p class=\"option\">{{agenda.dinner3}}</p>\n  </div>\n</div>\n\n<div class=\"activity\">\n\n  <div>\n    <h3>Morning Activity Options:</h3>\n    <p class=\"option\">{{agenda.morningActivity1}}</p>\n    <p class=\"option\">{{agenda.morningActivity2}}</p>\n    <p class=\"option\">{{agenda.morningActivity3}}</p>\n  </div>\n\n  <div>\n    <h3>Afternoon Activity Options:</h3>\n    <p class=\"option\">{{agenda.afternoonActivity1}}</p>\n    <p class=\"option\">{{agenda.afternoonActivity2}}</p>\n    <p class=\"option\">{{agenda.afternoonActivity3}}</p>\n  </div>\n\n  <div>\n    <h3>Evening Activity Options:</h3>\n    <p class=\"option\">{{agenda.eveningActivity1}}</p>\n    <p class=\"option\">{{agenda.eveningActivity2}}</p>\n    <p class=\"option\">{{agenda.eveningActivity3}}</p>\n  </div>\n\n</div>\n\n<button class=\"btn btn-default btn-primary\" (click)=\"removeAgenda()\"> Delete </button>\n\n</div>\n</div>\n"

/***/ }),

/***/ 821:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"row\">\n\t<div class=\"container-fluid\">\n\t\t<router-outlet></router-outlet>\n\n\t</div>\n</div>\n"

/***/ }),

/***/ 822:
/***/ (function(module, exports) {

module.exports = "\n\n<form>\n  <div class=\"form-group\">\n   <label for=\"image\">Image</label>\n   <input type=\"file\" class=\"form-control\" name=\"image\" ng2FileSelect [uploader]=\"uploader\">\n  </div>\n\n\n  <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"addAvatar()\">Add new avatar</button>\n\n</form>\n"

/***/ }),

/***/ 823:
/***/ (function(module, exports) {

module.exports = "\n   <div class= \"col-xs-12\" >\n\n     <div (collapsed)=\"collapsed($event)\"\n                         [collapse]=\"isCollapsed\"\n                          (expanded)=\"expanded($event)\" class=\"form\">\n\n     <input id=\"numberDays\" #box (keyup.enter)=\"onEnter(box.value)\" placeholder=\"For how many days? Press enter\">\n\n  <div *ngFor=\"let item of onEnter(value)\">\n    <app-agenda-form [quote]=\"currentUser\" [traveler]=\"traveler\" [request]=\"request\"></app-agenda-form>\n  </div>\n\n</div>\n<button type=\"submit\" class=\"btn btn-default btn-primary\" [routerLink]=\"['/users', currentUser._id]\">Finish</button>\n\n</div>\n"

/***/ }),

/***/ 824:
/***/ (function(module, exports) {

module.exports = "<h4>Add details on your expertise:</h4>\n<form>\n  <div class=\"form-group\">\n    <label for=\"InputAge\">Age</label>\n    <input type=\"text\" class=\"form-control\" id=\"InputAge\" placeholder=\"Age\" [(ngModel)]=\"editUser.age\" name=\"age\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputInterests\">Interests</label>\n    <input type=\"text\" class=\"form-control\" id=\"InputInterests\" placeholder=\"Interests\" [(ngModel)]=\"editUser.interests\" name=\"interests\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputDescription\">Description</label>\n    <input type=\"text\" class=\"form-control\" id=\"InputDescription\" placeholder=\"Description\" [(ngModel)]=\"editUser.description\" name=\"description\">\n  </div>\n  <div *ngIf=\"currentUser.role === 'EXPERT'\" class=\"form-group\">\n    <label for=\"InputCity\">Cities you are an expert on</label>\n    <input type=\"text\" class=\"form-control\" id=\"InputCity\" placeholder=\"City\" [(ngModel)]=\"editUser.city\" name=\"city\" >\n  </div>\n  <div class=\"form-group\">\n    <label for=\"InputLanguages\">Languages</label>\n    <input type=\"text\" class=\"form-control\" id=\"InputLanguages\" placeholder=\"Language\" [(ngModel)]=\"editUser.languages\" name=\"languages\">\n  </div>\n  <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"save()\">Update your profile</button>\n</form>\n"

/***/ }),

/***/ 825:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n        <div class=\"col-xs-6 col-xs-offset-3\" class=\"box\">\n              <div class=\"row\">\n           <div class=\"card\" >\n           <div class=\"row\" class=\"details\">\n             <div class=\"col-xs-8 col-xs-offset-3\">\n                 <div class=\"avatar\">\n                     <img src=\"{{user.image}}\"  />\n                 </div>\n                <p><span>Name:&nbsp;&nbsp;</span> {{ user.name }}</p>\n                <p> <span>Age:&nbsp;&nbsp;</span> {{ user.age }}</p>\n                <p><span>Interests:&nbsp;&nbsp;</span> {{ user.interests }}</p>\n                <p><span>Languages:&nbsp;&nbsp;</span> {{ user.languages }}</p>\n                <p><span>Expertise location:&nbsp;&nbsp;</span>{{user.city }}</p>\n                <hr>\n                <p><span></span><em>\"{{user.description }}\"</em></p>\n            </div>\n           </div>\n          </div>\n        </div>\n    </div>\n\n       <div class=\"col-xs-7 col-xs-offset-2\">\n          <div *ngIf=\"!isAuth\">\n            <p><button [routerLink]=\"['/login']\">Log in to request agenda</button></p>\n          </div>\n          <div *ngIf=\"isAuth\">\n            <p><button type=\"button\" class=\"btn btn-default\" (click)=\"isCollapsed = !isCollapsed\">Ask {{ user.name }} to Plan your Trip</button></p>\n          </div>\n      <!-- <div *ngIf=\"currentUser === 'EXPERT'\">\n        <p><button [routerLink]=\"['/signup']\">Sign up as a traveler to request!</button></p>\n      </div> -->\n\n      </div>\n\n\n\n            <!-- <button class=\"btn btn-success\" (click)=\"isCollapsed = !isCollapsed\">Ask {{ user.name }} to Plan your Trip</button> -->\n             <!-- <button id=\"expertList\" class=\"btn btn-success\" (click)=\"goToRequest()\"><a style=\"text-decoration:none; color:white;\"> Contact {{ user.name }}</a></button> -->\n\n<!-- <p id=\"seperate-line\">_______________________________________________________________________________________</p> -->\n\n<div class=\"request-form\" (collapsed)=\"collapsed($event)\"\n    [collapse]=\"isCollapsed\"\n     (expanded)=\"expanded($event)\">\n  <!-- <p>Traveler Name {{traveler.name}}</p>\n  <p>Expert Name {{user.name}}</p> -->\n<div class=\"col-xs-6 col-xs-offset-3\">\n    <form>\n      <div class=\"form-group\">\n        <label for=\"InputName\">Name:</label>\n        <input type=\"text\" class=\"form-control\" id=\"InputName\" placeholder=\"Name\" [(ngModel)]=\"newRequest.name\" name=\"name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputStartDate\">Start Date:</label>\n        <input type=\"date\" class=\"form-control\" id=\"InputStartDate\" placeholder=\"From\" [(ngModel)]=\"newRequest.startDate\" name=\"startDate\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputEndDate\">End Date:</label>\n        <input type=\"date\" class=\"form-control\" id=\"InputEndDate\" placeholder=\"To\" [(ngModel)]=\"newRequest.endDate\"  name=\"endDate\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputCity\">Where are you travelling?</label>\n        <input type=\"text\" class=\"form-control\" id=\"InputCity\" placeholder=\"city\" [(ngModel)]=\"newRequest.city\" name=\"city\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputWhoIsTravelling\">Who are you travelling with?</label>\n        <input type=\"text\" class=\"form-control\" id=\"InputWhoIsTravelling\" placeholder=\"Friends, Couple, Solo, etc.\" [(ngModel)]=\"newRequest.whoIsTravelling\" name=\"whoIsTravelling\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputMainInterests\">What are your main interests:</label>\n        <input type=\"text\" class=\"form-control\" id=\"InputMainInterests\" placeholder=\"Nightlife, Cultural, Food, etc.\" [(ngModel)]=\"newRequest.mainInterests\" name=\"mainInterests\" >\n      </div>\n      <div class=\"form-group\">\n        <label for=\"InputMustKnows\">Anything the expert MUST know about you:</label>\n        <input type=\"text\" class=\"form-control\" id=\"InputMustKnows\" placeholder=\"Vegetarian, wheel chair accessibility, etc.\" [(ngModel)]=\"newRequest.mustKnows\" name=\"mustKnows\">\n      </div>\n      <div class=\"form-group\">\n\n\n        <input type=\"hidden\" class=\"form-control\" id=\"expert\"  [(ngModel)]=\"user._id\" name=\"expert\">\n      </div>\n\n\n      <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"booking(request)\">Send the Request</button>\n    </form>\n  </div>\n</div>\n\n\n</div>\n"

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

module.exports = "<!--Video Section-->\n\n<div class=\"container\">\n     <div class=\"row\">\n       <div class=\"col-lg-12\">\n         <video class=\"video1\" poster=\"../assets/10964174.mp4\" id=\"bgvid\" playsinline autoplay muted loop>\n          <source src=\"../assets/10964174.mp4\" type=\"video/mp4\">\n         </video>\n    </div>\n     </div>\n\n<!--Video Section Ends Here-->\n<div class=\"jumbotron banner\">\n      <div class=\"row\">\n        <div class=\"col-md-5 title\">\n        <h1>\n          Have a trip that lasts\n        </h1>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12 center-form\">\n          <div class=\"form-group form-inline\"><br><br>\n            <h2>Where are you going?</h2>\n            <label for=\"cityInput\">Where: </label>\n\n             <input id=\"cityInput\" type=\"text\" class=\"form-control input-lg-custom\" placeholder=\"Destination City\" name=\"cityInput\" [(ngModel)]=\"city\" >\n\n            <!-- <input id=\"from\" type=\"date\" class=\"form-control\" placeholder=\"from\" name=\"from\">\n            <label for=\"dateInput\">To: </label>\n            <input id=\"to\" type=\"date\" class=\"form-control\" placeholder=\"to\" name=\"to\"> -->\n            <button id=\"search-button\"(click)=\"goToSearch()\"> Find an expert!</button><br><br>\n\n          </div>\n        </div>\n      </div>\n\n  </div>\n\n\n</div>\n\n<div class=\"row\" class=\"info\"><br>\n   <div class=\"col-md-12\">\n     <h2 class=\"text-center\">HOW DOES IT WORK?</h2>\n   </div>\n\n<br>\n<br>\n\n<div class=\"content-fluid\">\n <div class=\"row\">\n   <div class=\"col-xs-2\"></div>\n   <div class=\"col-xs-8\">\n       <div class=\"row\">\n         <div class=\"col-md-4\">\n\n           <h4 class=\"text-center\">Search </h4>\n\n           <p class=\"text-justify\">experts in your destination and choose the one that you believe shares the same interests and meets the expectations of your journey.</p>\n         </div>\n         <div class=\"col-md-4\">\n           <h4 class=\"text-center\" >Request</h4>\n\n             <p class=\"text-justify\"> a local expert to plan your trip by specifying your journey purpose, dates and anything you find essential for the expert to know so he can create the best agenda for you</p>\n         </div>\n         <div class=\"col-md-4\">\n\n           <h4 class=\"text-center\">Enjoy your trip!</h4>\n\n           <p class=\"text-justify\"> Your expert will handcraft your unique travel itinerary and for each day you will receive 3 breakfast, lunch and dinner options as well as 3 morning afternoon and evening activities. </p>\n         </div>\n       </div>\n   </div>\n\n </div>\n</div>\n</div>\n\n<div class=\"container-fluid\">\n <div class=\"row\" >\n\n     <div class=\"video-container\">\n       <video autoplay loop=\"true\" width=\"1280\" height=\"720\">\n         <source type=\"video/mp4\" src=\"../assets/shutterstock_v5785796.mp4\">\n       </video>\n       <div class=\"col-lg-8\">\n         <div class=\"becomeExpert\">\n           </div>\n             <button type=\"submit\" class=\"expert\" [routerLink]=\"['/signup']\">Want to become an expert?</button>\n           </div>\n   </div>\n </div>\n</div>\n\n<footer>\n   <!--/.footer-->\n\n   <div class=\"footer-bottom\">\n       <div class=\"container\">\n           <p class=\"pull-left\"> Copyright © TraWell 2017. All right reserved. </p>\n           \n       </div>\n   </div>\n   <!--/.footer-bottom-->\n</footer>\n"

/***/ }),

/***/ 827:
/***/ (function(module, exports) {

module.exports = "<div class = \"background\">\n<div class=\"col-md-4 col-md-offset-4\">\n\t<div class=\"panel panel-default\">\n\t  <div class=\"panel-body\">\n\t    <form>\n\t      <div class=\"form-group\">\n\t        <label for=\"InputUsername\">Username</label>\n\t        <input type=\"email\" class=\"form-control\" id=\"InputUsername\" placeholder=\"username\" [(ngModel)]=\"user.username\" name=\"username\">\n\t      </div>\n\t      <div class=\"form-group\">\n\t        <label for=\"InputPassword\">Password</label>\n\t        <input type=\"password\" class=\"form-control\" id=\"InputPassword\" placeholder=\"Password\" [(ngModel)]=\"user.password\" name=\"password\">\n\t      </div>\n\t      <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"login()\">Login</button>\n\t\t\t\t<p class=\"error\"> {{ error }} </p>\n\t\t\t\t<p>Don't have an account? <a [routerLink]=\"['/signup']\"> Sign Up</a></p>\n\t    </form>\n\t  </div>\n\t</div>\n</div>\n</div>\n"

/***/ }),

/***/ 828:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default \">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['/']\">\n        <img class = \"logo\" alt=\"Brand\" src=\"../assets/Trawell.png\">\n      </a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav navbar-right\">\n\n        <li *ngIf=\"!isAuth\"><a [routerLink]=\"['login']\">Login</a></li>\n        <!-- <li *ngIf=\"isAuth\">Signed in as {{user.name}}</li> -->\n        <li *ngIf=\"isAuth\"><a (click)=\"logout()\">Logout</a></li>\n        <li *ngIf=\"isAuth\"><a [routerLink]=\"['/users', user._id]\">Your profile</a></li>\n        <li *ngIf=\"!isAuth\"><a [routerLink]=\"['signup']\">Signup</a></li>\n\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container -->\n</nav>\n"

/***/ }),

/***/ 829:
/***/ (function(module, exports) {

module.exports = "<div class=\"profile-page\" *ngIf=\"currentUser.role === 'EXPERT'\">\n  <div class=\"container-fluid\">\n  <div class=\"col-xs-12 \">\n    <img class=\"image-circle\" src=\"{{currentUser.image}}\" />\n      <p id=\"username\">{{ currentUser.name}}</p>\n      <p id=\"userDescription\">{{ currentUser.description}}</p>\n    </div>\n  </div>\n\n\n<div class=\"container\">\n  <div class=\"row\">\n<div class=\"col-lg-6\" class = \"tab-body\">\n  <tabset class=\"tabset\" [justified]=\"true\">\n    <tab class=\"color\" heading=\"About\">\n      <div class=\"col-xs-4 \">\n      <div class=\"details\">\n          <p><span>Age:</span> {{ currentUser.age}}</p>\n          <p><span>Interests: </span>{{ currentUser.interests}}</p>\n          <p><span>City: </span>{{ currentUser.city}}</p>\n          <p><span>Languages:</span> {{ currentUser.languages}}</p>\n\n          <div class=\"links\">\n            <p><button [routerLink]=\"['avatar']\">Add your Profile Picture</button></p>\n            <p><button [routerLink]=\"['edit']\">Add your details</button></p>\n          </div>\n      </div>\n      </div>\n    </tab>\n\n    <tab class=\"color\" heading=\"Bookings\">\n      <div class=\"col-xs-4 col-xs-offset-4\">\n      <div class=\"bookings\" *ngIf=\"currentUser.bookings.length\">\n\n              <ul>\n                  <li *ngFor=\"let booking of currentUser.bookings\"> <a [routerLink]=\"['/request', booking._id]\">{{booking.city}}</a></li>\n              </ul>\n              <br>\n        </div>\n      </div>\n\n    </tab>\n\n\n    <tab heading=\"Reviews\">\n    <div class=\"col-xs-8 col-xs-offset-8\">\n      <p class=\"review\">Reviews</p>\n    </div>\n    </tab>\n\n\n  </tabset>\n</div>\n</div>\n</div>\n</div>\n\n\n\n<div class=\"profile-page\" *ngIf=\"currentUser.role === 'TRAVELER'\">\n  <div class=\"container-fluid\">\n    <button [routerLink]=\"['/']\">Going somewhere? Get your custom journey schedule!</button>\n  <div class=\"col-xs-12 \">\n    <img class=\"image-circle\" src=\"{{currentUser.image}}\" />\n      <p id=\"username\">{{ currentUser.name}}</p>\n    </div>\n  </div>\n\n\n<div class=\"container\">\n  <div class=\"row\">\n  <tabset class=\"tabset\" [justified]=\"true\">\n    <tab heading=\"About\">\n       <div class=\"details\">\n         <p>Age: {{ currentUser.age}}</p>\n          <p>Interests: {{ currentUser.interests}}</p>\n          <p>Description: {{ currentUser.description}}</p>\n          <p>Languages: {{ currentUser.languages}}</p>\n\n          <div class=\"links\">\n              <p><button [routerLink]=\"['avatar']\">Add your Profile Picture</button></p>\n              <p><button [routerLink]=\"['edit']\">Add your details</button></p>\n             <p><button [routerLink]=\"['/']\">Going somewhere? Get your custom journey schedule!</button></p>\n          </div>\n\n      </div>\n    </tab>\n    <tab heading=\"Bookings\">\n        <br>\n      <div class=\"col-xs-12 col-xs-offset-3 \">\n        <div class=\"panel panel-default\">\n      <div class=\"panel-body\">\n        <div class=\"table-responsive\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>Destination City</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n              </tr>\n            </thead>\n            <tbody *ngIf=\"currentUser.bookings.length\">\n              <tr *ngFor=\"let booking of currentUser.bookings\">\n                <td > {{ booking.city&nbsp;}}</td>\n                <td >{{ booking.startDate | date:\"yMMMMEEEEd\" &nbsp;}}</td>\n                <td >{{ booking.endDate | date:\"yMMMMEEEEd\" &nbsp;}}</td>\n              </tr>\n             </tbody>\n           </table>\n         </div>\n        </div>\n      </div>\n      </div>\n    </tab>\n\n    <tab heading=\"Agendas\">\n      <div class=\"col-xs-12 col-xs-offset-6 \">\n        <div class=\"panel panel-default\">\n      <div class=\"panel-body\">\n        <div class=\"table-responsive\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>Destination City</th>\n                <th>Day</th>\n              </tr>\n            </thead>\n            <tbody *ngIf=\"currentUser.agendas.length\">\n              <tr *ngFor=\"let agenda of currentUser.agendas\">\n                <td ><a [routerLink]=\"['/agenda', agenda._id]\">{{agenda.city&nbsp;}}</a> </td>\n                <td >{{ agenda.day&nbsp;}}</td>\n              </tr>\n             </tbody>\n           </table>\n         </div>\n      </div>\n      <!-- <div *ngIf=\"currentUser.agendas.length\">\n        <ul>\n          <li *ngFor=\"let agenda of currentUser.agendas\"><a [routerLink]=\"['/']\" >{{agenda.city&nbsp;}} Day: {{ agenda.day&nbsp;}}</a> </li>\n        </ul>\n      </div>-->\n    </div>\n</div>\n    </tab>\n\n  </tabset>\n</div>\n</div>\n</div>\n"

/***/ }),

/***/ 830:
/***/ (function(module, exports) {

module.exports = "<div class=\"request-container\">\n<div class=\"request-view\">\n<h3>Request by {{request.name}}</h3>\n\n<p>From: {{request.startDate | date:\"yMMMMEEEEd\" }}</p>\n<p>To: {{request.endDate | date:\"yMMMMEEEEd\" }}</p>\n<p>Destination: {{request.city}}</p>\n<p>Who: {{request.whoIsTravelling}}</p>\n<p>Interested in: {{request.mainInterests}}</p>\n<p>Additional info: {{request.mustKnows}}</p>\n\n<div class=\"request-button\">\n<button class=\"req-but\" (click)=\"removeRequest()\"> Delete </button>\n<!-- <button class=\"btn btn-success\"  [routerLink]=\"['create']\">Plan Trip</button> -->\n<button class=\"req-but\" (click)=\"showComponent()\">Plan Trip</button>\n</div>\n\n<p id=\"fill-form\" *ngIf=\"show\">Fill form below</p>\n\n</div>\n\n\n<div class=\"create-form\" *ngIf=\"show\">\n  <app-create-agenda></app-create-agenda>\n</div>\n<!-- <router-outlet></router-outlet> -->\n</div>\n"

/***/ }),

/***/ 831:
/***/ (function(module, exports) {

module.exports = "<!-- {{user | json}} -->\n<!-- <div *ngIf=\"user.bookings.length !== 0\">\n        <ul>\n          <li *ngFor=\"let booking of user.bookings\"> {{ booking&nbsp;}} </li>\n        </ul>\n      </div>\n\n{{user.bookings}} -->\n\n<div class=\"col-xs-12 \">\n  <img src=\"../assets/request-confirm.png\">\n<span><p>You will receive your agenda in a couple of days!</p></span> <br>\n<p>View your bookings here:</p>\n<p>|&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]=\"['/users', user._id]\">PROFILE</a>&nbsp;&nbsp;&nbsp;&nbsp;|</p>\n<span><p>Book another memorable experience?</p></span>\n<p>|&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]=\"['/']\">HOME</a>&nbsp;&nbsp;&nbsp;&nbsp;|</p>\n<!-- <p> Start: {{ request.startDate | date:\"yMMMMEEEEd\"}}</p>\n<p> End: {{ request.endDate | date:\"yMMMMEEEEd\"}}</p>\n<p> Who: {{request.whoIsTravelling}}</p>\n<p> Traveler: {{request.traveler}}</p>\n<p> Expert: {{request.expert}}</p>\n<p> Main Interests: {{request.mainInterests}}</p> -->\n</div>\n"

/***/ }),

/***/ 832:
/***/ (function(module, exports) {

module.exports = "\n<div class = \"background\">\n\n<div class=\"col-md-4 col-md-offset-4\">\n\t<div class=\"panel panel-default\">\n\t  <div class=\"panel-body\">\n\t    <form>\n\t      <div class=\"form-group\">\n\t        <label for=\"InputUsername\">Username</label>\n\t        <input type=\"text\" class=\"form-control\" id=\"InputUsername\" placeholder=\"e-mail\" [(ngModel)]=\"newUser.username\" required #name=\"ngModel\" name=\"username\">\n\t\t\t\t\t<div [hidden]=\"name.valid || name.pristine\" class=\"alert alert-danger\"> Username is required </div>\n\t\t\t\t</div>\n\t      <div class=\"form-group\">\n\t        <label for=\"InputPassword\">Password</label>\n\t        <input type=\"password\" class=\"form-control\" id=\"InputPassword\" placeholder=\"Password\" [(ngModel)]=\"newUser.password\" required #password=\"ngModel\" name=\"password\">\n\t\t\t\t\t<div [hidden]=\"password.valid || password.pristine\" class=\"alert alert-danger\"> Password is required </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t        <label for=\"InputName\">Name</label>\n\t        <input type=\"text\" class=\"form-control\" id=\"InputName\" placeholder=\"Name\" [(ngModel)]=\"newUser.name\" name=\"name\">\n\t      </div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"RoleInput\">Please select your role</label>\n\t\t\t\t<select class=\"form-control\" name=\"role\" id=\"role\" [(ngModel)]=\"newUser.role\" required #role=\"ngModel\">\n\t\t\t\t\t<option value=\"EXPERT\">You are an expert of a city </option>\n\t\t\t\t\t<option value=\"TRAVELER\">You want to travel </option>\n\t\t\t\t</select>\n\t\t\t\t</div>\n\t      <button type=\"submit\" class=\"btn btn-default btn-primary\" (click)=\"signup()\">Signup</button>\n\t\t\t\t\t<p class=\"error\"> {{ error }} </p>\n\t\t\t\t<br>\n\t\t\t\t<p>Have an account? <a [routerLink]=\"['/login']\"> Log In</a></p>\n\t    </form>\n\t  </div>\n\t</div>\n</div>\n</div>\n"

/***/ }),

/***/ 833:
/***/ (function(module, exports) {

module.exports = "<!-- col-sm-offset-3 -->\n\n\n  <!-- <div *ngIf=\"users.city !== cityName\">\n    <p>No experts in this location yet! Try a different city!</p>\n  </div> -->\n\n\n\n\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"userlist-search\">\n      <label for=\"InputName\"> </label>\n      <input id=\"InputName\" placeholder=\"Search by interest...\" type=\"text\" [(ngModel)]=\"pattern\">\n    </div>\n  </div>\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-sm-3\" *ngFor=\"let user of users | filter: 'interests': pattern; let i = index\">\n            <div class=\"card\" *ngIf=\"user.role == 'EXPERT'\">\n              <div id=\"grad\"></div>\n                <div class=\"avatar\">\n                    <img src=\"{{user.image}}\" />\n                </div>\n                <div id=\"name\">  <span>{{ user.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{{ user.age }}  </div>\n                <p>\n                   {{ user.interests }}\n                 </p>\n                <p>\n                <button type=\"button\" class=\"btn btn-default\" [routerLink]=\"['/city', user._id]\">View Details</button></p>\n                <div class=\"content\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n"

/***/ })

},[1093]);
//# sourceMappingURL=main.bundle.js.map
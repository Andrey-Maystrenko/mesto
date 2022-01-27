(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a,c,u,s,l){var f,p,d=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),p=function(){var e=d._cardTemplate.querySelector(".element__like");e.classList.toggle("element__like_active"),e.classList.contains("element__like_active")?d.apiPutLike(JSON.stringify({likes:d.card.owner.name}),d.card._id).then((function(e){console.log("лайк отправлен на сервер, мое имя в массиве лайков",e),d._cardTemplate.querySelector(".element__like-amount").textContent=e.likes.length})).catch((function(e){console.log(e)})):d.apiDeleteLike(JSON.stringify({likes:d.card.owner.name}),d.card._id).then((function(e){d._cardTemplate.querySelector(".element__like-amount").textContent=e.likes.length})).catch((function(e){console.log(e)}))},(f="_likeCard")in this?Object.defineProperty(this,f,{value:p,enumerable:!0,configurable:!0,writable:!0}):this[f]=p,this.card=e,this.templateSelector=n,this.handleCardClick=r,this.apiGetUserInfo=o,this.apiPostNewCard=i,this.myName=a,this.apiDeleteCard=c,this.apiPutLike=u,this.apiDeleteLike=s,this.onDeleteClick=l}var n,r;return n=t,(r=[{key:"_createCardDomNode",value:function(){this._cardTemplate=document.querySelector(this.templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"makeCardRemovable",value:function(){var e=this;this._cardTemplate.insertAdjacentHTML("beforeend",'<button class="element__trash" type="button"></button>'),this._cardTemplate.querySelector(".element__trash").addEventListener("click",(function(){return e.onDeleteClick(e.card._id,e._cardTemplate)}))}},{key:"_renderCard",value:function(){var e=this;this._createCardDomNode(),this._cardTemplate.querySelector(".element__mask-group").setAttribute("src",this.card.link),this._cardTemplate.querySelector(".element__mask-group").setAttribute("alt",this.card.name),this._cardTemplate.querySelector(".element__name").textContent=this.card.name,this._cardTemplate.querySelector(".element__like-amount").textContent=this.card.likes.length,this.card.likes.some((function(t){return t.name===e.myName}))&&this._cardTemplate.querySelector(".element__like").classList.add("element__like_active"),this._addEventListeners()}},{key:"renderExistedCard",value:function(){var e=this;return this._renderCard(),this.apiGetUserInfo.then((function(t){e.card.owner._id===t._id&&e.makeCardRemovable()})).catch((function(e){console.log(e)})),this._cardTemplate}},{key:"renderNewCard",value:function(){var e=this;return this._renderCard(),this.apiPostNewCard(JSON.stringify({name:this.card.name,link:this.card.link,likes:[]})).then((function(t){e.card=t})).catch((function(e){console.log(e)})),this._cardTemplate}},{key:"_addEventListeners",value:function(){this._cardTemplate.querySelector(".element__like").addEventListener("click",this._likeCard),this._cardTemplate.querySelector(".element__button-mask-group").addEventListener("click",this.handleCardClick)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(){function e(t,n,o,i,a){var c=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_hideInputError",(function(e){var t=e.getAttribute("name"),n=c.formElement.querySelector("#".concat(t));e.classList.remove(c.config.inputErrorClass),n.classList.remove(c.config.errorClass),n.textContent=""})),r(this,"_showInputError",(function(e){var t=e.getAttribute("name"),n=c.formElement.querySelector("#".concat(t));e.classList.add(c.config.inputErrorClass),n.textContent=e.validationMessage,n.classList.add(c.config.errorClass)})),r(this,"_checkInputValidity",(function(e){e.validity.valid?c._hideInputError(e):c._showInputError(e)})),r(this,"_toggleButtonState",(function(){var e=c.formElement.checkValidity(),t=c.formElement.querySelector(c.config.submitButtonSelector);t.disabled=!e,t.classList.toggle(c.config.inactiveButtonClass,!e)})),r(this,"_setEventListeners",(function(){var e=Array.from(c.formElement.querySelectorAll(c.config.inputSelector));c._toggleButtonState(),e.forEach((function(e){e.addEventListener("input",(function(){c._checkInputValidity(e),c._toggleButtonState()}))}))})),r(this,"enableValidation",(function(){c.formElement.addEventListener("submit",(function(e){e.preventDefault()})),c._setEventListeners()})),this.config=t,this.formElement=n,this.inputFields=o,this.errorTexts=i,this.saveButtons=a}var t,o;return t=e,(o=[{key:"_removeErrorIndication",value:function(){this.inputFields.forEach((function(e){e.classList.remove("form__input_error")}))}},{key:"_deleteErrorMessage",value:function(){this.errorTexts.forEach((function(e){e.textContent=""}))}},{key:"_deactivateSaveButton",value:function(){this.saveButtons.forEach((function(e){e.disabled=!0,e.classList.add("popup__save-button_disabled")})),document.querySelector("#delete").disabled=!1,document.querySelector("#delete").classList.remove("popup__save-button_disabled")}},{key:"resetValidation",value:function(){this._removeErrorIndication(),this._deleteErrorMessage(),this._deactivateSaveButton()}},{key:"eraseInputText",value:function(){this.inputFields.forEach((function(e){e.value=""}))}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.items=r,this.renderer=o,this.elementsSelector=n}var t,n;return t=e,(n=[{key:"renderSection",value:function(){var e=this;this.items.forEach((function(t){var n=e.renderer(t);document.querySelector(e.elementsSelector).append(n)}))}},{key:"addItem",value:function(e){document.querySelector(this.elementsSelector).prepend(e)}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.popupSelector=t,this._handleEscClose=this._handleEscClose.bind(this),this._popup=document.querySelector(this.popupSelector)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function h(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e)).submitForm=t,n._inputs=n._popup.querySelectorAll(".form__input"),n}return t=a,(n=[{key:"getInputValues",value:function(){return Array.from(this._inputs).map((function(e){return e.value}))}},{key:"setEventListeners",value:function(){f(m(a.prototype),"setEventListeners",this).call(this),document.querySelector(this.popupSelector).querySelector(".form").addEventListener("submit",this.submitForm)}},{key:"close",value:function(){f(m(a.prototype),"close",this).call(this),this._inputs.forEach((function(e){e.value=""}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t){var n=t.userNameSelector,r=t.userInfoSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.userNameSelector=n,this.userInfoSelector=r,this.userName=document.querySelector(this.userNameSelector),this.userInfo=document.querySelector(this.userInfoSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this.userName.textContent,info:this.userInfo.textContent}}},{key:"setUserInfo",value:function(e,t){e&&(this.userName.textContent=e,this.userInfo.textContent=t)}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function k(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return S(e)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=C(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function C(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&g(e,t)}(i,e);var t,n,r,o=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(n);if(r){var o=E(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return k(this,e)});function i(e,t,n){var r,a,c,u,s;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),s=function(e){var t=e.target.getAttribute("src");a.imagePopup.setAttribute("src",t);var n=e.currentTarget.parentElement.querySelector(".element__name").textContent;a.imagePopupTitle.textContent=n,a.imagePopup.setAttribute("alt",n),w((r=S(a),E(i.prototype)),"open",r).call(r)},(u="handleCardClick")in(c=S(a=o.call(this,n)))?Object.defineProperty(c,u,{value:s,enumerable:!0,configurable:!0,writable:!0}):c[u]=s,a.imagePopup=e,a.imagePopupTitle=t,a}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(u);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),P(this,"getUserInfo",(function(){return fetch("https://nomoreparties.co/v1/cohort-34/users/me",{headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8"}}).then((function(e){return n._checkResponse(e)}))})),P(this,"getInitialCards",(function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards",{headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8"}}).then((function(e){return n._checkResponse(e)}))})),P(this,"patchAvatar",(function(e){return fetch("https://nomoreparties.co/v1/cohort-34/users/me/avatar",{method:"PATCH",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"},body:e}).then((function(e){return n._checkResponse(e)}))})),P(this,"patchUserInfo",(function(e){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/users/me",{method:"PATCH",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"},body:e}).then((function(e){return n._checkResponse(e)}))})),P(this,"postNewCard",(function(e){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards",{method:"POST",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"},body:e}).then((function(e){return n._checkResponse(e)}))})),P(this,"deleteCard",(function(e){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards/".concat(e),{method:"DELETE",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8"}}).then((function(e){return n._checkResponse(e)}))})),P(this,"putLike",(function(e,t){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards/".concat(t,"/likes"),{method:"PUT",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"},body:e}).then((function(e){return n._checkResponse(e)}))})),P(this,"deleteLike",(function(e,t){return fetch("https://mesto.nomoreparties.co/v1/cohort-34/cards/".concat(t,"/likes "),{method:"DELETE",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"},body:e}).then((function(e){return n._checkResponse(e)}))})),this.options=t}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e,t){e.querySelector(".popup__save-button-text").textContent=t}var q=new O(document.querySelector(".popup__mask-group-full-size"),document.querySelector(".popup__title-mask-group"),".popup_mask-group");q.setEventListeners();var I=new _({userNameSelector:".info__name",userInfoSelector:".info__engagement"}),R=new T({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-34",headers:{authorization:"f6c561df-ef33-43f7-885e-c25f80e98ae8","Content-Type":"application/json"}}),x=document.querySelector(".info__edit-button"),N=document.querySelector(".profile__add-button"),A=document.querySelector(".form_edit-info"),V=document.querySelector(".form_add-element"),D=document.querySelector(".form_edit-avatar"),U=(document.querySelector(".form_delete"),document.querySelectorAll(".popup__save-button")),B=document.querySelectorAll(".form__input"),z=document.querySelectorAll(".popup__error"),F={inputSelector:".form__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"form__input_error",errorClass:"popup__error_visible"},J=".template",M=document.querySelector(".avatar");R.getUserInfo().then((function(e){I.setUserInfo(e.name,e.about),document.querySelector(".avatar__photo").setAttribute("src",e.avatar),R.getInitialCards().then((function(n){new a({items:n,renderer:function(n){return new t(n,J,q.handleCardClick,R.getUserInfo(),R.postNewCard,e.name,R.deleteCard,R.putLike,R.deleteLike,(function(e,t){var n=new y(".popup_delete",(function(r){r.preventDefault(),R.deleteCard(e),t.remove(),n.close()}));n.setEventListeners(),n.open()})).renderExistedCard()}},".elements").renderSection()}))}));var H=new y(".popup_edit-avatar",(function(e){e.preventDefault(),j(D,"Сохранение..."),R.patchAvatar(JSON.stringify({avatar:H.getInputValues()[0]})).then((function(){j(D,"Сохранить"),H.close()})).catch((function(e){console.log(e)})),document.querySelector(".avatar__photo").setAttribute("src",H.getInputValues()[0])}));H.setEventListeners(),M.addEventListener("click",(function(){X.resetValidation(),X.eraseInputText(),H.open()}));var G=new y(".popup_edit-info",(function(e){e.preventDefault(),I.setUserInfo(G.getInputValues()[0],G.getInputValues()[1]),j(A,"Сохранение..."),R.patchUserInfo(JSON.stringify({name:G.getInputValues()[0],about:G.getInputValues()[1]})).then((function(){j(A,"Сохранить"),G.close()})).catch((function(e){console.log(e)}))}));G.setEventListeners(),x.addEventListener("click",(function(){var e=I.getUserInfo();I.setUserInfo(e.name,e.info),document.querySelector(".form__input_info_name").value=e.name,document.querySelector(".form__input_info_engagement").value=e.info,Q.resetValidation(),G.open()}));var K=new y(".popup_add-element",(function(e){e.preventDefault();var n={name:K.getInputValues()[0],link:K.getInputValues()[1],likes:[]},r=new t(n,J,q.handleCardClick,R.getUserInfo(),R.postNewCard,n.name,R.deleteCard,R.putLike,R.deleteLike,(function(e,t){var n=new y(".popup_delete",(function(r){r.preventDefault(),R.deleteCard(e),t.remove(),n.close()}));n.setEventListeners(),n.open()})),o=r.renderNewCard();r.makeCardRemovable(),new a({items:n,renderer:o},".elements").addItem(o),K.close()}));K.setEventListeners(),N.addEventListener("click",(function(){W.resetValidation(),W.eraseInputText(),K.open()}));var Q=new o(F,A,B,z,U);Q.enableValidation();var W=new o(F,V,B,z,U);W.enableValidation();var X=new o(F,D,B,z,U);X.enableValidation()})();
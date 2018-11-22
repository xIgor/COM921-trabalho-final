global.jQuery = $ = require('jquery');
require('bootstrap');

AjaxForm = require('./lib/AjaxForm');
FormValidator = require('./lib/FormValidator');
ZipFinder = require('./lib/ZipFinder');
global.FormFiller = require('./lib/FormFiller');
global.PrettyAlerts = require('./lib/PrettyAlerts');

global.Vue = require("vue/dist/vue.common");
VueTheMask = require('vue-the-mask');
Vue.use(VueTheMask);
require('./lib/VueFilters');

import { ApiService } from './lib/ApiService';
global.API = new ApiService();

(function($){

    PrettyAlerts.init();
    AjaxForm.init('.intec-ajax-form');
    FormValidator.init('.intec-form-validator');
    ZipFinder.init();
    
})(jQuery);

window.SETTINGS = {};

SETTINGS.IS_PRODUCTION = false;
SETTINGS.APP_VERSION = '1.0.0';
SETTINGS.LOG_CONSOLE = !SETTINGS.IS_PRODUCTION;

var App = {};

(function (window, $) {
    'use strict';

    var SoundCloud;

    function initialize() {
    	
    	App.client = {};
        App.client.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        
        ES6Promise.polyfill();
        
        if (Modernizr.touch) {
            FastClick.attach(document.body);
        }

        if ($('#audioElement').length) {
        	SoundCloud = new App.SoundCloud($('#audioElement').get(0)); 
        }

    }

    $(initialize);

})(window, jQuery);

(function (window, $) {
    'use strict';

    var SoundCloud = function ($el) {
        var that = this;
        this.$el = $el;
        this.el = $el[0];

        this.clientId = '6f1327a14a0a8b3fe7026390efdb595e';
        
        this.isLoaded = false;
        this.isPaused = true;
        this.track = null;
        
        this.music = Array(
        	'https://soundcloud.com/vagrantrecords/active-child-johnny-belinda',
        	'https://soundcloud.com/thescumfrog/dirty-vegas-days-go-by-the',
        	'https://soundcloud.com/max-richter/02-spring-1'
        );

        this.setupHandlers();
    };
    
    SoundCloud.prototype.setupHandlers = function () {
    	this._onTimeUpdateHandler = this._onTimeUpdateEvent.bind(this); 
    	this._onTimeEndedHandler = this._onTimeEndedEvent.bind(this); 
    	this.onEnable();
    };
    
    SoundCloud.prototype.onEnable = function () {
    	this.$el.crossOrigin = "anonymous";
        this.$el.addEventListener("timeupdate", this._onTimeUpdateHandler, false);
        this.$el.addEventListener("ended", this._onTimeEndedHandler, false);
        this.init();
    };
    
    SoundCloud.prototype._onTimeUpdateEvent = function () {}
    
    SoundCloud.prototype._onTimeEndedEvent = function () {
    	var music = this.music;
    	var index = music.indexOf(this.track);
    	var remaining = music.splice(index, 1);
    	var random = remaining[Math.floor(Math.random()*remaining.length)];
    	this.play(random, this.clientId);
    }
    
    SoundCloud.prototype.play = function (track, clientId) {
    	var that = this;
        this.get("http://api.soundcloud.com/resolve.json?url=" + track + "&client_id=" + clientId, function (response) {
            that.track = JSON.parse(response);
            that.$el.src = that.track.stream_url + "?client_id=" + clientId;
            that.$el.play();
        });
    }

    SoundCloud.prototype.init = function () {

        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var audioSrc = audioCtx.createMediaElementSource(this.$el);
        var analyser = audioCtx.createAnalyser();

        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);
        
        this.play(this.random(), this.clientId);
    }
    
    SoundCloud.prototype.random = function () {
    	return this.music[Math.floor(Math.random()*this.music.length)];
    }

    SoundCloud.prototype.get = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                callback(request.responseText);
            }
        }
        request.open("GET", url, true);
        request.send(null);
    }

    window.App.SoundCloud = SoundCloud;

})(window, jQuery);

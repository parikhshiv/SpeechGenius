(function(root) {
  'use strict';
  var _speeches = [];
  var CHANGE_EVENT = "change";

  var resetSpeeches = function(speeches){
    _speeches = speeches.slice(0);
  };

  var SpeechStore = root.SpeechStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _speeches.slice();
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SpeechConstants.SPEECHES_RECIEVED:
          resetSpeeches(payload.speeches);
          SpeechStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
})(this);

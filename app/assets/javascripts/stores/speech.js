(function(root) {
  'use strict';
  var _speeches = [];
  var CHANGE_EVENT = "change";

  var resetSpeeches = function(speeches){
    _speeches = speeches.slice(0);
    sort_comments(_speeches);
  };

  var sort_comments = function (commentable) {
    commentable.forEach(function (speech) {
      return speech.comments.sort(function (a, b) {
        var first = a.created_at;
        var second = b.created_at;
        if (first < second) {
          return 1;
        } else if (first === second) {
          return 0;
        } else {
          return -1;
        }
      });
    });
  };


  var SpeechStore = root.SpeechStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _speeches.slice().sort(function (a, b) {
        var first = a.title[0].toLowerCase();
        var second = b.title[0].toLowerCase();
        if (first < second) {
          return -1;
        } else if (first === second) {
          return 0;
        } else {
          return 1;
        }
      });
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

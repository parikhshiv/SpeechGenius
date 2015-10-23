(function(root) {
  'use strict';
  var _speeches = [];
  var _filteredSpeeches = [];
  var CHANGE_EVENT = "change";

  var resetSpeeches = function(speeches){
    _speeches = speeches.slice(0);
    _speeches = _speeches.sort(created_at_sort);
    sort_comments(_speeches);
  };

  var resetFilteredSpeeches = function (filteredSpeeches) {
    _filteredSpeeches = filteredSpeeches.slice(0);
  };

  var created_at_sort = function (a, b) {
    var first = a.created_at;
    var second = b.created_at;
    if (first < second) {
      return -1;
    } else if (first === second) {
      return 0;
    } else {
      return 1;
    }
  };

  var sort_comments = function (commentable) {
    commentable.forEach(function (speech) {
      if (speech.comments) {
        var comments = speech.comments.sort(function (a, b) {
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
        return comments.sort(vote_sort);
      }
    });
  };

  var vote_sort = function (a, b) {
    var first = 0;
    var second = 0;
    a.votes.forEach(function (vote) {
      first += vote.value;
    });
    b.votes.forEach(function (vote) {
      second += vote.value;
    });
    if (first < second) {
      return 1;
    } else if (first === second) {
      return 0;
    } else {
      return -1;
    }
  };

  var SpeechStore = root.SpeechStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _speeches.slice();
    },
    clearFilteredSpeeches: function () {
      _filteredSpeeches = [];
    },
    allFilteredSpeeches: function () {
      return _filteredSpeeches.slice();
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
        case SpeechConstants.FILTERED_SPEECHES_RECIEVED:
          resetFilteredSpeeches(payload.speeches);
          SpeechStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
})(this);

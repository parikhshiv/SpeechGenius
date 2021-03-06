(function(root) {
  'use strict';
  var _annotations = [];
  var CHANGE_EVENT = "change";

  var resetAnnotations = function(annotations){
    _annotations = annotations.slice(0);
    sort_comments(_annotations);
  };

  var sort_comments = function (commentable) {
    commentable.forEach(function (speech) {
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

  var AnnotationStore = root.AnnotationStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _annotations.slice();
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case AnnotationConstants.ANNOTATIONS_RECEIVED:
          resetAnnotations(payload.annotations);
          AnnotationStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
})(this);

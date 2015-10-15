(function(root) {
  'use strict';
  var _annotations = [];
  var CHANGE_EVENT = "change";

  var resetAnnotations = function(annotations){
    _annotations = annotations.slice(0);
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

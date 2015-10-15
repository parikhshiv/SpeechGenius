ApiActions = {
  receiveSpeeches: function(speeches){
    AppDispatcher.dispatch({
      actionType: SpeechConstants.SPEECHES_RECIEVED,
      speeches: speeches
    });
  },
  receiveAnnotations: function (annotations) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.ANNOTATIONS_RECEIVED,
      annotations: annotations
    });
  }
};

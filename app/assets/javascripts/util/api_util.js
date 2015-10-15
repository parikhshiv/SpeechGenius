ApiUtil = {
  logOut: function () {
    $.ajax({
      url: "/session",
      type: "delete",
      success: function () {
        window.location = "/";
      }
    });
  },
  fetchSpeeches: function () {
    $.get("api/speeches", function (speeches) {
      ApiActions.receiveSpeeches(speeches);
    });
  },
  createSpeech: function (data, callback) {
    $.post("api/speeches", { speech: data }, function (speech) {
      callback(speech.id);
      ApiActions.receiveSpeeches([speech]);
    });
  },
  createAComment: function (data) {
    $.post("api/comments", { comment: data }, function (speech) {
      ApiActions.receiveSpeeches([speech]);
    });
  },
  createAnnotationComment: function (data) {
    $.post("api/comments", { comment: data }, function (annotation) {
      ApiActions.receiveAnnotations([annotation]);
    });
  },
  createAnnotation: function (data, callback) {
    $.post("api/annotations", {annotation: data}, function (annotation) {
      callback(annotation.id);
      ApiActions.receiveAnnotations([annotation]);
    });
  },
  fetchAnnotations: function (data) {
    $.get("api/annotations", {speech_id: data}, function (annotations) {
      ApiActions.receiveAnnotations(annotations);
    });
  },
  updateSpeech: function (data, callback) {
    $.ajax({
      url: "/api/speeches/" + data.id,
      type: "patch",
      data: {speech: data},
      success: function (speech) {
        callback();
        ApiActions.receiveSpeeches([speech]);
      }
    });
  }
};

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
  deleteAnnotationComment: function (data) {
    $.ajax({
      url: "/api/comments/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (annotation) {
        ApiActions.receiveAnnotations([annotation]);
      }
    });
  },
  deleteSpeechComment: function (data) {
    $.ajax({
      url: "/api/comments/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (speech) {
        ApiActions.receiveSpeeches([speech]);
      }
    });
  },
  deleteAnnotation: function (data, callback) {
    $.ajax({
      url: "/api/annotations/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function () {
        callback();
      }
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
  },
  fetchFilteredSpeeches: function (data) {
    $.get("api/speeches/search", {query: data}, function (speeches) {
      ApiActions.receiveFilteredSpeeches(speeches);
    });
  }
};

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
  fetchSingleSpeech: function (id) {
    $.get("api/speeches/" + id, function (speech) {
      ApiActions.receiveSpeeches([speech]);
    });
  },
  fetchSpeeches: function (data) {
    $.get("api/speeches", data, function (speeches) {
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
  fetchSingleAnnotation: function (id) {
    $.get("api/annotations/" + id, function (annotation) {
      ApiActions.receiveAnnotations([annotation]);
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
      },
      error: function (ann, msg) {
      }
    });
  },
  updateAnnotation: function (data, callback) {
    $.ajax({
      url: "/api/annotations/" + data.id,
      type: "patch",
      data: {annotation: data},
      success: function (annotation) {
        callback();
        ApiActions.receiveAnnotations([annotation]);
      },
      error: function (speech, msg) {

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
      },
      error: function (speech, msg) {

      }
    });
  },
  deleteSpeech: function (data, callback) {
    $.ajax({
      url: "/api/speeches/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (speech) {
        callback();
      }
    });
  },
  fetchFilteredSpeeches: function (data) {
    $.get("api/speeches/search", {query: data}, function (speeches) {
      ApiActions.receiveFilteredSpeeches(speeches);
    });
  },
  createAnnotationVote: function (data, callback) {
    $.post("api/votes", { vote: data }, function (annotation) {
      callback();
      ApiActions.receiveAnnotations([annotation]);
    });
  },
  updateAnnotationVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "patch",
      data: {vote: data},
      success: function (annotation) {
        callback();
        ApiActions.receiveAnnotations([annotation]);
      },
      error: function (ann, msg) {
      }
    });
  },
  cancelAnnotationVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (annotation) {
        callback();
        ApiActions.receiveAnnotations([annotation]);
      },
      error: function (ann, msg) {
      }
    });
  },
  createSpeechVote: function (data, callback) {
    $.post("api/votes", { vote: data }, function (speech) {
      callback();
      ApiActions.receiveSpeeches([speech]);
    });
  },
  updateSpeechVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "patch",
      data: {vote: data},
      success: function (speech) {
        callback();
        ApiActions.receiveSpeeches([speech]);
      },
      error: function (ann, msg) {
      }
    });
  },
  cancelSpeechVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (speech) {
        callback();
        ApiActions.receiveSpeeches([speech]);
      },
      error: function (ann, msg) {
      }
    });
  },
  createSpeechCommentVote: function (data, callback) {
    $.post("api/votes", { vote: data }, function (speech) {
      callback();
      ApiActions.receiveSpeeches([speech]);
    });
  },
  updateSpeechCommentVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "patch",
      data: {vote: data},
      success: function (speech) {
        callback();
        ApiActions.receiveSpeeches([speech]);
      },
      error: function (ann, msg) {
      }
    });
  },
  cancelSpeechCommentVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (speech) {
        callback();
        ApiActions.receiveSpeeches([speech]);
      },
      error: function (ann, msg) {
      }
    });
  },
  createAnnotationCommentVote: function (data, callback) {
    $.post("api/votes", { vote: data }, function (annotation) {
      callback();
      ApiActions.receiveAnnotations([annotation]);
    });
  },
  updateAnnotationCommentVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "patch",
      data: {vote: data},
      success: function (annotation) {
        callback();
        ApiActions.receiveAnnotations([annotation]);
      },
      error: function (ann, msg) {
      }
    });
  },
  cancelAnnotationCommentVote: function (data, callback) {
    $.ajax({
      url: "/api/votes/" + data.id,
      type: "delete",
      data: {id: data.id},
      success: function (annotation) {
        callback();
        ApiActions.receiveAnnotations([annotation]);
      },
      error: function (ann, msg) {
      }
    });
  }
};

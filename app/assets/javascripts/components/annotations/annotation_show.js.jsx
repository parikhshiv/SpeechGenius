var AnnotationShow = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function () {
    var annotationID = this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    return { annotation: annotation };
  },
  _findAnnotationById: function (id) {
    var res;
     AnnotationStore.all().forEach(function (annotation) {
      if (id == annotation.id) {
        res = annotation;
      }
    }.bind(this));
    return res;
  },
  handleSubmit: function (data) {
    ApiUtil.createAnnotationComment($.extend(data,
      {commentable_id: this.props.params.annotationID,
       commentable_type: "Annotation"}));
  },
  reRender: function () {
    this.setState({});
  },
  componentWillMount: function () {
    AnnotationStore.addChangeListener(this._updateAnnotation);
    window.addEventListener('resize', this.reRender);
    ApiUtil.fetchAnnotations(this.props.params.speechID);
  },
  componentWillReceiveProps: function (nextProps) {
    // this._updateAnnotation(nextProps.params.annotationID);
    ApiUtil.fetchSingleAnnotation(nextProps.params.annotationID);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.reRender);
    AnnotationStore.removeChangeListener(this._updateAnnotation);
  },
  _updateAnnotation: function (id) {
    var annotationID = id || this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    this.setState({annotation: annotation});
  },
  delete: function () {
    if (confirm("Are you sure you want to delete this annotation?")) {
      data = {id: this.props.params.annotationID};
      ApiUtil.deleteAnnotation(data, function () {
        var speech = document.getElementById('text');
        var text = speech.innerHTML;
        var selection = document.getElementById('link-' + this.props.params.annotationID);
        var array = text.split('');

        // GET STRING OF SELECTION
        var el = document.createElement("div");
        el.appendChild(selection);
        var string = el.innerHTML;
        var length = string.length;

        array.splice(text.indexOf(string), length, selection.innerHTML);
        speech.innerHTML = array.join('');

        var speaker_params = {
          id: this.props.params.speechID,
          content: document.getElementById('text').innerHTML
        };
        ApiUtil.updateSpeech(speaker_params, function () {
          this.props.history.pushState(null, "/speeches/" + this.props.params.speechID);
        }.bind(this));
      }.bind(this));
    }
  },
  deleteComment: function (data) {
    ApiUtil.deleteAnnotationComment(data);
  },
  editAnnotation: function (e) {
    e.preventDefault();
    this.props.history.pushState(null, "speeches/" + this.props.params.speechID + "/annotations/edit/" + this.props.params.annotationID);
  },
  upvote: function () {
    data = {votable_id: this.props.params.annotationID, votable_type: "Annotation", value: 1};
    ApiUtil.createAnnotationVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  downvote: function () {
    data = {votable_id: this.props.params.annotationID, votable_type: "Annotation", value: -1};
    ApiUtil.createAnnotationVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  updateAnnotationVote: function (data) {
    ApiUtil.updateAnnotationVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  cancelAnnotationVote: function (data) {
    ApiUtil.cancelAnnotationVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  upvoteComment: function (data) {
    ApiUtil.createAnnotationCommentVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  downvoteComment: function (data) {
    ApiUtil.createAnnotationCommentVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  updateCommentVote: function (data) {
    ApiUtil.updateAnnotationCommentVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  cancelCommentVote: function (data) {
    ApiUtil.cancelAnnotationCommentVote(data, function () {
      ApiUtil.fetchAnnotations(this.props.params.speechID);
    }.bind(this));
  },
  render: function () {
    var delete_button; var image; var edit_button; var hidden = "";
    if (window.CURRENT_USER_ID === this.state.annotation.user_id) {
      delete_button = <input className="cancel" onClick={this.delete} value="Delete Annotation" readOnly/>;
      edit_button = <input className="edit" onClick={this.editAnnotation} value="Edit Annotation" readOnly/>;
    }
    if (this.state.annotation.image_url) {
      image = <img className="annotation-img" src={this.state.annotation.image_url}/>;
    }
    var X = this.state.annotation.pos
    var style = {top: X-250}

    return (
      <div className="annotation-show-container" onClick={this.preventDefault} style={style}>
        <h5>SpeechGenius Annotation</h5>
        <div className="annotation-body">
          <div className="annotation-text">
            {this.state.annotation.content}
          </div>
          {image}
        </div>
        <div>
          <VotingContainer upvote={this.upvote} downvote={this.downvote}
            updateVote={this.updateAnnotationVote} cancelVote={this.cancelAnnotationVote}
            votes={this.state.annotation.votes}/>
        </div>
        <div className={"edit-and-delete-buttons"}>
            {edit_button}
            {delete_button}
        </div>
        <CommentContainer comments={this.state.annotation.comments}
        handleSubmit={this.handleSubmit} deleteComment={this.deleteComment}
        upvote={this.upvoteComment} downvote={this.downvoteComment}
        updateCommentVote={this.updateCommentVote}
        cancelCommentVote={this.cancelCommentVote}/>
      </div>
    )
  }
});

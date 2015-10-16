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
  componentWillMount: function () {
    AnnotationStore.addChangeListener(this._updateAnnotation);
    ApiUtil.fetchAnnotations(this.props.params.speechID);
  },
  componentWillReceiveProps: function (nextProps) {
    this._updateAnnotation(nextProps.params.annotationID);
  },
  componentWillUnmount: function () {
    AnnotationStore.removeChangeListener(this._updateAnnotation);
  },
  _updateAnnotation: function (id) {
    var annotationID = id || this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    this.setState({annotation: annotation});
  },
  delete: function () {
    if (confirm("Are you sure?")) {
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
  render: function () {
    var delete_button;
    if (window.CURRENT_USER_ID === this.state.annotation.user_id) {
      delete_button = <input className="cancel" onClick={this.delete} value="Delete Annotation" readOnly/>;
    }
    return (
      <div className="annotation-show-container" onClick={this.preventDefault}>
        <h5>SpeechGenius Annotation</h5>
        <div className="annotation-body">
          {this.state.annotation.content}
        </div>
        {delete_button}
        <CommentContainer comments={this.state.annotation.comments}
        handleSubmit={this.handleSubmit} deleteComment={this.deleteComment}/>
      </div>
    )
  }
});

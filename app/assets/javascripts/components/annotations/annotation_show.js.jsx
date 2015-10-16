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
    // document.addEventListener('click', this.clearAnnotation);
    ApiUtil.fetchAnnotations(this.props.params.speechID);
  },
  componentWillReceiveProps: function (nextProps) {
    this._updateAnnotation(nextProps.params.annotationID);
  },
  componentWillUnmount: function () {
    AnnotationStore.removeChangeListener(this._updateAnnotation);
    // document.removeEventListener('click', this.clearAnnotation);
  },
  clearAnnotation: function () {
    // this.props.history.pushState(null, "/speeches/" + this.state.annotation.speech_id);
  },
  _updateAnnotation: function (id) {
    var annotationID = id || this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    this.setState({annotation: annotation});
  },
  preventDefault: function (e) {
    // e.preventDefault();
  },
  render: function () {
    return (
      <div className="annotation-show-container" onClick={this.preventDefault}>
        <h5>SpeechGenius Annotation</h5>
        <div className="annotation-body">
          {this.state.annotation.content}
        </div>
        <CommentContainer comments={this.state.annotation.comments}
        handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
});

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
      <div className="annotation-container" onClick={this.preventDefault}>
        <div className="annotation-body">
          {this.state.annotation.content}
        </div>
        <div className="annotation-created-at">
          {this.state.annotation.created_at}
        </div>
        <div className="annotation-user-email">
          {this.state.annotation.user_email}
        </div>
        <CommentContainer comments={this.state.annotation.comments}
        handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
});

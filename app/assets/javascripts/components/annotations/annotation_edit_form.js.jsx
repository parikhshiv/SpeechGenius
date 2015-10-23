var AnnotationEditForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    var annotationID = this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    return {content: annotation.content, image_url: annotation.image_url,
      speech_id: annotation.speech_id};
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
  _updateAnnotation: function (id) {
    var annotationID = id || this.props.params.annotationID;
    var annotation = this._findAnnotationById(annotationID) || {} ;
    this.setState({content: annotation.content, image_url: annotation.image_url,
      speech_id: annotation.speech_id});
  },
  componentWillMount: function () {
    AnnotationStore.addChangeListener(this._updateAnnotation);
    ApiUtil.fetchAnnotations(this.props.params.speechID);
  },
  componentWillUnmount: function () {
    AnnotationStore.removeChangeListener(this._updateAnnotation);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var annotationID = this.props.params.annotationID;
    if (this._validated()) {
      ApiUtil.updateAnnotation($.extend({}, this.state, {id: annotationID}), function () {
        this.props.history.pushState(null, "/speeches/" + this.state.speech_id + "/annotations/" + annotationID);
      }.bind(this));
    }
  },
  _validated: function () {
    var state = this.state;
    if (state.content) {
      return (state.content.length > 0);
    }
    return false;
  },
  componentWillReceiveProps: function () {
    this.setState({});
  },
  image: function () {
    filepicker.setKey("Anzi7KPVURiqZ1raadWcdz");
    filepicker.pick({maxSize: 10*1024*1024,
      services: ['IMAGE_SEARCH','COMPUTER','URL','WEBCAM'],
      openTo: "IMAGE_SEARCH"}, function(image_action){
      this.setState({image_url: image_action.url});
    }.bind(this));
  },
  render: function () {
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Image Attached ✓" className="image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className={"speech-form"}>
        <h3>Edit Annotation</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          valueLink={this.linkState('content')}/>
          <br/>
          <div className = "image-upload">
            {image_upload}
          </div>
          <br/>
          <input type="Submit" value="Update Annotation" readOnly/>
        </form>
      </div>
    )
  }
});

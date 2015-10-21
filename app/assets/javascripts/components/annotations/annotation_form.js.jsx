var AnnotationForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    return {content: "", image_url: ""};
  },

  handleSubmit: function (e) {
    e.preventDefault();
    if (this._validated()) {
      this.props.createAnnotation($.extend(this.state,
         {speech_id: this.props.speech.id, pos: this.props.pos}));
      this.setState({content: "", image_url: "", errors: false});
    } else {
      this.setState({errors: true});
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
  cancel: function (e) {
    e.preventDefault();
    this.setState({content: "", image_url: "", errors: false});
    this.props.cancel();
  },
  render: function () {
    var errors;
    if (this.state.errors) {
      errors = "Please enter an annotation.";
    }
    var hidden = (this.props.visible) ? "" : " hidden";
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Image Attached ✓" className="image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className={"annotation" + hidden}>
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Say something cool!"
          valueLink={this.linkState('content')}/>
          <h4 className="errors">{errors}</h4>
          <input type="Submit" value="Post annotation" readOnly/>
          <div className = "annotation-image-upload">
            {image_upload}
          </div>
          <div>
            <input className="cancel" onClick={this.cancel} value="cancel" readOnly/>
          </div>
        </form>
      </div>
    )
  }
});

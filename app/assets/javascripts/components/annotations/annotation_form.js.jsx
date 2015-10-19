var AnnotationForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    return {content: "", image_url: ""};
  },
  handleSubmit: function () {
    if (this._validated()) {
      this.props.createAnnotation($.extend(this.state,
         {speech_id: this.props.speech.id}));
      this.setState({content: "", image_url: ""});
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
  cancel: function () {
    this.setState({content: "", image_url: ""});
    this.props.cancel();
  },
  render: function () {
    var hidden = (this.props.visible) ? "" : " hidden";
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Upload Image!" className="image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className={"annotation" + hidden}>
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Say something cool!"
          valueLink={this.linkState('content')}/>
          <br/>
          <div className = "image-upload">
            {image_upload}
          </div>
          <br/>
          <input type="Submit" value="Post annotation" readOnly/>
          <input className="cancel" onClick={this.cancel} value="cancel" readOnly/>
        </form>
      </div>
    )
  }
});

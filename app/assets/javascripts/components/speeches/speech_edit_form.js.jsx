var SpeechEditForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    var speechID = this.props.params.speechID;
    var speech = this._findSpeechById(speechID) || {} ;
    return {speech: speech, speaker: speech.speaker, title: speech.title, image_url: speech.image_url};
  },
  _findSpeechById: function (id) {
    var res;
     SpeechStore.all().forEach(function (speech) {
      if (id == speech.id) {
        res = speech;
      }
    }.bind(this));
    return res;
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._updateSpeech);
    ApiUtil.fetchSingleSpeech(this.props.params.speechID);
  },
  componentWillUnmount: function () {
    SpeechStore.removeChangeListener(this._updateSpeech);
  },
  _updateSpeech: function () {
    var speechID = this.props.params.speechID;
    var speech = this._findSpeechById(speechID) || {} ;
    this.setState({speech: speech, speaker: speech.speaker,
      title: speech.title, image_url: speech.image_url});
  },
  handleSubmit: function () {
    if (this._validated()) {
      ApiUtil.updateSpeech($.extend(this.state, {id: this.state.speech.id}), function () {
        this.props.history.pushState(null, "/speeches/" + this.state.speech.id);
      }.bind(this));
    } else {
      this.setState({errors: true});
    }
  },
  _validated: function () {
    var state = this.state;
    if (state.speaker && state.title) {
      return (state.speaker.length > 0 && state.title.length > 0);
    }
    return false;
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
    var errors;
    if (this.state.errors) {
      errors = "All fields must be completed.";
    }
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Image Attached ✓" className="image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload An Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className="speech-form">
        <h3>Edit Speech</h3>
        <h4 className="errors">{errors}</h4>
        <form onSubmit={this.handleSubmit}>
          <div className = "form-input">
            <label>Title:</label>
            <br/>
            <input type="text"
            valueLink={this.linkState('title')}/>
          </div>
          <div className = "form-input">
            <label>Speaker:</label>
            <br/>
            <input type="text"
            valueLink={this.linkState('speaker')}/>
          </div>
          <div className = "image-upload">
            {image_upload}
          </div>
          <input type="Submit"/>
        </form>
      </div>
    )
  }
});

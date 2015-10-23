var SpeechForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {speaker: null, title: null, content: null, image_url: null};
  },
  handleSubmit: function (e) {
    // CHECK FOR MALICIOUS HTML HERE
    e.preventDefault();
    if (/<[a-z][\s\S]*>/i.test(this.state.content)) {
      alert("NO HTML PLEASE!!!!!!");
      return;
    }

    if (this._validated()) {
      ApiUtil.createSpeech(this.state, function (speech_id) {
        this.props.history.pushState(null, "/speeches/" + speech_id );
      }.bind(this));
    } else {
      this.setState({errors: true});
    }
  },
  _validated: function () {
    var state = this.state;
    if (state.speaker && state.title && state.content) {
      return (state.speaker.length > 0 && state.title.length > 0 &&
          state.content.length > 0);
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
    <input type="image-upload" value="Include An Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className="speech-form">
        <h3>Add A New Speech</h3>
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
          Speech Text:
          <textarea rows='20' cols='40' placeholder="Enter Speech Here" valueLink={this.linkState('content')}/>
          <br/>
          <input type="Submit"/>
        </form>
      </div>
    )
  }
});

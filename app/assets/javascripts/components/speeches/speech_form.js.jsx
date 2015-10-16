var SpeechForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {speaker: null, title: null, content: null, image_url: null};
  },
  handleSubmit: function () {
    // CHECK FOR MALICIOUS HTML HERE
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
    filepicker.pick(function(image_action){
      this.setState({image_url: image_action.url});
    }.bind(this));
  },
  render: function () {
    var errors;
    if (this.state.errors) {
      errors = "All fields must be completed.";
    }
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Upload Image!" className="image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className="speech-form">
        <h3>New Speech</h3>
        <h4 className="errors">{errors}</h4>
        <form onSubmit={this.handleSubmit}>
          <label>Title: </label>
          <input type="text" placeholder="Title"
          valueLink={this.linkState('title')}/>
          <label>By: </label>
          <input type="text" placeholder="The speaker"
           valueLink={this.linkState('speaker')}/>
          <br/><br/>
          {image_upload}
          <br/>
          Text:
          <textarea rows='20' cols='40' valueLink={this.linkState('content')}/>
          <br/><br/>
          <input type="Submit"/>
        </form>
      </div>
    )
  }
});

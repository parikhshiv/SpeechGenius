var CommentEditForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {body: null, image_url: null};
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this._validated()) {
      this.props.handleSubmit(this.state);
      this.setState({body: ""});
    }
  },
  _validated: function () {
    var state = this.state;
    if (state.body) {
      return (state.body.length > 0);
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
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Image Attached ✓" className="comment-image-upload disabled" readOnly/> :
    <input type="image-upload" value="Upload An Image!" onClick={this.image} className="comment-image-upload" readOnly/>;
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Suggest an improvement, or add a comment..."
          valueLink={this.linkState('body')}/>
          <br/>
          <div className="comment-button-container">
            <div className="comment-submit-button">
              <input type="Submit" value="Post comment" readOnly/>
            </div>
            <div className = "comment-image-upload">
              {image_upload}
            </div>
          </div>
        </form>
      </div>
    )
  }
});

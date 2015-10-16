CommentForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {body: null, image_url: null};
  },
  handleSubmit: function () {
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
    filepicker.pick(function(image_action){
      this.setState({image_url: image_action.url});
    }.bind(this));
  },
  render: function () {
    var image_upload = (this.state.image_url) ? <input type="image-upload" value="Upload Image!" className="image-upload isabled" readOnly/> :
    <input type="image-upload" value="Upload Image!" onClick={this.image} className="image-upload" readOnly/>;
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Suggest an improvement, or add a comment..."
          valueLink={this.linkState('body')}/>
          <br/>
          <input type="Submit" value="Post comment" readOnly/>
          {image_upload}
        </form>
      </div>
    )
  }
});

// data-fp-maxsize="4"

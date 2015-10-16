CommentForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {body: null};
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
    filepicker.pick(function(Blob){
      console.log(Blob.url);
    });
  },
  render: function () {
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Suggest an improvement, or add a comment..."
          valueLink={this.linkState('body')}/>
          <br/>
          <input type="Submit" value="Post comment" readOnly/>
          <input type="image-upload" value="Upload Image!" onClick={this.image} readOnly/>
        </form>
      </div>
    )
  }
});

// data-fp-maxsize="4"

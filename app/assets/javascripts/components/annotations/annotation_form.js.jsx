var AnnotationForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    return {content: null, image_url: null};
  },
  handleSubmit: function () {
    if (this._validated()) {
      this.props.createAnnotation($.extend(this.state,
         {speech_id: this.props.speech.id}));
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
  render: function () {
    var hidden = (this.props.visible) ? "" : " hidden";
    return (
      <div className={"annotation" + hidden}>
        <h3>Add an Annotation</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea rows='5' cols='20'
          placeholder="Add an annotation..."
          valueLink={this.linkState('content')}/>
          <br/>
          <label>Image Url (optional): </label>
          <input type="text" placeholder="image url..."
          valueLink={this.linkState('image_url')}/>
          <br/>
          <input type="Submit" value="Post annotation" readOnly/>
        </form>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    )
  }
});

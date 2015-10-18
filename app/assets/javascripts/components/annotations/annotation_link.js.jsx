var AnnotationLink = React.createClass({
  componentWillReceiveProps: function () {
    this.setState({});
  },
  render: function () {
    var hidden= (this.props.visible) ? "" : " hidden";

    return (
      <div className={"annotation-link" + hidden}>
        <button className="annotation-link"
         onClick={this.props.handleClick}>Start an Annotation!</button>
      </div>
    );
  }
});

var AnnotationLink = React.createClass({
  mixins: [ReactRouter.History],
  componentWillReceiveProps: function () {
    this.setState({});
  },
  render: function () {
    var hidden= (this.props.visible) ? "" : " hidden";

    return (
      <button className={"annotation-link" + hidden}
       onClick={this.props.handleClick}>Start an Annotation!</button>
    );
  }
});

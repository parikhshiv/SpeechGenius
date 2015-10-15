var CommentContainer = React.createClass({
  render: function () {
    return (
      <div className="comment-container">
        <h1> Comments </h1>
        <CommentList comments={this.props.comments}/>
        <CommentForm handleSubmit={this.props.handleSubmit}/>
      </div>
    );
  }
});

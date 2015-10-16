var CommentContainer = React.createClass({
  render: function () {
    return (
      <div className="comment-container">
        <CommentForm handleSubmit={this.props.handleSubmit}/>
        <CommentList comments={this.props.comments} deleteComment={this.props.deleteComment}/>
      </div>
    );
  }
});

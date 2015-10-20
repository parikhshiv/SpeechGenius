var CommentContainer = React.createClass({
  render: function () {
    return (
      <div className="comment-container">
        <CommentForm handleSubmit={this.props.handleSubmit}/>
        <CommentList comments={this.props.comments} deleteComment={this.props.deleteComment}
          upvote={this.props.upvote} downvote={this.props.downvote} updateCommentVote={this.props.updateCommentVote}
          cancelCommentVote={this.props.cancelCommentVote}/>
      </div>
    );
  }
});

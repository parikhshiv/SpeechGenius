var CommentList = React.createClass({
  render: function () {
    var list;
    if (this.props.comments) {
      list = this.props.comments.map(function (comment) {
        return <CommentListItem key={comment.id} deleteComment={this.props.deleteComment}
          upvote={this.props.upvote} downvote={this.props.downvote} updateCommentVote={this.props.updateCommentVote}
          cancelCommentVote={this.props.cancelCommentVote} {...comment}/>;
      }.bind(this))
    }
    return(
      <div className="comment-list">
        {list}
      </div>
    );
  }
});

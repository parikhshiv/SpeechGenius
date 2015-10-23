var CommentListItem = React.createClass({
  deleteComment: function () {
    if (confirm("Are you sure you want to delete this comment?")) {
      data = {id: this.props.id};
      this.props.deleteComment(data);
    }
  },
  upvote: function () {
    data = {votable_id: this.props.id, votable_type: "Comment", value: 1};
    this.props.upvote(data);
  },
  downvote: function () {
    data = {votable_id: this.props.id, votable_type: "Comment", value: -1};
    this.props.downvote(data);
  },
  updateCommentVote: function (data) {
    this.props.updateCommentVote(data);
  },
  cancelCommentVote: function (data) {
    this.props.cancelCommentVote(data);
  },
  render: function () {
    var delete_button; var image;
    if (window.CURRENT_USER_ID === this.props.user_id) {
      delete_button = <input className="cancel" onClick={this.deleteComment} value="Delete Comment" readOnly/>;
    }
    if (this.props.image_url) {
      image = <img className="comment-img" src={this.props.image_url}/>;
    }
    return (
      <div className="comment">
        <div className="comment-header">
          <div className="comment-user-email pull-left">
            {this.props.user_email}
          </div>
          <div className="comment-created-at pull-right">
            {this.props.created_at_pretty}
          </div>
        </div>
        <VotingContainer upvote={this.upvote} downvote={this.downvote}
          updateVote={this.updateCommentVote} cancelVote={this.cancelCommentVote}
          votes={this.props.votes}/>
        <div className="comment-body">
          {this.props.body}
        </div>
        {image}
        <div>
          {delete_button}
        </div>
      </div>
    );
  }
});

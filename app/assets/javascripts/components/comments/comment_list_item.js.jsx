var CommentListItem = React.createClass({
  render: function () {
    return(
      <div className="comment">
        <div className="comment-body">
          {this.props.body}
        </div>
        <div className="comment-created-at">
          {this.props.created_at}
        </div>
        <div className="comment-user-email">
          {this.props.user_email}
        </div>
      </div>
    );
  }
});

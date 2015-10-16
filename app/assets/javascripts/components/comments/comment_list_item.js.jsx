var CommentListItem = React.createClass({
  render: function () {
    return(
      <div className="comment">
        <div className="comment-header">
          <div className="comment-user-email pull-left">
            {this.props.user_email}
          </div>
          <div className="comment-created-at pull-right">
            {this.props.created_at}
          </div>
        </div>
        <div className="comment-body">
          {this.props.body}
        </div>
      </div>
    );
  }
});

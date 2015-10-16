var CommentList = React.createClass({
  render: function () {
    var list;
    if (this.props.comments) {
      list = this.props.comments.map(function (comment) {
        return <CommentListItem key={comment.id} deleteComment={this.props.deleteComment} {...comment}/>;
      }.bind(this))
    }
    return(
      <div className="comment-list">
        {list}
      </div>
    );
  }
});

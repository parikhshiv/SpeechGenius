var CommentList = React.createClass({
  render: function () {
    var list;
    if (this.props.comments) {
      list = this.props.comments.reverse().map(function (comment) {
        return <CommentListItem key={comment.id} {...comment}/>;
      })
    }
    return(
      <div className="comment-list">
        {list}
      </div>
    );
  }
});

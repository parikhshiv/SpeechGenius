var VotingContainer = React.createClass({
  getInitialState: function () {
    return {vote: this._findCurrentUsersVotes()};
  },
  _findCurrentUsersVotes: function (nextProps) {
    var vote = false;
    var props = nextProps || this.props;
    if (props.votes) {
      props.votes.forEach(function (realVote) {
        if (realVote.user_id === window.CURRENT_USER_ID) {
          vote = realVote;
        }
      });
    }
    return vote;
  },
  upvote: function (e) {
    e.preventDefault();
    (this.state.vote) ? this.props.updateVote({id: this.state.vote.id, value: 1}) : this.props.upvote();
  },
  downvote: function (e) {
    e.preventDefault();
    // debugger;
    (this.state.vote) ? this.props.updateVote({id: this.state.vote.id, value: -1}) : this.props.downvote();
  },
  cancelVote: function (e) {
    e.preventDefault();
    this.props.cancelVote({id: this.state.vote.id});
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({vote: this._findCurrentUsersVotes(nextProps)});
  },
  render: function () {
    value = 0;
    if (this.props.votes) {
      this.props.votes.forEach(function (vote) {
        value += vote.value;
      });
    }
    var onClick = this.upvote;
    var onDownClick = this.downvote;
    var upIndented; var downIndented;
    if (this.state.vote) {
      if (this.state.vote.value === 1) {
        upIndented = " indented";
        onClick = this.cancelVote;
      } else {
        downIndented = " down-indented";
        onDownClick = this.cancelVote;
      }
    }
    var votingClass = (this.props.speech) ? "speech-voting-container" : "voting-container"
    return (
      <div className={votingClass}>
        <input className={"upvote" + upIndented} onClick={onClick} value="⬆" readOnly/>
        {value}
        <input className={"downvote" + downIndented} onClick={onDownClick} value="⬇" readOnly/>
      </div>
    )
  }
});

// 👍👎

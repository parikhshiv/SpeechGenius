var SpeechIndexBottom = React.createClass({
  getInitialState: function () {
    return {speeches: SpeechStore.all()};
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._update);
  },
  _update: function () {
    this.setState({speeches: SpeechStore.all()});
  },
  componentWillUnmount: function () {
    SpeechStore.removeChangeListener(this._update);
  },
  render: function () {
    return (
      <div className="index-bottom">
        <div className="song-index-bottom">
          {this.state.speeches.slice(4).sort(vote_sort).map(function (speech) {
              return <SpeechBottomIndexItem key={speech.id} {...speech}/>;
            })
          }
        </div>
      </div>
    );
  }
});

var vote_sort = function (a, b) {
  var first = 0;
  var second = 0;
  a.votes.forEach(function (vote) {
    first += vote.value;
  });
  b.votes.forEach(function (vote) {
    second += vote.value;
  });
  if (first < second) {
    return 1;
  } else if (first === second) {
    return 0;
  } else {
    return -1;
  }
};

var SpeechIndexBottom = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function () {
    return {speeches: SpeechStore.all()};
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._update);
  },
  _update: function () {
    var empty;
    if (SpeechStore.all().length === 0) {
      empty = true;
    }
    this.setState({speeches: SpeechStore.all(), empty: empty});
  },
  componentWillUnmount: function () {
    SpeechStore.removeChangeListener(this._update);
  },
  newSpeech: function () {
    this.history.pushState(null, "/speeches/new");
  },
  render: function () {
    var hidden = " hidden";
    if (this.state.empty) {
      hidden = "";
    };
    return (
      <div className="index-bottom">
        <div className="song-index-bottom">
          <h1 className={"empty" + hidden}>
            Didn't find what you were looking for? Add a new speech
            <span className="new" onClick={this.newSpeech}> here!</span>
          </h1>
          {this.state.speeches.slice(3).sort(vote_sort).map(function (speech) {
              return <SpeechBottomIndexItem key={speech.id} {...speech}/>;
            })
          }
        </div>
        <SpeechPagination/>
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

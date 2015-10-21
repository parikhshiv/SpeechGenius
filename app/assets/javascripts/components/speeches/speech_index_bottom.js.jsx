var SpeechIndexBottom = React.createClass({
  getInitialState: function () {
    return {speeches: SpeechStore.all()};
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._update);
    ApiUtil.fetchSpeeches();
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
          {this.state.speeches.slice(4).map(function (speech) {
              return <SpeechBottomIndexItem key={speech.id} {...speech}/>;
            })
          }
        </div>
      </div>
    );
  }
});

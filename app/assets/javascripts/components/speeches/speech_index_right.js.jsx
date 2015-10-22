var SpeechIndexRight = React.createClass({
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
      <div className="index">
        <HeaderAbout/>
        <div className="song-index">
          {this.state.speeches.slice(0,3).map(function (speech) {
              return <SpeechIndexItem key={speech.id} {...speech}/>;
            })
          }
        </div>
        <SpeechIndexBottom/>
      </div>
    );
  }
});

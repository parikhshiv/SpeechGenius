var SecondNavbar = React.createClass({
  mixins: [ReactRouter.History],
  about: function () {
    this.history.pushState(null, "/about")
  },
  home: function () {
    this.history.pushState(null, "/");
  },
  newSpeech: function () {
    this.history.pushState(null, "/speeches/new");
  },
  render: function () {
    return (
      <header className="header-2">
        <div className="about" onClick={this.about}>About SpeechGenius</div>
        <div className="about" onClick={this.home}>All Speeches</div>
        <div className="new-speech" onClick={this.newSpeech}>Add A Speech</div>
      </header>
    );
  }
});

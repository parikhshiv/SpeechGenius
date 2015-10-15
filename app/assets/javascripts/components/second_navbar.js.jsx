var SecondNavbar = React.createClass({
  mixins: [ReactRouter.History],
  logOut: function () {
    ApiUtil.logOut();
  },
  newSpeech: function () {
    this.history.pushState(null, "/speeches/new");
  },
  render: function () {
    return (
      <header className="header-2">
        <div className="logout" onClick={this.logOut}>Log Out</div>
        <div className="new-speech" onClick={this.newSpeech}>Add A Speech</div>
      </header>
    );
  }
});

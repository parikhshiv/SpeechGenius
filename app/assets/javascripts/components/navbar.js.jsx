var Navbar = React.createClass({
  mixins: [ReactRouter.History],
  home: function () {
    this.history.pushState(null, "/");
  },
  logOut: function () {
    ApiUtil.logOut();
  },
  render: function () {
    return (
      <header>
        <SpeechSearch/>
        <div className="logout" onClick={this.logOut}>Log Out</div>
        <h1 onClick={this.home} className="home-page">SPEECHGENIUS</h1>
      </header>
    );
  }
});

var Navbar = React.createClass({
  mixins: [ReactRouter.History],
  home: function () {
    this.history.pushState(null, "/");
  },
  logOut: function () {
    window.CURRENT_USER_ID ? ApiUtil.logOut() : document.location = "/session/new";
  },
  render: function () {
    var message = window.CURRENT_USER_ID ? "Log Out" : "Sign In";
    return (
      <header>
        <SpeechSearch/>
        <div className="logout" onClick={this.logOut}>{message}</div>
        <h1 onClick={this.home} className="home-page">speechgenius</h1>
      </header>
    );
  }
});

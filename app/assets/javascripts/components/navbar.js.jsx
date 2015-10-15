var Navbar = React.createClass({
  mixins: [ReactRouter.History],
  home: function () {
    this.history.pushState(null, "/");
  },
  render: function () {
    return (
      <header>
        <h1 onClick={this.home} className="home-page">SPEECHGENIUS</h1>
      </header>
    );
  }
});

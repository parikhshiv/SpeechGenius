var SearchResultItem = React.createClass({
  mixins: [ReactRouter.History],
  redirect: function () {
    this.props.resetSearch();
    ApiUtil.fetchSingleSpeech(this.props.id);
    this.history.pushState(null, "/speeches/" + this.props.id);
  },
  handleKey: function (e) {
    e.preventDefault();
    var resultItem = e.currentTarget;
    if (e.keyCode === 13) {
      this.redirect();
    } else if (e.keyCode === 40 && resultItem.nextSibling) {
      resultItem.nextSibling.focus()
    } else if (e.keyCode === 38) {
      resultItem.previousSibling ? resultItem.previousSibling.focus() : $("#search-bar").focus();
    }
  },
  render: function () {
    return(
      <div className="search-result-item" onClick={this.redirect}
      onKeyDown={this.handleKey} tabIndex="-1">
        <strong>{this.props.title}</strong> - {this.props.speaker}
      </div>
    )
  }
});

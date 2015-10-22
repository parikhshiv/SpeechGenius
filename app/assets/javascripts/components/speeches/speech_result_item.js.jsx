var SearchResultItem = React.createClass({
  mixins: [ReactRouter.History],
  redirect: function () {
    this.props.resetSearch();
    ApiUtil.fetchSpeeches();
    this.history.pushState(null, "/speeches/" + this.props.id);
  },
  render: function () {
    return(
      <div className="search-result-item" onClick={this.redirect}>
        <strong>{this.props.title}</strong> - {this.props.speaker}
      </div>
    )
  }
});

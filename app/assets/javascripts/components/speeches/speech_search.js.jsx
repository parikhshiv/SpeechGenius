var SpeechSearch = React.createClass({
  getInitialState: function () {
    return {search: "", filteredSpeeches: []};
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._update);
  },
  componentWillUnmount: function () {
    SpeechStore.removeChangeListener(this._update);
  },
  _update: function () {
    this.setState({filteredSpeeches: SpeechStore.allFilteredSpeeches()});
  },
  handleInput: function (e) {
    ApiUtil.fetchFilteredSpeeches(e.target.value);
    this.setState({search: e.target.value});
  },
  resetSearch: function () {
    SpeechStore.clearFilteredSpeeches();
    this.setState({search: "", filteredSpeeches: SpeechStore.allFilteredSpeeches()});
  },
  tabDown: function (e) {
    if (e.keyCode === 40) {
      e.preventDefault();
      $("div.search-result-item:first-child").focus();
    }
  },
  render: function () {
    return (
      <div className="speech-search">
        <input placeholder={"Search Speeches..."} type="text"
        value={this.state.search} onChange={this.handleInput}
        onKeyDown={this.tabDown} id="search-bar"/>
        <span className="search-icon">🔍</span>
        <SearchResults speeches={this.state.filteredSpeeches} resetSearch={this.resetSearch}/>
      </div>
    )
  }
});

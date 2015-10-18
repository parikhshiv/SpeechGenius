var SpeechSearch = React.createClass({
  getInitialState: function () {
    return {search: "", filteredSpeeches: []};
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._update);
    // ApiUtil.fetchFilteredSpeeches("");
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
    this.setState({search: "", filteredSpeeches: []});
  },
  // _validate: function () {

  // },
  render: function () {
    return (
      <div className="speech-search">
        <input placeholder="Search Speeches 🔎" type="text"
        value={this.state.search} onChange={this.handleInput}/>
        <SearchResults speeches={this.state.filteredSpeeches} resetSearch={this.resetSearch}/>
      </div>
    )
  }
});

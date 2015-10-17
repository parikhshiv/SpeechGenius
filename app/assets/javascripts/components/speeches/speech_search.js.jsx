var SpeechSearch = React.createClass({
  getInitialState: function () {
    return {search: null, filteredSpeeches: []};
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
  },
  // _validate: function () {

  // },
  render: function () {
    return (
      <div className="speech-search">
        <input placeholder="Search for speeches..." type="text"
        value={this.state.search} onChange={this.handleInput}/>
        <SearchResults speeches={this.state.filteredSpeeches}/>
      </div>
    )
  }
});

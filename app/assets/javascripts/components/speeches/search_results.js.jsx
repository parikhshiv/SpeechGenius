var SearchResults = React.createClass({
  render: function () {
    return (
      <ul className="search-results">
        {this.props.speeches.map(function (speech) {
          return <SearchResultItem key={speech.id} {...speech}/>
        })}
      </ul>
    );
  }
});

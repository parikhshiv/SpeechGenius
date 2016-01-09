var SpeechPagination = React.createClass({
  getInitialState: function () {
    return {active_page: 1}
  },
  left: function (e) {
    e.preventDefault();
    if (this.state.active_page === 1) {
      this.setState({active_page: 1});
    } else {
      ApiUtil.fetchSpeeches({page: this.state.active_page - 1});
      this.setState({active_page: this.state.active_page - 1});
    }
  },
  right: function (e) {
    e.preventDefault();
    if (this.state.active_page !== 5 && SpeechStore.all().length !== 0) {
      ApiUtil.fetchSpeeches({page: this.state.active_page + 1});
      this.setState({active_page: this.state.active_page + 1});
    }
  },
  setPage: function (e, page) {
    e.preventDefault();
    if (page <= this.state.active_page || SpeechStore.all().length !== 0) {
      ApiUtil.fetchSpeeches({page: page});
      this.setState({active_page: page});
    }
  },
  render: function () {
    var pages = [1,2,3,4,5];
    var left = "<<";
    var right = ">>";
    return (
      <div className="pagination">
          <div className = "pages" onClick={this.left}>{left}</div>
          {pages.map(function(el) {
            var active = "";
            if (el === this.state.active_page) {
              active = " active";
            };
            return (
              <div key={el} className={"pages" + active}
              onClick={this.setPage.bind(this, null, el)}>
                {el}
              </div>
            );
          }, this)}
          <div className = "pages" onClick={this.right}>{right}</div>
      </div>
    );
  }
});

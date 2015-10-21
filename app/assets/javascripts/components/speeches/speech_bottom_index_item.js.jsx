var SpeechBottomIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  onClick: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/speeches/" + this.props.id);
  },
  render: function () {
    var image;
    if (this.props.image_url) {
      image = <img className="bottom-speech-img" src={this.props.image_url}/>;
    }
    return (
      <div onClick={this.onClick} className="speech-bottom-index-item">
        <strong>{this.props.title}</strong> - {this.props.speaker}
      </div>
    );
  }
});

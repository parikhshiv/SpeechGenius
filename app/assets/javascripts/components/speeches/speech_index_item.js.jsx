var SpeechIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  onClick: function () {
    this.history.pushState(null, "/speeches/" + this.props.speech.id);
  },
  render: function () {
    return (
      <div onClick={this.onClick} className="speech-index-item">
        <strong>{this.props.speech.title}</strong>, {this.props.speech.speaker}
      </div>
    );
  }
});

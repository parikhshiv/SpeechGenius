var SpeechShow = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function () {
    var speechID = this.props.params.speechID;
    var speech = this._findSpeechById(speechID) || {} ;
    return { speech: speech,
      link: false,
      text: speech.content};
  },
  _findSpeechById: function (id) {
    var res;
     SpeechStore.all().forEach(function (speech) {
      if (id == speech.id) {
        res = speech;
      }
    }.bind(this));
    return res;
  },
  componentWillMount: function () {
    SpeechStore.addChangeListener(this._updateSpeech);
    window.addEventListener('mouseup', this.clearAnnotationLink);
    ApiUtil.fetchSpeeches();
  },
  componentWillUnmount: function () {
    SpeechStore.removeChangeListener(this._updateSpeech);
    window.removeEventListener('mouseup', this.clearAnnotationLink);
  },
  _updateSpeech: function () {
    var speechID = this.props.params.speechID;
    var speech = this._findSpeechById(speechID) || {} ;
    this.setState({speech: speech, text: speech.content});
  },
  handleSubmit: function (data) {
    ApiUtil.createAComment($.extend(data,
      {commentable_id: this.props.params.speechID,
       commentable_type: "Speech"}));
  },
  newAnnotation: function(pageY) {
    // debugger;
    var selection = window.getSelection();
    if (!document.getElementById('active') &&
    selection.toString().trim().length > 0 && !(this.state.redirected)) {
      this.setState({ link: true, pos: pageY });
    } else {
      this.setState({link: false, redirected: false});
    }
  },
  newAnnotationTimeout: function (e) {
    setTimeout(this.newAnnotation.bind(null, e.pageY), 0);
  },
  componentWillReceiveProps: function (nextProps) {
    // debugger;
    if (nextProps.params.annotationID && this.state.new) {
      this.cancel();
    } else if (nextProps.params.annotationID) {
      this.clearAnnotationLink('redirect');
    }
    var speechID = nextProps.params.speechID;
    var speech = this._findSpeechById(speechID) || {} ;
    this.setState({ speech: speech, link: false, text: speech.content});
  },
  clearAnnotationLink: function (redirect) {
    // debugger;
    var selection = window.getSelection();
    if (redirect === 'redirect') {
      this.setState({ link: false, redirected: true });
    } else if (selection.toString().trim().length < 1) {
      this.setState({ link: false});
    }
  },
  cancel: function () {
    var speech = document.getElementById('text');
    var text = speech.innerHTML;
    var selection = document.getElementById('active');
    var array = text.split('');

    // GET STRING OF SELECTION
    var el = document.createElement("div");
    el.appendChild(selection);

    var string = el.innerHTML;
    var length = string.length;
    array.splice(text.indexOf(string), length, selection.innerHTML);
    speech.innerHTML = array.join('');
    this.setState({new: false, link: false});
  },
  handleClick: function () {
    var speech = document.getElementById('text');
    var text = speech.innerHTML;
    var array = text.split('');

    var selection = window.getSelection();
    if (selection.toString().trim().length === 0) {
      this.clearAnnotationLink();
      return;
    }
    var index = selection.anchorOffset < selection.extentOffset ?
      selection.anchorOffset : selection.extentOffset;
    var length = selection.toString().length;
    var add_on = text.indexOf(selection.anchorNode.data);
    var substring = text.substring(index + add_on, index + length + add_on);
    if (text.indexOf(selection) === -1) {
      alert("CAN'T ANNOTATE ON TOP OF EXISTING ANNOTATIONS");
      this.setState({ link: false });
      return;
    }
    if (substring[substring.length-1] === "<") {
      alert("Click and drag to start annotations.");
      this.setState({ link: false });
      return;
    }

    if (selection.toString() !== substring) {
      length += 1;
    }
    array.splice(index + add_on, length,
      "<a id='active' class='annotation-link'>" +
       selection.toString() + "</a>" );
    speech.innerHTML = array.join('');
    this.setState({new: true, link: false});

  },
  createAnnotation: function (data) {
    ApiUtil.createAnnotation(data, function (annotation_id) {
        var text_link = document.getElementById('active');
        var url = "/speeches/" + this.props.params.speechID + "/annotations/" + annotation_id;
        text_link.setAttribute("href", '#' + url);
        text_link.removeAttribute("id");
        text_link.setAttribute("id", 'link-' + annotation_id);

        var speaker_params = {
          id: this.state.speech.id,
          speaker: this.state.speech.speaker,
          title: this.state.speech.title,
          content: document.getElementById('text').innerHTML
        };

        ApiUtil.updateSpeech(speaker_params, function () {
          this.setState({new:false, link: false});
          this.props.history.pushState(null, url);
        }.bind(this));
    }.bind(this));
  },
  clearAnnotationShow: function (e) {
    if (this.props.params.annotationID && e.target.className !== "annotation-link") {
      this.props.history.pushState(null, "/speeches/" + this.props.params.speechID);
    }
  },
  deleteComment: function (data) {
    ApiUtil.deleteSpeechComment(data);
  },
  deleteSpeech: function () {
    if (confirm("Are you sure you want to delete this entire speech? WARNING: You will lose all data associated with it.")) {
      data = {id: this.state.speech.id};
      ApiUtil.deleteSpeech(data, function () {
        this.props.history.pushState(null, "/");
      }.bind(this));
    }
  },
  editSpeech: function (e) {
    e.preventDefault();
    this.props.history.pushState(null, "/speeches/edit/" + this.props.params.speechID);
  },
  upvote: function () {
    data = {votable_id: this.props.params.speechID, votable_type: "Speech", value: 1};
    ApiUtil.createSpeechVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  downvote: function () {
    data = {votable_id: this.props.params.speechID, votable_type: "Speech", value: -1};
    ApiUtil.createSpeechVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  updateSpeechVote: function (data) {
    ApiUtil.updateSpeechVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  cancelSpeechVote: function (data) {
    ApiUtil.cancelSpeechVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  upvoteComment: function (data) {
    ApiUtil.createSpeechCommentVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  downvoteComment: function (data) {
    ApiUtil.createSpeechCommentVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  updateCommentVote: function (data) {
    ApiUtil.updateSpeechCommentVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  cancelCommentVote: function (data) {
    ApiUtil.cancelSpeechCommentVote(data, function () {
      ApiUtil.fetchSpeeches();
    });
  },
  render: function () {
    var hidden = (this.props.params.annotationID) ? "" : " invisible";
    var imgHidden = (this.props.params.annotationID || this.state.new || this.state.link) ? " image-hidden" : "";
    var delete_button; var edit_button;
    if (window.CURRENT_USER_ID === this.state.speech.user_id) {
      delete_button = <input className="cancel" onClick={this.deleteSpeech} value="Delete Speech" readOnly/>;
      edit_button = <input className="edit" onClick={this.editSpeech} value="Edit Speech" readOnly/>;
    }
    var style;
    if (this.state.speech.image_url) {
      style = {backgroundImage: "url(" + this.state.speech.image_url + ")"};
    }
    return(
      <div>
        <div className={"speech-image-container" + imgHidden} style={style}>
        </div>
        <div className="speech-container" onClick={this.clearAnnotationShow}>
          <h1>{this.state.speech.title}</h1>
          <VotingContainer upvote={this.upvote} downvote={this.downvote}
            updateVote={this.updateSpeechVote} cancelVote={this.cancelSpeechVote}
            votes={this.state.speech.votes}/>
          <div>
            {edit_button}
            {delete_button}
          </div>
          <h5>{this.state.speech.speaker}</h5>
          <div id="text" onMouseUp={this.newAnnotationTimeout}
            dangerouslySetInnerHTML={{__html: this.state.text}}>
          </div>
          <CommentContainer comments={this.state.speech.comments}
          handleSubmit={this.handleSubmit} deleteComment={this.deleteComment}
          upvote={this.upvoteComment} downvote={this.downvoteComment}
          updateCommentVote={this.updateCommentVote}
          cancelCommentVote={this.cancelCommentVote}/>
        </div>
        <div className={"annotation-container" + hidden}>
          <AnnotationLink visible={this.state.link} speech={this.state.speech}
            handleClick={this.handleClick}/>
          <AnnotationForm visible={this.state.new} speech={this.state.speech}
            cancel={this.cancel} createAnnotation={this.createAnnotation} pos={this.state.pos}/>
          {this.props.children}
        </div>
      </div>
    );
  }
});

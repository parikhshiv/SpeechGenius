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
  newAnnotation: function(e) {
    var selection = window.getSelection();
    if (!document.getElementById('active') &&
    selection.toString().trim().length > 0 && !(this.state.redirected)) {
      this.setState({ link: true });
    } else {
      this.setState({link: false, redirected: false});
    }
  },
  newAnnotationTimeout: function (e) {
    setTimeout(this.newAnnotation, 0);
  },
  componentWillReceiveProps: function (nextProps) {
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
    if (selection.toString().trim().length < 1 || redirect === 'redirect') {
      this.setState({ link: false, redirected: true });
    }
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
    // debugger;
    if (text.indexOf(selection) === -1) {
      alert("CAN'T ANNOTATE ON TOP OF EXISTING ANNOTATIONS");
      this.setState({ link: false });
      return;
    }
    // if (this._checkForExistingAnnotations(substring)) {
    //   alert("CAN'T ANNOTATE ON TOP OF EXISTING ANNOTATIONS");
    //   this.setState({ link: false });
    //   return;
    // }

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
  _checkForExistingAnnotations: function (selection) {
    return /<[a-z][\s\S]*>/i.test(selection);
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
  clearAnnotationShow: function () {
    if (this.props.params.annotationID) {
      this.props.history.pushState(null, "/speeches/" + this.props.params.speechID);
    }
  },
  deleteComment: function (data) {
    ApiUtil.deleteSpeechComment(data);
  },
  render: function () {
    var hidden= (this.props.params.annotationID) ? "" : " invisible";
    return(
      <div>
        <div className="speech-container" onClick={this.clearAnnotationShow}>
          <h1>{this.state.speech.title}</h1>
          <h5>{this.state.speech.speaker}</h5>
          <div id="text" onMouseUp={this.newAnnotationTimeout}
            dangerouslySetInnerHTML={{__html: this.state.text}}>
          </div>
          <CommentContainer comments={this.state.speech.comments}
          handleSubmit={this.handleSubmit} deleteComment={this.deleteComment}/>
        </div>
        <div className={"annotation-container" + hidden}>
          <AnnotationLink visible={this.state.link} speech={this.state.speech}
            handleClick={this.handleClick}/>
          <AnnotationForm visible={this.state.new} speech={this.state.speech}
            cancel={this.cancel} createAnnotation={this.createAnnotation}/>
          {this.props.children}
        </div>
      </div>
    );
  }
});

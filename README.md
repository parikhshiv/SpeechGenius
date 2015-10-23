### SpeechGenius

[Live Link](speechgenius.xyz)

## Summary

SpeechGenius is a full-stack web app built on Ruby on Rails and React.js. SpeechGenius allows users to add, share, and annotate speeches. Annotations are created by simply highlighting speech text and submitting annotation content. Users can also vote on content and comment on speeches and annotations.

## Landing Page

![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/landing.png)

## Speech View

![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/speech_view.png)

## Annotation Highlight

![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/annotation_highlight.png)

## Annotation View

![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/annotation_view.png)


## Interpreting Text Selection

Highlighting text within recipe body triggers annotation creation. The exact position of the highlighted text within the speech body must be correctly identified using window.getSelection, as this position is used to change the speech's text to incorporate the correct link:

```
  var selection = window.getSelection();
  var speech = document.getElementById('text');
  var text = speech.innerHTML;
  var array = text.split('');
  var index = selection.anchorOffset < selection.extentOffset ?
    selection.anchorOffset : selection.extentOffset;
  var length = selection.toString().length;
  var add_on = text.indexOf(selection.anchorNode.data);
  var substring = text.substring(index + add_on, index + length + add_on);
  array.splice(index + add_on, length,
    "<a id='active' class='annotation-link'>" +
     selection.toString() + "</a>" );
  speech.innerHTML = array.join('');
```

## Eager Loading

Content-rich pages like recipe show pages render data from speeches many nested associations. To accomplish this quickly, eager loading is utilized server-side:

```
def show
    @speech = Speech.includes({comments: [:user, :votes]},
     :votes).find(params[:id])
  render :show
end
```

The JSON API view may then immediately provide the dense data already retrieved from the database:

```
json.extract! @speech, :id, :title, :speaker, :user_id,
    :created_at, :updated_at, :image_url
json.content Speech.lyrics_formatting(@speech.content)
json.comments do
  json.partial! 'api/comments/comment', collection: @speech.comments, as: :comment
end
json.votes do
  json.partial! 'api/votes/vote', collection: @speech.votes, as: :vote
end
```

## Minimum Viable Product

SpeechGenius is a clone of Rap Genius for speech annotation built on Ruby on Rails and React.js. Users can:

 - Create accounts
 - Create sessions (log in)
 - Create speeches
 - Annotate speeches
 - Comment on speeches
 - Reply to annotations
 - Vote on annotations and replies
 - Search for speeches
 - Guest login

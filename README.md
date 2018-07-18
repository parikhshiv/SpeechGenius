### SpeechGenius

[Live Link](http://speech-genius.herokuapp.com/)

## Summary

SpeechGenius is a full-stack web app built on Ruby on Rails and React.js. SpeechGenius allows users to add, share, and annotate speeches. Annotations are created by simply highlighting speech text and submitting annotation content. Users can also vote on content and comment on speeches and annotations.

## Landing Page
![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/landing.png)

## Annotation View

![Landing Page](https://github.com/parikhshiv/SpeechGenius/blob/master/docs/screenshots/annotation_view.png)

## Eager Loading

Content-rich pages like speech show pages render data from speeches many nested associations. To accomplish this quickly, eager loading is utilized server-side:

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


## Interpreting Text Selection

Highlighting text within speech body triggers annotation creation. Using DOM manipulation,
a link to the appropriate annotation is manually spliced into the speech text:

```
  var selection = window.getSelection();

  // index depends on how text was highlighted (left to right vs right to left)
  var index = selection.anchorOffset < selection.extentOffset ?
    selection.anchorOffset : selection.extentOffset;

  // link is inserted into array of speech text, then array is joined back together
  array.splice(index + add_on, length,
    "<a id='active' class='annotation-link'>" +
     selection.toString() + "</a>" );

  speech.innerHTML = array.join('');
```

## Minimum Viable Product

SpeechGenius is a clone of Rap Genius for speech annotation built on Ruby on Rails and React.js. Users can:

 - Create accounts
 - Create sessions (log in)
 - Create, read, edit and delete speeches
 - Create, read, edit and delete annotations on speeches
 - Create, read and delete comments on speeches
 - Create, read and delete comments on annotations
 - Vote on speeches, annotations and comments - comments and new speeches should be ordered by total votes
 - Search for speeches
 - Guest login

# SpeechGenius

Heroku Link: TBD;

Summary: A clone of the website RapGenius, whose main functionality is to display song lyrics
and allow users to post annotations of these lyrics. A personal take on this idea
would be to have users post interpretations of various famous speeches, but
this could be determined towards the end of the project (would involve changing the seed data slightly).

Features:
1. Users be able to post songs and lyrics.
2. Users can highlight lines in a song to view others' annotations. They can also suggest edits to existing annotations. (there can be multiple contributors to an interpretation.). Finally, they can highlight plain-text lines with no existing annotations and add their own.
3. Interpretations can be upvoted an downvoted by other users.
4. Songs can be commented on, and comments can be upvoted and downvoted (replies not necessary)
5. There should be a general site search bar that will reveal appropriate songs, grouped by album.
6. Users need a necessary amount of "IQ" points in order to add songs and annotations
(keeps annotations relevent). Users gain IQ by suggesting intelligent improvements
to current annotations, or to current lyrics.
7. Bonuses: Cool home page that posts links to different songs, videos at the top of song pages,
different genres such as speeches, literature, and word etymologies (the list could go on...).
8. Forums, blogs, etc.


***After I drew up my wireframes, I realized I should have added one for the links to the annotations, which will be seperate components made up of highlighted text. When a user highlights
text that has not already been annotated, they should be prompted to create an annotation,
and as soon as they agree the plain text should be replaced with a React component (AnnotationLink) that links them to the appropriate Annotation, which the user will create. I'm not totally sure, but I think this can be done without creating a database table for these annotation links.***

## Minimum Viable Product

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, and edit songs
- [ ] Organize annotations within songs
- [ ] Create, read, and edit annotations
- [ ] Search through site for songs
- [ ] Create, read, edit and destroy comments

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

# Phase 1: User Authentication, Song Model and JSON API (Appx. 1 day)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Songs.

[Details][phase-one]

# Phase 2: Flux Architecture and Album and Song CRUD (2 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Song store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Song `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Songs can be created, read, edited and destroyed in the browser. Songs should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start using basic css/bootstrap for
styling.

[Details][phase-two]

# Phase 3: Song Annotation (3 days)

Phase 3 will be focused on setting up full functionality for song annotations. Users should
be able to highlight lines on in a song and be prompted with an annotations form. They should
be able to click on highlighted lines to view existing annotations. And they should be able
to edit existing annotations.

[Details][phase-three]

# Phase 4: Upvoting/Downvoting (1 days)

Should be able to upvote/downvote songs and annotations

[Details][phase-four]

# Phase 5: Flux Architecture and Comments CRUD (2 days)

Phase 5 introduces comments on songs, and on annotations.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes and make modals out of some elements.

### Bonus Features (TBD)
- Bonuses: Cool home page that posts links to different songs, videos at the top of song pages,
different genres such as speeches, literature, and word etymologies (the list could go on...).
- Forums, blogs, etc.

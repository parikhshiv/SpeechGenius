# Phase 4: Flux Architecture and Comments CRUD (2 days)

*SHOULD PROBABLY ASK TA WHY MY SHIT IS GLITCHY AND WHY I CAN"T SHOW ANNOTATION IMMEDIATELY AFTER
CREATING IT*

*Redo how you styled speech show pages*
*Order speeches alphabetically or something*
*Deleting annotations is pretty important*


*First thooo: add images to annotations and comments, and delete/update functions to
current user's annotations and comments*


*add images to annotations, comments, and speeches*

Rest of Day:

*Add SEARCH BAR oh no!*

Styling:
*Annotation text field is staying populated with old annotations - Clear that shit!*
*Create user button is weird*
*See if you can seed data with json*
*Style root page with pictures*
*annotation cancel button is too big*
*CAN"T SHOW ANNOTATION IMMEDIATELY AFTER
CREATING IT*
*put a background picture on the sign in pages?*

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* CommentsIndex
  - CommentIndexItem
* CommentForm

### Stores
* Comment

### Actions
* ApiActions.receiveAllComments
* ApiActions.receiveSingleComment
* ApiActions.deleteComment

### ApiUtil
* ApiUtil.fetchAllComment
* ApiUtil.fetchSingleComment
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap

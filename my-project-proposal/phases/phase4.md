# Phase 4: Flux Architecture and Comments CRUD (2 days)

*SHOULD PROBABLY ASK TA WHY MY SHIT IS GLITCHY AND WHY I CAN"T SHOW ANNOTATION IMMEDIATELY AFTER
CREATING IT*

*Redo how you styled speech show pages*
*Order speeches alphabetically or something*
*Deleting annotations is pretty important*


*First thooo: add images to annotations and comments, and delete/update functions to
current user's annotations and comments*

*Add SEARCH BAR oh no!*

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

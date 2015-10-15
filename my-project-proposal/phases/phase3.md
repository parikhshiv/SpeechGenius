# Phase 3: Song Annotation (3 days)

## Rails
### Models

*may need to pass things through params when creating annotations*

*can't update songs - must suggest improvement - make sure to parse songs for malicious
html on first submission, but after that allow it to update to include links*

*need to check out lyrics project to see how to make html safe*

*Order speeches alphabetically or something*

### Controllers

### Views

## Flux
### Views (React Components)
* SongsIndex
  - SongIndexItem
* SongForm
* AnnotationLinks
* Annotations

### Stores
* Song
* Annotations

### Actions
* ApiActions.receiveAllSongs
* ApiActions.receiveSingleSong
* ApiActions.deleteSong
* ApiActions.receiveAllAnnotations
* ApiActions.receiveSingleAnnotation
* ApiActions.deleteAnnotation

### ApiUtil
* ApiUtil.fetchAllSong
* ApiUtil.fetchSingleSong
* ApiUtil.createSong
* ApiUtil.editSong
* ApiUtil.destroySong
* All the same for Annotations

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap

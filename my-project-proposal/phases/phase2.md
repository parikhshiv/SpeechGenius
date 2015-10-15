# Phase 2: Flux Architecture and Album and Song CRUD (2 days)



Plan for today:

-get users on comments,
-do annotations back end, :content, :user_id, :speech_id
*split speech show page up into proper components - half page should be speech, half should be annotations sections*
-create annotations form
*only fetch this speeches annotations*
-connect annotations form to links on lines(hard)
## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* AlbumsIndex
  - AlbumIndexItem
* AlbumForm

### Stores
* Album

### Actions
* ApiActions.receiveAllAlbums
* ApiActions.receiveSingleAlbum
* ApiActions.deleteAlbum

### ApiUtil
* ApiUtil.fetchAllAlbum
* ApiUtil.fetchSingleAlbum
* ApiUtil.createAlbum
* ApiUtil.editAlbum
* ApiUtil.destroyAlbum

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* SongsIndex
  - SongIndexItem
* SongForm

### Stores
* Song

### Actions
* ApiActions.receiveAllSongs
* ApiActions.receiveSingleSong
* ApiActions.deleteSong

### ApiUtil
* ApiUtil.fetchAllSong
* ApiUtil.fetchSingleSong
* ApiUtil.createSong
* ApiUtil.editSong
* ApiUtil.destroySong

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap

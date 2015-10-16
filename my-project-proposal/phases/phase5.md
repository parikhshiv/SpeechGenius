# Phase 5: Votes (1 days)


*First thooo: add images to annotations and comments, and delete/update functions to
current user's annotations and comments*

## Rails
### Models
* Vote
* Voting

### Controllers
* Api::VotesController (create, destroy, index, show, update)

### Views
* annotations/index.json.jbuilder
* annotations/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* VotesIndex
  - VoteIndexItem
* VoteForm
* SearchIndex

### Stores
* Vote

### Actions
* ApiActions.receiveAllVotes
* ApiActions.receiveSingleVote
* ApiActions.deleteVote

### ApiUtil
* ApiUtil.fetchAllVotes
* ApiUtil.fetchSingleVote
* ApiUtil.createVote
* ApiUtil.editVote
* ApiUtil.destroyVote

## Gems/Libraries

# Phase 5: Votes (1 days)

figure out why votes take a while to render
comments voting renders wierd - jumps back and forth
sometimes pages renders glitchy

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

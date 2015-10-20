# Phase 5: Votes (1 days)

*After voting - replace log out button with dope about page, and put log out in top right of navbar.
Keep first six speeches on right, and populate the area beneath Che with the rest of the speeches.*
*put background pictures on speech show pages*

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

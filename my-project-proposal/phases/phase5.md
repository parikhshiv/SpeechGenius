# Phase 5: Votes (1 days)

*divide by window height for annotations show position*
*think about setting top to 50% at all times, and having parent element not be display:relative*
*add a song index container to center the right song index*
*make annotation link variable size (percentage)*
put percentages in front of sql query
enter comments - event listener
figure out why votes take a while to render
comments voting renders wierd - jumps back and forth
votes on annotations look funny with no picture
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

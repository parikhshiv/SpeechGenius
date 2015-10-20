$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('container');

  var App = React.createClass({
    render: function () {
      return (
        <div className="App">
          <Navbar/>
          <SecondNavbar/>
          {this.props.children}
        </div>
      );
    }
  });

  React.render((
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={SpeechIndex}/>
        <Route path="speeches/new" component={SpeechForm}/>
        <Route path="speeches/edit/:speechID" component={SpeechEditForm}/>
        <Route path="annotations/edit/:annotationID" component={AnnotationEditForm}/>
        <Route path="speeches/:speechID" component={SpeechShow}>
          // <Route path="annotations/link" components={AnnotationLink}/>
          // <Route path="annotations/new" components={AnnotationForm}/>
          <Route path="annotations/:annotationID" components={AnnotationShow}/>
        </Route>
      </Route>
    </Router>
  ), rootEl);
});

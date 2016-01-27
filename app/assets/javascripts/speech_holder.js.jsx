var StartReact = function () {
  $(function () {
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var IndexRoute = ReactRouter.IndexRoute;

    var rootEl = document.getElementById('container');
    if (rootEl.getAttribute("data")) {
      window.CURRENT_USER_ID = parseInt(rootEl.getAttribute("data"));
    }
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
          <IndexRoute component={SpeechIndexRight}/>
          <Route path="about" component={AboutPage}/>
          <Route path="speeches/new" component={SpeechForm}/>
          <Route path="speeches/edit/:speechID" component={SpeechEditForm}/>
          <Route path="speeches/:speechID/annotations/edit/:annotationID" component={AnnotationEditForm}/>
          <Route path="speeches/:speechID" component={SpeechShow}>
            <Route path="annotations/:annotationID" components={AnnotationShow}/>
          </Route>
        </Route>
      </Router>
    ), rootEl);
  });
}

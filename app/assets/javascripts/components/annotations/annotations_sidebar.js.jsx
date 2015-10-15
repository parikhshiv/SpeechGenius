var AnnotationsSidebar = React.createClass({
  render: function () {
    return (
      <div className="pull-right annotations">
        <AnnotationShow/>
        <AnnotationsForm/>
      </div>
    );
  }
});

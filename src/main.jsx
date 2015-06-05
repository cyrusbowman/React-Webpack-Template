var React = require('react');
var App = require('./App.jsx');

(function () {

	function render() {
		React.render(
			<App />,
			document.body
		);
	}
	render();
	
})();
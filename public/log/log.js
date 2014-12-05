var log = (function CLOG(_parent) {
	_parent.debug = function clog(text) {
		console.log('__DEBUG\n\n' + text + '\n\nDEBUG__');
	};
	return _parent;
})(log || {});

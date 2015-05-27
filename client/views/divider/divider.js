Template.divider1.rendered = function () {
	// $("#divider-1").stellar();
};

Template.divider2.rendered = function () {
	// $("#divider-2").stellar();

	if( window.innerWidth > 768) {
		$.stellar({
			horizontalScrolling: false,
			verticalScrolling: true,
			horizontalOffset: 0,
			verticalOffset: 0,
			responsive: true,
			scrollProperty: 'scroll',
			positionProperty: 'transform',
			parallaxBackgrounds: true,
			parallaxElements: false,
			hideDistantElements: true,
		});
	}
};
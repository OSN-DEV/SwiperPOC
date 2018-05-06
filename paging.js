var current = 0;
var maxWidth = 0;
var totalPage;
var currentPage = 1;
var offset = 1;
$(document).ready(function () {
	// var totalPage = Math.floor(document.body.scrollWidth / window.innerWidth);
	// totalPage = Math.floor(document.body.scrollWidth /  window.innerWidth);
	totalPage = Math.floor($(document).width() /  window.innerWidth);
	if (0 != (document.body.scrollWidth % window.innerWidth)) {
		totalPage = totalPage + 1;
	}
	// alert('w ' + document.body.scrollWidth + ', iw ' + $(document).width());

	maxWidth = totalPage * window.innerWidth;
	// document.querySelector("body").style.width = maxWidth + "px"; 
	$('body').css('width', maxWidth + "px");

	$('body').on('touchstart', onTouchStart); 
	$('body').on('touchmove', onTouchMove);
	$('body').on('touchend', onTouchEnd);
	scrollTo(0,  0 ) ;
	currentPage = 1;
});

var direction, position;
function onTouchStart(event) {
	console.log('onTouchStart');
	position = getPosition(event);
	console.log('start:'+position);
	direction = '';
}

function onTouchMove(event) {
	console.log('move:' + getPosition(event));
	console.log(position - getPosition(event));
	if (position - getPosition(event) > offset) {
		direction = 'left';
	} else if (position - getPosition(event) < (-1 * offset)) {
		direction = 'right';
	}
}

function onTouchEnd(event) {
		console.log('touch end:' + direction);
	if (!direction) {
		return;
	}
	if (direction == 'right'){
		moveToNext();
	} else {
		moveToPrev();
	}

}
function getPosition(event) {
	// return event.originalEvent.touches[0].pageX;
	return event.originalEvent.touches[0].pageX;
}

function moveToPrev() {
	currentPage--;
	if (currentPage < 1) {
		currentPage = 1;
	}
	moveToCurrent();
}
function moveToNext() {
	currentPage++;
	if (totalPage < currentPage) {
		currentPage = totalPage;
	}
	moveToCurrent();
}
function moveToCurrent() {
	var currentLeft = window.pageYOffset || document.documentElement.scrollLeft;
	var pos = -1 * (currentPage - 1) * window.innerWidth;
	console.log(currentLeft);
	console.log(currentPage);
	console.log(pos);



	// scrollTo(pos,  0) ;
	// $('html,body').animate({scrollTop: pos}, 500);
	$('html,body').animate({scrollLeft: pos}, 500);

	// var w = $('body').width();
	// var c = $('body').scrollLeft();
	// position = w + c;
	// console.log('pos:' + position);
	// $('body').animate({scrollLeft:position}, 500, 'swing');
}


'use strict';

$(function(){
	var width = 200;
	var height = 0;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d')
	var $video = $('#capture-video');
	var videoEl = document.getElementById('capture-video');
	var $capture = $('.capture');
	var $roll = $('#photo-stream');

	var streaming = false;

	navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

	console.log('getMedia: ');
	console.log(navigator.getMedia);

	// Get webcam...
	navigator.getMedia(
		// Call webcam, not micophone
		{video: true, audio: false },

		// If can use the webcam...
		function(stream) {
			// If firefox, use Mozilla method
			if (navigator.mozGetUserMedia) {
				videoEl.mozSrcObject = stream;
			// All other browsers, attach to <video> element
			} else {
				var vendorURL = window.URL || window.webkitURL;
				videoEl.src = vendorURL.createObjectURL(stream);
			}

			videoEl.play();
		},

		// If cannot use the camera...
		function(err) {
			console.error("An error occured! " + err);
		}
	);


	// Show video from webcam...
	$video.on('canplay', function(ev){
		console.log('Canplay video!');
		if (!streaming) {
			// height = video.videoHeight / (video.videoWidth/width);

			// // Firefox currently has a bug where the height can't be read from
			// // the video, so we will make assumptions if this happens.

			// if (isNaN(height)) {
			// 	height = width / (4/3);
			// }

			// video.setAttribute('width', width);
			// video.setAttribute('height', height);
			// canvas.setAttribute('width', width);
			// canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);


	// 'Capture' button event handler
	$capture.click(function(){
		console.log('Taking photo...');

		var width = $video.width();
		var height = $video.height();
		console.log('Image dimensions: '+ width + 'x' + height);

		// Draw image on video to canvas
		context.drawImage(videoEl, 0, 0, width, height);

		// ?? TODO: figure this out
		var data = canvas.toDataURL('image/png');
		// console.log('Data from photo:');
		// console.log(data);

		// Create new <img> element
		var newImg = $("<img class='photo' src='' alt='webcam image'>");
		newImg.attr('src', data);

		console.log('New image:');
		console.log(newImg);
		// insert new image into photo-roll
		$roll.append(newImg);
	});


});
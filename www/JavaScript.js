'use strict'
// Pseudo-constants
const CELL_SIZE = 0.25;
const ERASER_SIZE = 8;
const COLOR_GRID_LINE_MAJOR = new Color('#777');
const COLOR_GRID_LINE_MINIOR = new Color('#777');
const COLOR_SCALE_LINE = new Color('#c00');
const WIDTH_GRID_LINE_MAJOR = 2;

// Global variables
var elementCanvas = undefined;

var offset = new Position();
var offsetCenter = new Position();
var zoomscale = 5;
var frameWidth = undefined;
var frameHeight = undefined;
var canvasContext = undefined;
var elementOffsetX = undefined;
var elementOffsetY = undefined;
var animationStack = new AnimationStack();
var previousOffsetPos = undefined;
var canvasBoundingClientRect = undefined;

// Pre-init
new LanguageTranslator();

// Functions
function onload(){
	// Init element variables
	elementCanvas = document.getElementById('gameboard');

	// Init variables
	elementCanvas.classList.remove('hidden');
	window.onresize = resize;
	window.onresize();

	// Code
	elementCanvas.addEventListener('click', onclick, false);
	elementCanvas.addEventListener('contextmenu', function(event){event.preventDefault(); return false;}, false);

	canvasContext = elementCanvas.getContext('2d');
}
function getEventPos(event, raw=false){
	if(raw){return new Position(event.clientX, event.clientY);}

	let x = offset.X*zoomscale - offsetCenter.X;
	let y = offset.Y*zoomscale - offsetCenter.Y;

	if(event.touches === undefined)
	{
		x += event.clientX;
		y += event.clientY;
	}
	else
	{
		let dx = 0;
		let dy = 0;
		let length = event.touches.length;
		for(let index = 0; index < length; index++)
		{
			let touch = event.touches[index];
			dx += touch.clientX;
			dy += touch.clientY;
		}

		x += dx/length;
		y += dy/length;
	}

	x /= zoomscale;
	y /= zoomscale;

	return new Position(x, y);
}
function onclick(event){
	event.preventDefault();
	getEventPos(event, true);
	return false;
}
function resize(){
	offsetCenter.X = window.innerWidth / 2;
	offsetCenter.Y = window.innerHeight / 2;

	frameWidth = window.innerWidth;
	frameHeight = window.innerHeight;
	elementCanvas.width = frameWidth;
	elementCanvas.height = frameHeight;
	canvasBoundingClientRect = elementCanvas.getBoundingClientRect();
	animationStack.add(redrawCanvas);
}
function redrawCanvas(timespan){
	canvasContext.clearRect(0, 0, frameWidth, frameHeight);
	console.log("Hello World!");
}
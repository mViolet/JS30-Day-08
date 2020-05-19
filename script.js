// followed along with the tutorial mostly for this one.
// learned a lot about HTML5's canvas!

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const clear = document.querySelector('#clear');

//resize canvas to fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//styles for strokes / line join / cap
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 75;

//dummy vars for storing
//is the person currently drawing?
//where is the line being drawn?
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//draw function for whenever mouse is moved on canvas
function draw(e) {

	if(!isDrawing) return; //stops function if not drawing
	//everything here will run only if the mouse is being clicked & dragged on the canvas

	//set color by using hue variable
	ctx.strokeStyle = `hsl(${hue}, 100%, 75%)`;

	//start new path by emptying list of sub-paths
	ctx.beginPath();
	//move path beginning lastX & lastY position
	ctx.moveTo(lastX, lastY);
	//draw line to where event is occurring
	ctx.lineTo(e.offsetX, e.offsetY);
	//create visible stroke
	ctx.stroke();

	//increment hue
	hue++;

	//reset hue to 0 if value is over 360
	if (hue >= 360) {
		hue = 0;
	};

	//if statements for line width, using direction
	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 50) {
		direction = !direction;
	};

	if (direction) {
		ctx.lineWidth++;
	} else {
		ctx.lineWidth--;
	}
	//update position of X and Y. needs to be done here and in mousedown event listener
	// //long version:
	// lastX = e.offsetX;
	// lastY = e.offsety;

	//destructured:
	[lastX, lastY] = [e.offsetX, e.offsetY];

	//show movement in console
	console.log(e);
}

// event listeners to track mouse and either draw or set the value for isDrawing
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

//clear canvas
//using clearRect();
clear.addEventListener('mousedown', function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});
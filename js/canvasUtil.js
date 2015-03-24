function drawLine(context, point1, point2) {
	context.beginPath();
	context.moveTo(point1.x, point1.y);
	context.lineTo(point2.x, point2.y);
	context.strokeStyle = "black";
	context.stroke();
}

function clearCanvas(context){	
	context.clearRect(0, 0, 600, 400);
}
    
function drawCircle(context, point, size) {
	context.beginPath();
	context.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
	context.fillStyle = "#ccddff";
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = "#666666";
	context.stroke();  
}

function drawHighlightedCircle(context, point, size) {
	context.beginPath();
	context.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
	context.fillStyle = "#ffddcc";
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = "#666666";
	context.stroke();  
}

function drawPoints(context, points){
	for(i = 0; i < points.length; i++) {
		drawCircle(context, points[i], 7);
	}   
}
// Finds the closest point to the starting point.
function findClosestPoint(startPoint, points) {			
	closestCity = points[0];
	shortestDistance = 99999;
			
	for (x = 0; x < points.length; x++)
	{
		currentDistance = calculateDistance(points[x], startPoint);
		if (currentDistance < shortestDistance)
		{
			shortestDistance = currentDistance;
			closestCity = points[x];
		}
	}
	return closestCity;
}	
	
// Calculates the distance between two points.
function calculateDistance(point1, point2) {
	return Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2));
}	

// Returns a random number from the specified min to the max.
function getRandom(minRandom, maxRandom) {		
	return Math.floor((Math.random()*(maxRandom-minRandom))+minRandom);
}

function calculateTotalDistance(points){
	distance = 0;
	
	for(var i = 1; i < points.length; i++) { 
		distance += calculateDistance(points[i-1], points[i]);
	}		
	return distance;
}
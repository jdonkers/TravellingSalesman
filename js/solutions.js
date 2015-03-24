 function hillClimbing(path) {		
	route = path;
	
	bestDistance = calculateTotalDistance(route);
	totalSwaps = route.length * 500;
	
	for (var x = 0; x < totalSwaps; x++) {

		// Swap two random cities.
		index1 = getRandom(1, route.length-1);			
		index2 = getRandom(1, route.length-1);
		if (index1 === index2) { continue; }
		swap(route, index1, index2);

		// Recalculate the total distance.
		distance = calculateTotalDistance(route);

		// If the distance is less, keep the new path.		
		if (distance < bestDistance) {
			bestDistance = distance;
		} else {
			swap(route, index1, index2);
		}		
	}
	
	return route;	
}

function greedy(path) {		
	route = new Array();

	// Start with the first city.	
	startCity = path[0];		
	removeFromArray(path, startCity);
	route.push(startCity);			
	
	// Add the nearest city until the path is complete.
	cityCount = path.length;
	for(var i = 0; i < cityCount; i++) { 
		closestCity = findClosestPoint(startCity, path);	
		startCity = closestCity;			
		route.push(closestCity);
		removeFromArray(path, closestCity);
	}

	return route;
}	

function hillClimbingSeeded(path) {

	// Use the greedy algorithm to create a starting path.
	route = greedy(path);

	// Apply hill climbing the greedy path.
	route = hillClimbing(route);
	
	return route;				
}

function nearestInsertion(path) {
	route = new Array();

	// Start with the first city.	
	startCity = path[0];		
	removeFromArray(path, startCity);
	route.push(startCity);	

	// For each remaining city, find the best insertion.
	cityCount = path.length;
	for(var i = 0; i < cityCount; i++) {

		// Select the next city.
		workingCity = path[0];
		removeFromArray(path, workingCity);

		// Find the best index to insert the city.
		lowestDistanceIncrease = 9999999;
		bestInsertion = x;

		for(var x = 0; x < route.length; x++) {

			newDistance = calculateDistance(workingCity, route[x]);

			if (x == 0) {
				currentDistance = 0;
			} else {
				currentDistance = calculateDistance(route[x-1], route[x]);				
				newDistance += calculateDistance(route[x-1], workingCity);
			}

			distanceIncrease = newDistance - currentDistance;

			if (distanceIncrease < lowestDistanceIncrease) {
				bestInsertion = x;
				lowestDistanceIncrease = distanceIncrease;
			}
		}

		// Inser the city at the selected index.
		insertToArray(route, bestInsertion, workingCity);
	}

	return route;
}

function insertToArray(array, index, item) {
  	array.splice(index, 0, item);
};

function swap(array, x, y){
	var b = array[y];
	array[y] = array[x];
	array[x] = b;
}

function removeFromArray(array, item) {
	for(i = array.length; i--;) {
		if(array[i] === item) {
			array.splice(i, 1);
		}
	}
}	
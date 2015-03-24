function MainCtrl($scope) {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');   
		
	$scope.drawCities = function(){
		clearCanvas(context);
		drawPoints(context, $scope.cities);
		
		if ($scope.selectedCity) {
			drawHighlightedCircle(context, $scope.selectedCity, 10);
		}
		
		for(var i = 0; i < $scope.route.length; i++) { 
			drawCircle(context, $scope.route[i]);
			if(i > 0) {
				drawLine(context, $scope.route[i], $scope.route[i-1]);
			}
		}
	}	

	$scope.selectCity = function (city) {
		$scope.selectedCity = city;
		$scope.drawCities();
	}			
	
	$scope.solve = function() {		
		route = [];		
		cities = $scope.cities.slice(0);
		
		switch($scope.selectedAlgorithm.id)
		{
			case 1: 
				route = greedy(cities);
				break;
			case 2:
				route = hillClimbing(cities);
				break;
			case 3:
				route = hillClimbingSeeded(cities);
				break;
			case 4:
				route = nearestInsertion(cities);
				break;

		}
		
		$scope.totalDistance = calculateTotalDistance(route);
		$scope.route = route;
		$scope.drawCities();
	}	
	
    $scope.addCity = function() {
        id = 0;
		$scope.route = [];
        if($scope.cities.length > 0) {
            id = $scope.cities[$scope.cities.length-1].id + 1;
        }
        p = {id: id, x: $scope.x, y: $scope.y};
        $scope.cities.push(p);
        $scope.x = '';
        $scope.y = '';	
		$scope.drawCities();
    };
    
    $scope.removeCity = function(city) {	
		removeFromArray($scope.cities, city);
		$scope.route = [];
		
		if ($scope.selectedCity = city){
			$scope.selectedCity = [];
		}
		
		$scope.drawCities();
    }
	
	$scope.addRandom = function() {	
		id = 0;
        if($scope.cities.length > 0) {
            id = $scope.cities[$scope.cities.length-1].id + 1;
        }
		$scope.cities.push({id: id, x: getRandom(14, canvas.width - 14), y: getRandom(14, canvas.height - 14)}); 
		$scope.x = '';
        $scope.y = '';	
		$scope.route = [];
		$scope.drawCities();
	}
	
	$scope.initialize = function() {
		$scope.cities = [];	
		$scope.route = [];			
		$scope.algorithms = [];	
		
		$scope.totalDistance = 0;
		
		$scope.algorithms.push({id: 1, name: 'Greedy'}); 
		$scope.algorithms.push({id: 2, name: 'Hill Climbing'}); 
		$scope.algorithms.push({id: 3, name: 'Hill Climbing  (Seeded)'}); 	
		$scope.algorithms.push({id: 4, name: 'Nearest Insertion'});	
		$scope.selectedAlgorithm = $scope.algorithms[0];
		
		canvas.width = 600;
		canvas.height = 400;
		context.globalAlpha = 1.0;
		
		for (var x = 0; x < 7; x++) {	
			$scope.cities.push({id: x, x: getRandom(14, canvas.width - 14), y: getRandom(14, canvas.height - 14)});
		}
	
		$scope.selectedCity = $scope.cities[0];
		
		context.beginPath();	
		$scope.drawCities();
	}
    
	$scope.initialize();
}
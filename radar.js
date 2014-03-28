var techRadar = (function techRadar(){

	// setup margins and sizes
	var margin = {top: 20, right: 10, bottom: 20, left: 10};
	var width = 800 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom,
	radius = Math.min(width, height) / 2;

	// setup zooming functions
	var centered = null;
	var container = null;
	var zoom = d3.behavior.zoom()
		.scaleExtent([1, 10])
		.on("zoom", zoomed);
	function zoomed() {
		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}
	function removeZoom() {
		zoom.scale(1).translate([0,0]).event(container);
	}

	// draw rings and sectors of radar
	function drawRadar(rings, sectors){

		// calculate pie segments for equal sized sectors
		var pie = d3.layout.pie()
			.value(function() { return 1; })
			.sort(null);

		// setup arc functions for all rings
    	var arcs = [];
		var ringRadius = (radius / rings.length + 1);
		for (var i = 0; i < rings.length; i++){
			var arc = d3.svg.arc()
				.innerRadius(i * ringRadius)
				.outerRadius((i * ringRadius) + ringRadius);
			arcs.push(arc);
		}

		// draw all rings / sectors
		for (i = 0; i < rings.length; i++){
			var g = container.selectAll("empty")
				.data(pie(sectors))
				.enter()
				.append("g")
				.attr("class", function(d,si){return rings[i].name + " " + sectors[si].name;})

			g.append("path")
				.attr("d", arcs[i])

			g.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		}
	}

    function draw(rings, sectors, blips){
    	
    	// append svg
	    var svg = d3.select("#radar")
	    	.append("svg")
	    	.attr("width", width + margin.left + margin.right)
	    	.attr("height", height + margin.top + margin.bottom)
	  		.append("g")
	    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    	.call(zoom);

	    // add container for zooming
	    container = svg.append("g");

	    // draw radar
	    drawRadar(rings, sectors);

	    var ringRadius = (radius / rings.length + 1);

	    // function to transform blip positions
	    function getBlipRotateTransformString(data){
	    	console.log()
	    	var sectorWidth = 360 / sectors.length;
	    	var blipAngle = (Math.random() * sectorWidth) + (data.sector * sectorWidth);
	    	return "rotate(" + blipAngle + " " + width / 2 + " " + height / 2 + ")";
    	}

    	// function to calculate point distance from centre, remember svg 0,0 is top left!
    	function getBlipHeight(data){
    		return height / 2 - ((Math.random() * ringRadius) + (data.ring * ringRadius));
    	}

    	function selectBlip(data, index){
    		document.getElementById("blipName").innerHTML = data.name;
    		document.getElementById("blipDescription").innerHTML = data.description;
    	}

		// draw points
		container.selectAll(".blip")
			.data(blips)
			.enter()
			.append("circle")
			.attr("class", "blip")
			.attr("cx", width / 2)
			.attr("cy", getBlipHeight)
			.attr("r", 5)
			.attr("transform",  getBlipRotateTransformString)
			.on("mouseover", selectBlip)

    }

    // public api
	return {
		draw: draw,
		removeZoom: removeZoom
	};
})();
var radar = (function techRadar(){

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

    	var getRandom = new Math.seedrandom('xyz123');
    	
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
	    function getBlipGroupRotateTransformString(data){
	      var sectorWidth = 360 / sectors.length;
	      var blipAngle = (getRandom() * sectorWidth) + (data.sector * sectorWidth);
	      data.rotateAngle = blipAngle;
	      return "rotate(" + blipAngle + " " + width / 2 + " " + height / 2 + ")";
	    }

	    // reverse blip group rotation
	    function getReverseBlipGroupRotateTransformString(data){
	      return "rotate(" + (360 - data.rotateAngle) + ")";
	    }

	    // function to calculate point distance from centre, remember svg 0,0 is top left!
	    function getBlipGroupPositionTransformString(data){
	      var blipHeight = height / 2 - ((getRandom() * ringRadius) + (data.ring * ringRadius));
	        return "translate(" + width / 2 + "," + blipHeight + ")"
	    }

    	function selectBlip(data, index){
    		document.getElementById("blipName").innerHTML = (index + 1) + ": " + data.name;
    		document.getElementById("blipDescription").innerHTML = data.description;
    	}

		// draw points
		var blipGroups = container.selectAll(".blip")
			.data(blips);

		blipGroups.enter()
			.append("g")
			.attr("transform", function(datum){return getBlipGroupRotateTransformString(datum) + " " + getBlipGroupPositionTransformString(datum) })
			.on("mouseover", selectBlip)

		blipGroups.append("circle")
			.attr("r", 8)
			.attr("class", "blipCircle")

		blipGroups
			.append("text")
			.attr("text-anchor", "middle")
			.text(function(d,i) { return "" + (i + 1); })
			.attr("dy", "3px")
			.attr("class", "blipText")
			.attr("transform", function(datum){return getReverseBlipGroupRotateTransformString(datum) })
    }

    // public api
	return {
		draw: draw,
		removeZoom: removeZoom
	};
})();
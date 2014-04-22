TechRadarD3
-------
A radar visualisation in D3.

At work we've been putting together a technology radar inspired by [ThoughtWorks](http://www.thoughtworks.com/radar) and an article by [Neal Ford](http://nealford.com/memeagora/2013/05/28/build_your_own_technology_radar.html). 

There are a few javascript radar visualisation helpers out there but I thought it would be fun to create my own. See it in action [here](http://ryangough.github.io/radar/radar.html).

How To Use
-------

Look in radar.html for an example of how things could be put together.

You'll need to include [d3.js](http://d3js.org/) and [seedrandom](https://github.com/davidbau/seedrandom) before including radar.js. This will expose an object called "radar" which has two method properties, "draw" and "removeZoom".

draw renders the visualisation, and takes three arguments, js objects representing the rings, sectors and blips to be drawn. See radarData.js for examples of the format. 

removeZoom just resets the zoomed state of the visualisation - double click to zoom.

Currently the radar will be drawn within an element with id "#radar". Hovering over a blip will attempt to put the associated text in elements with id "#blipName" and "#blipDescription". Blip position is random within its specified segment.

Blips will be randomly positioned in the relevant ring / sector based on the random seed, so try different seeds to get different layouts. Hopefully at some point i'll make it position the blips more inteligently so that this won't be necessary!

Work To Do
-------
This is a fairly quick hack so there is lots to improve (please feel free to submit a pull request!). As I say, it would be nice for the blips to be positioned inteligently to prevent overlaps etc. Some of the code is not really idiomatic D3 so that could stand to be cleaned up. The need to adjust the rotation of the blips so that the numbers are correctly oriented is a bit of a faff, i'm sure there is a much better way to handle that whole thing. Better drag / zoom functionality would be nice. Enhanced configurability also. As I say, lots to improve!
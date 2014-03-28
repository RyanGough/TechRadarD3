TechRadarD3
-------
A radar visualisation in D3.

At work we've been putting together a technology radar inspired by [ThoughtWorks](http://www.thoughtworks.com/radar) and an article by [Neal Ford](http://nealford.com/memeagora/2013/05/28/build_your_own_technology_radar.html). 

There are a few javascript radar visualisation helpers out there but I thought it would be fun to create my own, so here it is.

How To Use
-------

Look in radar.html for an example of how things could be put together.

Basicaly you just need to include radar.js on your page, then call techRadar.draw passing three objects, one representing the rings of the radar, one the sectors and one the blips. Look in radarData.js for an example of the required structure of these objects.

Currently the radar will be drawn within an element with id "#radar". Hovering over a blip will attempt to put the associated text in elements with id "#blipName" and "#blipDescription". Blip position is random within its specified segment.

Work To Do
-------
This is a fairly quick hack so there is lots to improve (please feel free to submit a pull request!). Currently blips are placed entirely randomly within a segment so there could be overlaps. Some of the code is not really idiomatic D3 so that could stand to be cleaned up. Better drag / zoom functionality would be nice. Enhanced configurability also. As I say, lots to improve!
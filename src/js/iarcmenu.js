

function iArcMenu(opt) {

	if (!opt.dom) {
		throw new Error('Please Input Major Dom');
	}

	//framework option
	// shape content data
	this.data = opt.data;

	this.control = opt.control;

	//wrapper dom
	this.dom = opt.dom;

	//move distance
	this.dist = opt.distance || 100;

	//degree of starting point
	this.startDegree = 0;

	// display offset degree, clockwise
	this.offsetDegree = opt.offsetDegree || 0;

	//menu display degree only those figures that mod 6 = 0  can be accepted, only for type 'arc'
	this.rangeDegree = opt.rangeDegree || 360;

	//distance difference between 2 shapes, only for type 'line'
	this.diffDist = opt.diffDist || 100;

	//diameter of cicles
	this.diameter = opt.diameter || 50;

	//another form of degree
	this.radiusPI = 2 * Math.PI / 360;

	this.duration = opt.duration || 1000;

	this.type = opt.type || 'arc';

	// circle elements
	this.ele = [];

	//element position array
	this.elePos = [];

	// render basic menu html
	this.renderHTML();

	//calculate menu transform degree and distance
	this.transformDist();
}

// render basic menu html
iArcMenu.prototype.renderHTML = function(){

	var item = false;
	// var subItem = false;
	var len = this.data.length;

	//render control btn at last index
	for (var i = 0; i <= len; i++) {
		item = document.createElement("div");
		item.style.width = this.diameter + 'px';
		item.style.height = this.diameter + 'px';
		item.style.WebkitBorderRadius = (this.diameter / 10) + 'em';
		item.style.MozBorderRadius = (this.diameter / 10) + 'em';
		item.style.BorderRadius = (this.diameter / 10) + 'em';

		if (i === len) {
			item.className = 'iArcMenu-control iArcMenu-control-on';
			item.style.zIndex = this.data.length;

			this.dom.appendChild(item);
			this.bindControlTouchHandler(item);
		}
		else {
			item.className = 'iArcMenu-shape';
			item.setAttribute('data-id', i);
			item.style.zIndex = (len - i);
			item.innerHTML = this.data[i].content;

			this.dom.appendChild(item);
			this.ele.push(item);
			this.bindItemTouchHandler(i);
		}

	}
		
};

iArcMenu.prototype.bindItemTouchHandler = function(index) {

	if (this.data[index].callback) {
		this.ele[index].addEventListener('touchstart', this.data[index].callback, false);
	}
}

iArcMenu.prototype.bindControlTouchHandler = function(control) {

	var self = this;
	this.controlToggle = 0;

	control.addEventListener('touchstart', function() {
		//menu start translate
		if (self.controlToggle === 0) {
			self.animate('forward');
			self.controlToggle = 1;
			this.className = 'iArcMenu-control iArcMenu-control-off';
		}
		else {
			self.animate('backward');
			self.controlToggle = 0;
			this.className = 'iArcMenu-control iArcMenu-control-on';
		}
		
	}, false);
}

//calculate menu transform degree and distance
iArcMenu.prototype.transformDist = function() {

	this.transformData = [];

	var len = this.data.length;

	if (this.rangeDegree === 360) {
		this.degree = this.rangeDegree / len;
	}
	else {
		this.degree = this.rangeDegree / (len - 1);
	}

	var item = false;
	var rotateDegree = this.startDegree + this.offsetDegree;
	var transferDist = this.dist;

	if (this.type === 'line') {
		for (var i = 0; i < len; i++) {
		
			item = {
				x: Math.floor(Math.cos(rotateDegree * this.radiusPI) * transferDist * 100) / 100,
				y: Math.floor(Math.sin(rotateDegree * this.radiusPI) * transferDist * 100) / 100
			};

			this.transformData.push(item);
			transferDist += this.diffDist;
		}
	}
	else {
		for (var i = 0; i < len; i++) {
			
			item = {
				x: Math.floor(Math.cos(rotateDegree * this.radiusPI) * transferDist * 100) / 100,
				y: Math.floor(Math.sin(rotateDegree * this.radiusPI) * transferDist * 100) / 100
			};

			this.transformData.push(item);
			rotateDegree += this.degree;
		}
	}
}

//menu start translate
iArcMenu.prototype.animate = function(type) {

	var len = this.data.length;

	for (var i = 0; i < len; i++) {
		this.ele[i].style.WebkitTransition = '-webkit-transform 500ms';
	}

	for (var i = 0; i < len; i++) {
		this._moveAni(i, type);
	}

};

//menu translate animation, forward or backward animation
iArcMenu.prototype._moveAni = function(index, type) {

	var ele = this.ele;
	var transformData = this.transformData;

	setTimeout(function(){
			ele[index].style.WebkitTransform = (type === 'forward')? 
				'translate3d('+ transformData[index].x +'px, ' + transformData[index].y + 'px, 0)' :
				'translate3d(0, 0, 0)';
	}, this.duration);
}
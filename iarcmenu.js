

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
	this.diameter = 50;

	//another form of degree
	this.radiusPI = 2 * Math.PI / 360;

	this.duration = opt.duration || 1000;

	this.type = opt.type || 'arc';

	// starting poinst position
	this.centerX = 0;
	this.centerY = 0;

	// circle elements
	this.ele = [];

	//element position array
	this.elePos = [];

	// render basic menu html
	this.renderHTML();

	//calculate menu transform degree and distance
	this.transformDist();

	//render control button
	this.renderControlBtn();

	//menu start translate
	// this.animate();
}

// render basic menu html
iArcMenu.prototype.renderHTML = function(){

	var item = false;
	var subItem = false;
	var len = this.data.length;

	for (var i = 0; i < len; i++) {

		item = document.createElement("div");
		item.className = 'arcMenu-shape';
		item.setAttribute('data-id', i);
		item.style.backgroundColor = this.data[i].color;
		item.style.zIndex = (len - i);

		subItem = document.createElement("div");
		subItem.innerHTML = this.data[i].content;
		item.appendChild(subItem);

		this.dom.appendChild(item);

		this.ele.push(item);

		this.bindTouchHandler(i);

	}

	// if (len > 0) {
	// 	var center = this.ele[0].getBoundingClientRect();
	// 	this.centerX = center.left + this.diameter / 2;
	// 	this.centerY = center.top + this.diameter / 2;
	// }
		
};

iArcMenu.prototype.bindTouchHandler = function(index) {

	if (this.data[index].callback) {
		this.ele[index].addEventListener('touchstart', this.data[index].callback, false);
	}
}

iArcMenu.prototype.renderControlBtn = function () {

	item = document.createElement("div");
	item.className = 'arcMenu-control arcMenu-control-on';
	item.style.zIndex = this.data.length;
	subItem = document.createElement("div");

	item.appendChild(subItem);
	this.dom.appendChild(item);

	var self = this;
	this.controlToggle = 0;

	item.addEventListener('touchstart', function() {
		//menu start translate
		if (self.controlToggle === 0) {
			self.animate();
			self.controlToggle = 1;
			this.className = 'arcMenu-control arcMenu-control-off';
		}
		else {
			self.resume();
			self.controlToggle = 0;
			this.className = 'arcMenu-control arcMenu-control-on';
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
iArcMenu.prototype.animate = function() {

	var len = this.data.length;

	for (var i = 0; i < len; i++) {
		this.ele[i].style.WebkitTransition = '-webkit-transform 500ms';
	}

	for (var i = 0; i < len; i++) {
		this._moveAni(i);
	}

};

//menu translate animation
iArcMenu.prototype._moveAni = function(index) {

	var ele = this.ele;
	var transformData = this.transformData;

	setTimeout(function(){
			ele[index].style.WebkitTransform = 'translate3d('+ transformData[index].x +'px, ' + transformData[index].y + 'px, 0)';
	}, this.duration);
}

//menu resume shopes
iArcMenu.prototype.resume = function() {

	var len = this.data.length;

	for (var i = 0; i < len; i++) {
		this.ele[i].style.WebkitTransition = '-webkit-transform 500ms';
	}

	for (var i = 0; i < len; i++) {
		this._resumeAni(i);
	}

};

//menu translate animation
iArcMenu.prototype._resumeAni = function(index) {

	var ele = this.ele;

	setTimeout(function(){
			ele[index].style.WebkitTransform = 'translate3d(0, 0, 0)';
	}, this.duration);
}

//get position of menu circles after animations
iArcMenu.prototype._getPos = function() {

	var self = this;
	var position = false;
		
	for (var i = 0; i < self.ele.length; i++) {
		self.elePos[i] = {};
		position = self.ele[i].getBoundingClientRect();
		self.elePos[i].x = position.left + self.diameter / 2;
		self.elePos[i].y = position.top + self.diameter / 2;
	}

}

	var context;
	var f;
	
	function paint(){
		var n = Number(document.getElementById('nSlider').value);
		context.beginPath();
		context.lineWidth="5";
		context.strokeStyle="black";
		context.moveTo(10,480);
		context.lineTo(1190,480);
		context.moveTo(20,490);
		context.lineTo(20,10);
		context.lineCap = 'round';
		context.stroke();
		
		var w = 1160/(n+1);

		if(document.getElementById('showSeries').checked){
			if(document.getElementById('overUnder_over').checked){
				context.beginPath();
				context.globalAlpha = 0.8;
				context.strokeStyle="black";
				context.lineWidth="1";
				var x = 20;
				for(i=1; i<=n; i++){
					x += w;
					var h = 400*f(i);
					context.fillStyle="blue";
					context.fillRect(x,479-h,w,h);
					context.strokeRect(x,479-h,w,h);
				}
				context.stroke();
			}
			if(document.getElementById('overUnder_under').checked){
				context.beginPath();
				context.globalAlpha = 0.8;
				context.strokeStyle="black";
				context.lineWidth="1";
				var x = 20;
				for(i=1; i<=n; i++){
					x += w;
					var h = 400*f(i+1);
					context.fillStyle="green";
					context.fillRect(x,479-h,w,h);
					context.strokeRect(x,479-h,w,h);
				}
				context.stroke();
			}
		}
		
		if(document.getElementById('showFunction').checked){
			//draw function
			context.beginPath();
			context.lineWidth="3";
			context.strokeStyle="red";
			context.moveTo(21,480-400*f(1/w))
			for(var x=21; x<=1180; x++)
				if(400*f((x-21)/w) < 460)
					context.lineTo(x,480-400*f((x-20)/w));
				else
					context.moveTo(x,480-400*f((x+1-20)/w));
			context.stroke();
		}
		
	}

	function updateGraph(){
		context.clearRect(0,0,1200,500);
		paint();
	}
	
//	function f(i){
//		return 1/i;
//	}
	
	function updateF(){
		if(document.getElementById('f1Overx').checked)
			f = function(i){
					return 1/i;
				}
		if(document.getElementById('f1Overx2').checked)
			f = function(i){
					return 1/(i*i);
				}
		if(document.getElementById('f1Overx3').checked)
			f = function(i){
					return 1/(i*i*i);
				}
		if(document.getElementById('f1Overx101').checked)
			f = function(i){
					return 1/Math.pow(i,1.01);
				}
		if(document.getElementById('f1Overx099').checked)
			f = function(i){
					return 1/Math.pow(i,0.99);
				}
		if(document.getElementById('f1OverSqrtx').checked)
			f = function(i){
					return 1/Math.sqrt(i);
				}
		if(document.getElementById('f1Over2x').checked)
			f = function(i){
					return 1/Math.pow(2,i);
				}
		updateGraph();
	}
	
	function update(){
		document.getElementById('nSlider').onchange = updateGraph;
		document.getElementById('nSliderVal').onchange = updateGraph;
		document.getElementById('showFunction').onchange = updateGraph;
		document.getElementById('showSeries').onchange = updateGraph;
		document.getElementById('overUnder_over').onchange = updateGraph;
		document.getElementById('overUnder_under').onchange = updateGraph;
		document.getElementById('f1Overx').onchange = updateF;
		document.getElementById('f1Overx2').onchange = updateF;
		document.getElementById('f1Overx3').onchange = updateF;
		document.getElementById('f1Overx099').onchange = updateF;
		document.getElementById('f1Overx101').onchange = updateF;
		document.getElementById('f1OverSqrtx').onchange = updateF;
		document.getElementById('f1Over2x').onchange = updateF;
	}

	window.onload = function() {
		canvas = document.getElementById('canvas1');
		canvas.style.border = "black 1px solid"
		context = canvas.getContext('2d');
		updateF();
		paint();
		update();
	}


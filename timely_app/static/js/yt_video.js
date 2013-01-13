function VideoTimer(_video,_interval){
	var divTimerContainer = document.createElement("div");
	var divTimeRemaining = document.createElement("div");
	var divTimeElapsed = document.createElement("div");

	var animFrame = 0;
	var video = _video;
	var interval = _interval;

	this.render = function(container){
		divTimerContainer.setAttribute("style","width:" + video.getWidth() + "px;height:20px;position:relative;top:-" + (video.getHeight()+20) + "px;");
		
		
		divTimeRemaining.setAttribute("id","divTimeRemaining" + video.getPId());
		divTimeRemaining.setAttribute("class","divTimeRemaining");

		
		divTimeElapsed.setAttribute("id","divTimeElapsed" + video.getPId());
		divTimeElapsed.setAttribute("class","divTimeElapsed");
		divTimeElapsed.setAttribute("animframe",0);

		divTimerContainer.appendChild(divTimeRemaining);
		divTimerContainer.appendChild(divTimeElapsed);    
		
		container.appendChild(divTimerContainer);			
	}

	this.start = function(){
		animFrame +=1;
		if( video.getPlayer().getDuration()/video.getWidth()*(1000.0/interval)*animFrame >= video.getWidth() ){
			divTimeElapsed.style.width = video.getWidth();
		}
		else{    				
			divTimeElapsed.style.width = video.getPlayer().getDuration()/video.getWidth()*(1000.0/interval)*animFrame;
			console.log(video.getPlayer().getDuration(),video.getWidth(),(1000.0/interval),animFrame);
		}
	}

	this.clear = function(){
		animFrame = 0;
	}

}

function Video(_pId,_width,_height){
	var pId = _pId;
	var pName = "ytplayer" + pId;
	var width = _width;
	var height = _height;
	var interval = 500;
	var instanceInterval = null;

	this.getWidth = function(){return width;};
	this.getHeight = function(){return height;};
	this.getPlayer = function(){return player;};
	this.getPId = function(){return pId;};
	this.getPName = function(){return pName;};

	var videoContainer = function(){
		var divVideoContainer = document.createElement("div");
		divVideoContainer.setAttribute("id","divVideoContainer" + pId);

		var divVideo = document.createElement("div");
		divVideo.setAttribute("id","divVideo" + pId);

		divVideoContainer.appendChild(divVideo);  

		return divVideoContainer;  			
	}

	var videoControl = function(){
		var divCtrl = document.createElement("div");
		divCtrl.setAttribute("id","divCtrl" + pId);
		divCtrl.setAttribute("style","background-color:red;width:" + width + "px;height:" + 20 + "px;position:relative;top:0px;left:0px");				

		var aplay = document.createElement("a");
		aplay.setAttribute("href","javascript:vc.playVideo(" + pId + ");");
		aplay.appendChild(document.createTextNode("Play"));
		
		var apause = document.createElement("a");
		apause.setAttribute("href","javascript:vc.pauseVideo(" + pId + ");");
		apause.appendChild(document.createTextNode("Pause"));

		divCtrl.appendChild(aplay);
		divCtrl.appendChild(apause);    			

		return divCtrl;					
	}

	var videoPlayer = function(){
		var params = { allowScriptAccess: "always" };
		var atts = { id: pName };

		swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
		                   "version=3&enablejsapi=1&playerapiid=" + pId, 
		                   "divVideo" + pId, width, height, "9", null, null, params, atts);
	}


	var vcontainer = videoContainer();
	var controls = videoControl();
	var player;
	var timer = new VideoTimer(this,500);

	this.playerReady = function(){
		player = document.getElementById(pName);
		console.log(player);
	}

	this.render = function(container){
		vcontainer.appendChild(controls);
		timer.render(vcontainer);

		container.appendChild(vcontainer);
		videoPlayer();
	}

	this.playVideo = function(){
		player.playVideo();
		instanceInterval = window.setInterval(timer.start,interval);
	}

	this.pauseVideo = function(){
		window.clearInterval(instanceInterval);
		player.pauseVideo();
	}
	

}

function VideoControl(){
	var id = 1;
	var width = 640;
	var height = 360;

	var videos = {};
	var nextId = function(){return id++;};	

	this.createVideo = function(container){
		var video = new Video(nextId(),width,height);
		video.render(container);

		videos[video.getPId()] = video;
	}		

	this.loadVideo = function(pId,videoId){
		videos[pId].getPlayer().cueVideoById(videoId);
	}

	this.playVideo = function(pId){
		videos[pId].playVideo();
	}

	this.pauseVideo = function(pId){
		videos[pId].pauseVideo();
	}

	this.playerReady = function(pId){				
		console.log(videos,pId);
		videos[pId].playerReady();
	}
}
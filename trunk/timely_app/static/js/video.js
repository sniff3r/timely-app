			var videoControl = new VideoControl();
			
			function VideoControl(){
				var videos = [];
				
				this.restartVideo = function(videoId){
					videos[videoId].hideMask();
					videos[videoId].restart();
				}
				
				this.doYouHave = function(videoId){
					if(videos[videoId]){
						return true;
					}
				}
				
				this.addVideo = function(videoId){
					videos[videoId] = new Video(videoId);
				}
				
				this.getVideo = function(videoId){
					return videos[videoId];
				}
				
				this.answerSurvey = function(videoId){
					return;
				}
				
			}
			
			function Video(videoId){
				var _videoId = videoId;
				var _mask = new VideoMask(videoId);				
				var _videoObj = document.getElementById(videoId);
				
				this.renderMask = function(){
					return _mask.render();
				}
				this.hideMask = function(){
					_mask.hide();
				}
				this.restart = function(){
					_videoObj.currentTime = 0;
					_videoObj.play();
				}
				this.ended = function(){
					return _videoObj.ended;
				}
			}
		
			function VideoMask(videoId){
				var _videoId = videoId;
				var _renderObj = null;
				
				this.render = function(){
					if(_renderObj!=null){
						return _renderObj;
					}
									
					
					var vm = document.createElement("div");
					vm.setAttribute("class","videoMask");
					
					var con = document.createElement("div");
					con.setAttribute("class","maskControl");
					
						var al = document.createElement("a");			
						al.setAttribute("href","javascript:videoControl.restartVideo(\"" + _videoId + "\");");
						
							var ml = document.createElement("div");
							ml.setAttribute("class","maskLeft" );
							
								var dl = document.createElement("div");
								dl.setAttribute("class","controlIcon controlIconLeft");
								var labell = document.createElement("label");
								labell.appendChild(document.createTextNode("Restart"));
								
							ml.appendChild(dl);
							ml.appendChild(labell);
						al.appendChild(ml);
						
						var ar = document.createElement("a");			
						ar.setAttribute("href","javascript:videoControl.answerSurvy(\"" + _videoId + "\");");
						
							var mr = document.createElement("div");
							mr.setAttribute("class","maskRight" );
							
								var dr = document.createElement("div");
								dr.setAttribute("class","controlIcon controlIconRight");
								var labelr = document.createElement("label");
								labelr.appendChild(document.createTextNode("Answer Survey"));					
							
							mr.appendChild(dr);
							mr.appendChild(labelr);
						ar.appendChild(mr);								
				
					con.appendChild(al);
					con.appendChild(ar);
					vm.appendChild(con);
					
					_renderObj = vm;
					
					var p = document.getElementById(_videoId).parentNode;
					p.appendChild(_renderObj);					
				}
				
				this.hide = function(){
					document.getElementById(_videoId).parentNode.removeChild(_renderObj);
					_renderObj=null;
				}
			}
		
			
			function videoStart(ev){
				if(!videoControl.doYouHave(ev.target.id)){
					videoControl.addVideo(ev.target.id);
				}
			}
			
			function endVideo(ev){
				videoControl.getVideo(ev.target.id).renderMask();
			}
			
			function load(){
				var v = document.getElementById("meuVideo");
				v.addEventListener("ended",endVideo);
				v.addEventListener("play",videoStart);
			}


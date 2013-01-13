			function giveMeValue(s){
				var res = s.match(/\d+/g);
				if(res.length>0){
					return parseInt(res[0]);
				}else{
					return 0;
				}
			}

			function getTotalHeight(el){
				var mtop = parseInt(el.css("margin-top").match(/\d+/g)[0]);
				var mbot = parseInt(el.css("margin-bottom").match(/\d+/g)[0]);

				var ptop = parseInt(el.css("padding-top").match(/\d+/g)[0]);
				var pbot = parseInt(el.css("padding-bottom").match(/\d+/g)[0]);

				return parseInt(el.css("height").match(/\d+/g)[0]) + mtop + mbot + ptop + pbot;
			}

			function getTotalWidth(el){
				var mlef = parseInt(el.css("margin-left").match(/\d+/g)[0]);
				var mrig = parseInt(el.css("margin-right").match(/\d+/g)[0]);

				var plef = parseInt(el.css("padding-left").match(/\d+/g)[0]);
				var prig = parseInt(el.css("padding-right").match(/\d+/g)[0]);

				return parseInt(el.css("width")) + mlef + mrig + plef + prig;
			}

			$(document).ready(function(){
				$(window).unbind('scroll').scroll(function(){
					var scrollWin = $(window).scrollTop();
					var topHeight = getTotalHeight($("#top"));
					var stepsHeight = getTotalHeight($("#easySteps"));
					var middleHeight = getTotalHeight($("#middle"));
					var bottomHeight = getTotalHeight($("#bottom"));

					var allMarginTop = giveMeValue ( $("#all").css("margin-top") );
					var allMarginBottom = giveMeValue ( $("#all").css("margin-bottom") );					

					var headerHeight = topHeight + stepsHeight;
					var newTopPos = topHeight + allMarginTop;

					var t = $(document).height() - (bottomHeight + allMarginBottom + allMarginTop + $(".jackpotRight").height());

					var diff = scrollWin+topHeight-t;

					if( scrollWin < (headerHeight-topHeight)  ){
						newTopPos = headerHeight + allMarginTop - scrollWin;
					}else if( diff>=0 ) {
						newTopPos = -(diff-topHeight);
					}
					$(".jackpotRight").css("top",newTopPos + "px");					

				});	
			});
//给id为box的标签添加鼠标事件
// localStorage.setItem("scoremax",0);//历史高分清零
var index=document.getElementById("index")
	function ks(){
		index.style.display="none";
	}
var img=document.getElementById("img");
var music=document.getElementById("myMusic");
	music.play();
var yx=document.getElementById("yx");
var img2=document.getElementById("img2")
	img2.onclick=function(){
		if(img2.getAttribute("src")=="2.png"){
				img2.setAttribute("src","1.png");
				yx.pause();
		}else{
				img2.setAttribute("src","2.png");
				yx.play();
			}
		}
var music=document.getElementById("myMusic");
	img.onclick=function(){
		if(img.getAttribute("src")=="2.png"){
			img.setAttribute("src","1.png");
			music.pause();

		}else{
			img.setAttribute("src","2.png");
			music.play();
		}
	}
var box=document.getElementById("box");
		var data={
			startX:0,
			startY:0,
			endX:0,
			endY:0,
			score:0,
			scoremax:0,
			isGameOver:false,
			numbers:[[0,0,0,2],[0,4,0,0],[0,2,0,0],[0,2,0,0]]
		};
		//当网页加载时  取出最高分
		var max=localStorage.getItem("scoremax");
		if(max==null){
			max=0;
		}
		document.getElementById("scoremax").innerHTML=max;
//我们将网页上面的标签，以字符串的形式拼接起来
		function show(){
			var str="";
			for(var i=0;i<data.numbers.length;i++){
				//每一行的开始
				str +='<div class="h">';
				for(var j=0;j<data.numbers[i].length;j++){
					//每一列
					str +='<div class="h_ h_'+data.numbers[i][j]+'">'+data.numbers[i][j]+'</div>';
				}
				//一行循环
				str+='</div>';
			}
			//返回的是数组  
			document.getElementsByClassName("buttom")[0].innerHTML=str;
		}
		//函数定完之后 调用函数
		show();
		//点击事件
		box.onmousedown=function(event){
			data.startX=event.clientX;
			data.startY=event.clientY;
			console.log(data.startX);
		}
		//鼠标移动事件
		box.onmousemove=function(event){
			data.endX=event.clientX;
			data.endY=event.clientY;
		}
		//鼠标松开事件
		box.onmouseup=function(event){
			var x=data.endX-data.startX;
			var y=data.endY-data.startY;
			var dir="";
			//谁的绝对值大  就是主方向
			if(Math.abs(x)>10 || Math.abs(y)>10){
			if(Math.abs(x)>Math.abs(y)){
				if(x>0){
					dir="right";
				}else{
					dir="left";
				}
			}else{
				if (y>0) {
					dir="buttom";
				}else{
					dir="top";
				}
			}
			//封装一个函数 用来判断方向  执行对应函数			
			var flag=mergeAll(dir);
			if(flag==true){
				//我是改变了的，那我就要产生一个新的数字
				//randInsert();
				var a=Math.floor(Math.random()*100);
					//if(a<=20){
						randInsert();
					// }
					// else{
					// 	 Insert();
					// }
					//每次移动完判断游戏是否结束
				if(img2.getAttribute("src")=="2.png"){
						yx.play();
				}else{
						yx.pause();

				}
				//yx.play();
				show();//滑动后 重新展示棋盘

		    }
		}
	}
			
	    function gameOver(){
	    	var arr=data.numbers;
	    	//只要有地方空的代表游戏未结束
	    	for(var i=0;i<4;i++){
	    		for(var j=0;j<4;j++){
	    			if(arr[i][j]==0){
	    				return false;
	    			}
	    		}
	    	}
	    	for(var i=0;i<3;i++){
	    		for(var j=0;j<3;j++){
	    			if(arr[i][j]==arr[i][j+1] || arr[i][j]==arr[i+1][j]){
	    				return false;
	    			}
	    		}
	    	}
	    	for(var k=0;k<3;k++){
	    		if(arr[3][k]==arr[3][k+1]){
	    			return false;
	    		}
	    		if(arr[k][3]==arr[k+1][3]){
	    			return false;
	    		}
	    	}
	    	return true;
	    }
		function randInsert(){
			var arr=data.numbers;
			//先随机
			var num=Math.random()<0.8?2:4;
			//计算随机位置
			var rs=[];
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					//如果值是0，才可以随机数字来
					if(arr[i][j]==0) {
						rs.push([i,j]);//将所有可插入的数据的地方都先存起来
					}
				}
			}
			//开始在可以插入的数组中随机取一个值
			var position=rs[Math.floor(Math.random()*rs.length)];
			//开始替换
			arr[position[0]][position[1]]=num;
			data.numbers=arr;
		}
		// function Insert(){
		// 	var err=data.numbers;
		// 	//先随机
		// 	var num=Math.random()<0.5?"+":"-";
		// 	//计算随机位置
		// 	var rs=[];
		// 	for(var i=0;i<4;i++){
		// 		for(var j=0;j<4;j++){
		// 			//如果值是0，才可以随机数字来
		// 			if(err[i][j]==0) {
		// 				rs.push([i,j]);//将所有可插入的数据的地方都先存起来
		// 			}
		// 		}
		// 	}
		// 	//开始在可以插入的数组中随机取一个值
		// 	var position=rs[Math.floor(Math.random()*rs.length)];
		// 	//开始替换
		// 	 err[position[0]][position[1]]=num;
		// 	data.numbers=err;
		// }

		function mergeAll(dir){
			data.isGameOver=gameOver();
			if (data.isGameOver==true) {
				//游戏结束
					var val=confirm("游戏结束，是否继续？");
					if (val==true) {
						//数据还原
						data.numbers=[[0,2,0,2],[0,2,4,0],[0,0,4,0],[0,0,0,0]];
						data.score=0;
						data.scoremax=localStorage.getItem("scoremax");
						setScore(data.score);
						}					
					}		
			if (dir=="left") {
				return margeLeft();  //左滑
			}else if(dir=="right"){
				return margeRight(); //右
			}else if(dir=="top"){
				return margeTop();//上
			}else if(dir=="buttom"){
				return margeButtom();//下
			}
		}
			function margeLeft(){
				var change=false;
				//先得到这个数据
				var arr=data.numbers;
				//先相加 双重循环
				for(var i=0;i<4;i++){
					for(var j=0;j<3;j++){
						//判断这个值为0 则不加
						if(arr[i][j]==0){
							continue;//继续
						}
						//如果不为零，则往后面判断，看有没有值和他相等
						for(var k=1;k<4-j;k++){
							//如果自己不等于0，并且下一个值也不是0，才可能可以相加
							if(arr[i][j]!=0 && arr[i][j+k]!=0){
								//如果值不一样  不能加  而且直接循环结束
								if(arr[i][j]!=arr[i][j+k]){
									break;//终止本次循环
								}
								
								//加分
								data.score+=arr[i][j];
								setScore(data.score);
								//如果能继续往下运行  则意味想等同的  就能相加
								arr[i][j] = arr[i][j]*2;
								arr[i][j+k]=0;
								change=true;
								break;
							}

						}
					}
					//相加完毕后  开始移动
					for(var j=0;j<3;j++){
						//是0,才可以去动，后面的往前走
						if(arr[i][j]==0 ){
							for(var k=1;k<4-j;k++){
								//如果不为0，则全部移动过去
								if(arr[i][j+k]!=0){
									//开始动
									arr[i][j]=arr[i][j+k];
									arr[i][j+k]=0;
									change=true;
									break;
								}
							}
						}
					}
				}
				//循环完后   在arr里操作
				data.numbers=arr;
				return change;
		};
		function margeRight(){

			var change=false;
			var arr=data.numbers;
			for(var i=0;i<4;i++){
				for(var j=3;j>0;j--){
					if( arr[i][j]==0){
						continue;//等于0，无所谓滑不滑动
					}
					for(var k=1;k<=j;k++){
						//不等于0，并且不相等，则继续
						if(arr[i][j]!=0 && arr[i][j-k]!=0){
							if(arr[i][j] != arr[i][j-k]){
								break;
							}
							//如果相等则相加
							//加分
							data.score+=arr[i][j];
							setScore(data.score)
							//开始动
							arr[i][j] = arr[i][j]*2;
							arr[i][j-k]=0;//前面变成0
							change=true;
							break;
						}
					}
				}
				//开始移动
				for(var j=3;j>0;j--){
						//是0,才可以去动，后面的往前走
						if(arr[i][j]==0 ){
							for(var k=1;k<=j;k++){
								//如果不为0，则全部移动过去
								if(arr[i][j-k]!=0){
									//开始动
									arr[i][j]=arr[i][j-k];
									arr[i][j-k]=0;
									change=true;
									break;
								}
							}
						}
					}
			}
				data.numbers=arr;
				return change;
		};
		function margeTop(){
			var change=false;
				//先得到这个数据
				var arr=data.numbers;
				//先相加 双重循环
				for(var i=0;i<4;i++){
					for(var j=0;j<3;j++){
						//判断这个值为0 则不加
						if(arr[j][i]==0){
							continue;//继续
						}
						//如果不为零，则往后面判断，看有没有值和他相等
						for(var k=1;k<4-j;k++){
							//如果自己不等于0，并且下一个值也不是0，才可能可以相加
							if(arr[j][i]!=0 && arr[j+k][i]!=0){
								//如果值不一样  不能加  而且直接循环结束
								if(arr[j][i]!=arr[j+k][i]){
									break;//终止本次循环
								}
								//加分
								data.score+=arr[j][i];
								setScore(data.score)
								//如果能继续往下运行  则意味想等同的  就能相加
								arr[j][i] = arr[j][i]*2;
								arr[j+k][i]=0;
								change=true;
								break;
							}
						}
					}
					//相加完毕后  开始移动
					for(var j=0;j<3;j++){
						//是0,才可以去动，后面的往前走
						if(arr[j][i]==0 ){
							for(var k=1;k<4-j;k++){
								//如果不为0，则全部移动过去
								if(arr[j+k][i]!=0){
									//开始动
									arr[j][i]=arr[j+k][i];
									arr[j+k][i]=0;
									change=true;
									break;
								}
							}
						}
					}
				}
				//循环完后   在arr里操作
				data.numbers=arr;
				return change;
		};
		function margeButtom(){
			var change=false;
			var arr=data.numbers;
			for(var i=0;i<4;i++){
				for(var j=3;j>0;j--){
					if( arr[j][i]==0){
						continue;//等于0，无所谓滑不滑动
					}
					for(var k=1;k<=j;k++){
						//不等于0，并且不相等，则继续
						if(arr[j][i]!=0 && arr[j-k][i]!=0){
							if(arr[j][i] != arr[j-k][i]){
								break;
							}
							//如果相等则相加
							//加分
							data.score+=arr[j][i];
							setScore(data.score);
							arr[j][i] = arr[j][i]*2;
							arr[j-k][i]=0;//前面变成0
							change=true;
							break;
						}
					}
				}
				//开始移动
				for(var j=3;j>0;j--){
						//是0,才可以去动，后面的往前走
						if(arr[j][i]==0 ){
							for(var k=1;k<=j;k++){
								//如果不为0，则全部移动过去
								if(arr[j-k][i]!=0){
									//开始动
									arr[j][i]=arr[j-k][i];
									arr[j-k][i]=0;
									change=true;
									break;
								}
							}
						}
					}
			}
				data.numbers=arr;
				return change;
		};
		//设置分数
			function setScore(score){
				//如果我的当前分数超过了最高分
				if(score>=max){
					//设置好
					document.getElementById("scoremax").innerHTML=score;
					//保存
					localStorage.setItem("scoremax",score);
				}
				document.getElementById("score").innerHTML=score;
			}
	//键盘移动
		document.onkeydown=function(event){
			var flag;
				event=event || window.event;
				switch(event.keyCode){
					case 37:
						flag=margeLeft();
						break;
					case 38:
						flag=margeTop();
						break;
					case 39:
						flag=margeRight();
						break;
					case 40:
						flag=margeButtom();
						break;
				}
			if(flag==true){
				//我是改变了的，那我就要产生一个新的数字
				//randInsert();
				var a=Math.floor(Math.random()*100)
					//if(a>=20){
						 randInsert();
					// }else{
					// 	 Insert();
					// }
				}
			//每次移动完判断游戏是否结束
			data.isGameOver=gameOver();
			if (data.isGameOver==true) {
				if (data.isGameOver==true) {
					var yxjs=document.getElementById("yxjs");
					yxjs.play();
					var val=confirm("游戏结束，是否继续？");
					if (val==true) {
						data.numbers=[[0,2,0,2],[0,2,4,0],[0,0,4,0],[0,0,0,0]];
						data.score=0;
						data.scoremax=localStorage.getItem("scoremax");
						setScore(data.score);
						}					
					}
				}
				if(img2.getAttribute("src")=="2.png"){
						yx.play();
				}else{
						yx.pause();

				}
				//yx.play();
				show();//滑动后 重新展示棋盘
			}
	

	
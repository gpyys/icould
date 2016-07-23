/*
 	todo={
		id:1,
		title:"新列表",
		time:"",
		status:"false",
		list:{
			con:"",
			
		}

 	}



*/
var color=["#C96FE2","#6DDB30","#40ABF8","#F2CB00","#9F855D","#F8246A","#F89600"];
var app=angular.module("app",[]);
app.controller("icloud",function($scope){
	var todo=getData();
	if(todo.length==0){
		todo=[{
			id:1,
			title:"新列表",
			color:"#C96FE2",
			list:[{
					
				}
			]
		}]
	}
	$scope.todo=todo;
	$scope.color=color;
	$scope.index=0;
	$scope.add=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.todo.push({
			id:$scope.ids,
			color:color[$scope.ids%7],
			title:"新列表"+$scope.ids,
			list:[]
		});
	}
	getnum();
	function getnum(){
		$scope.comNum=0;
		angular.forEach(todo[$scope.index].list,function(o,i){
			if(o.status==true){
				$scope.comNum++;
			}
		})
	}
	$scope.flag=false;
	$scope.show=function(){
		$scope.flag=!$scope.flag;
	}
	$scope.com=function(val,index,arr){
		return val.status==true?true:false;
	}
	$scope.doing=function(val,index,arr){
		return val.status==false?true:false;
	}
	$scope.select=function(i){
		$scope.index=i;
		getnum();
		$scope.flag=false;
		getColor();
	}
	$scope.new=function(){
		$scope.todo[$scope.index].list.push({
			con:"",
			time:new Date().getTime(),
			status:false
		})
	}
	$scope.f=false;
	$scope.change=function(obj,sta){
		obj.status=sta;
		getnum();
	}
	$scope.fontColor=$scope.todo[$scope.index].color;
	function getColor(){
		$scope.fontColor=$scope.todo[$scope.index].color;
	}
	$scope.changeColor=function(v){
		$scope.fontColor=v;
	}
	$scope.finish=function(){}
	$scope.del=function(){
		if($scope.todo.length>1){
			$scope.todo.splice($scope.index,1);
			$scope.f=false;
		}else{
			alert("无法删除");
		}
	}
	$scope.titles=$scope.todo[$scope.index].title;
	$scope.finish=function(){
		$scope.todo[$scope.index].title=$scope.titles;
		$scope.todo[$scope.index].color=$scope.fontColor;
		$scope.f=false;
	}
	$scope.$watch('todo',function(nv,ov){
		saveData($scope.todo);
		getData();
	},true)
	function getData(){
		return JSON.parse(localStorage.getItem('todo'))||[];
	}
	function saveData(data){
		localStorage.setItem('todo',JSON.stringify(data));
	}
})
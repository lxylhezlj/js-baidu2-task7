// JavaScript Document
window.onload=function(){
	var table=document.getElementById("table");
    var add=document.getElementById("add");
    var reduce=document.getElementById("reduce");
	var math=document.getElementById("math");	
	/*增加一行*/
    function addTr(num1,num2){
	    for(var i=0;i<num1;i++){
		    var tr=document.createElement("tr");
		    for(var j=0;j<num2;j++){
			    var td=document.createElement("td");
				td.contentEditable="true";//将td设为可编辑
			    tr.appendChild(td);
		    }
		    table.appendChild(tr);
	    }
    }
	/*删除一行*/
	function reduceTr(){
		var trs=document.getElementsByTagName("tr");
		var length=trs.length;
		table.deleteRow(length-1);
	}
	/*得到表格的二维数组*/
	function setArr(){
		var trs=document.getElementsByTagName("tr");		
		var tdNum=trs[0].getElementsByTagName("td").length;
		var length=trs.length;
		var arr=new Array(length);
		for(var i=1;i<length;i++){
			arr[i]=new Array(tdNum);
			for(var j=0;j<tdNum;j++){
				var tds=trs[i].getElementsByTagName("td");
				arr[i][j]=tds[j].childNodes[0].nodeValue;
			}
		}
		return arr;
	}
	/*为表格的二维数组排序*/
	function sortArr(arr,i,time){
		arr.sort(function(a,b){
			if(time){
				return a[i]-b[i];
			}
			else{
				return b[i]-a[i];
			}
			
		});
		return arr;
	}
    add.onclick=function(){
	    addTr(1,5);
    }
	reduce.onclick=function(){
		reduceTr();
	}
	/*重新为表格赋值*/
	function newTable(arr){
		var trs=document.getElementsByTagName("tr");
		for(var i=1;i<trs.length;i++){
			var tds=trs[i].getElementsByTagName("td");
			for(var j=0;j<tds.length;j++){
				tds[j].innerHTML=arr[i-1][j];
			}
			
		}
	}
	var trs=document.getElementsByTagName("tr");
	var firstTd=trs[0].getElementsByTagName("td");
	var time=true;//实现单击从小到大，再点就是从大到小
	for(var i=1;i<firstTd.length;i++){
		!function(i){
			firstTd[i].onclick=function(){
			time=!time;
			var arr=setArr();
			arr=sortArr(arr,i,time);
			newTable(arr);
		}
		}(i);
		
	}
}

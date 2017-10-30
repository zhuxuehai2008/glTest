function Matrix(arr){
				this.Matrix = arr;
				this.rowCount = Math.sqrt(arr.length);
				if(this.rowCount.toString().indexOf(".")!=-1){return false;}
			}
var MatrixPrototype = {  transpose:function(){	var a =[];/*转置*/
												if(arguments.length==0){
					 								var matrix = this.Matrix;
					 								var count  = this.rowCount;
					 							}else if(arguments.length==1){
					 								var matrix = arguments[0];
					 								var count = Math.sqrt(matrix.length);
													if(count.toString().indexOf(".")!=-1){return false;}
					 							}else{
					 								return false;
					 							}
												for(var i =0;i<matrix.length;i++){
													a[i%count*(count)+Math.floor(i/count)]= matrix[i];
												}
												return new Float32Array(a); 
											},
						transpose$:function(){	var a =[];
												var matrix = this.Matrix;
					 							var count  = this.rowCount;
												for(var i =0;i<matrix.length;i++){
													a[i%count*(count)+Math.floor(i/count)]= matrix[i];
												}
												this.Matrix=new Float32Array(a);
												return this; 
						},
						inverse:function(){	    var result = [];/*逆矩阵*/
						 						if(arguments.length==0){
					 								var matrix = this.Matrix;
					 								var count  = this.rowCount;
					 								var determinantNum = this.determinant();
					 							}else if(arguments.length==1){
					 								var matrix = arguments[0];
					 								var count = Math.sqrt(matrix.length);
					 								var determinantNum = this.determinant(matrix);
													if(count.toString().indexOf(".")!=-1){return false;}
					 							}else{
					 								return false;
					 							}
					 							if(determinantNum==0){
					 								return false;
					 							}
					 							for(var k = 0;k<matrix.length;k++){
					 								result.push(this.Cofactor(matrix,Math.floor(k/count),k%count)/determinantNum);
					 							}
					 							return new Float32Array(this.transpose(result));
											},
						inverse$:function(){		var result = [];
													var matrix = this.Matrix;
					 								var count  = this.rowCount;
					 								var determinantNum = this.determinant();
					 								if(determinantNum==0){
					 								return false;
					 								}
													for(var k = 0;k<matrix.length;k++){
					 								result.push(this.Cofactor(matrix,Math.floor(k/count),k%count)/determinantNum);
					 								}
													this.Matrix = new Float32Array(this.transpose(result));
													return this;
						},
						restSubmatrix:function(){	var  result = [];	/*余子阵*/
						 							if(arguments.length==2){
						 								var matrix = this.Matrix;
						 								var i = arguments[0];
						 								var j = arguments[1];
						 								var count  = this.rowCount;
						 							}else if(arguments.length==3){
						 								var matrix = arguments[0];
						 								var i = arguments[1];
						 								var j = arguments[2];
						 								var count = Math.sqrt(matrix.length);
														if(count.toString().indexOf(".")!=-1){return false;}
						 							}else{
						 								return false;
						 							}
						 							for(var k =0;k<matrix.length;k++){
						 								if(Math.floor(k/count)!=i&&k%count!=j){
						 									result.push(matrix[k]);	
						 								}
						 							}
						 							return result;
						 				},
						 Cofactor:function(){		if(arguments.length==2){/*代数余子式*/
						 						 		var i = arguments[0];
						 								var j = arguments[1];
														var restsubmatrix = this.restSubmatrix(arguments[0],arguments[1]);
						 							}else if(arguments.length==3){
						 								var i = arguments[1];
						 								var j = arguments[2];
						 								var restsubmatrix = this.restSubmatrix(arguments[0],arguments[1],arguments[2]);
						 							}else{
						 								return false;
						 							}
						 							return ((i+j)%2==0?1:-1)*this.determinant(restsubmatrix);
						 },
						 determinant:function(){	var result = 0; /*行列式*/
						 							if(arguments.length==0){
						 								var matrix = this.Matrix;
						 								var count  = this.rowCount;
						 							}else if(arguments.length==1){
						 								var matrix = arguments[0];
						 								var count = Math.sqrt(matrix.length);
														if(count.toString().indexOf(".")!=-1){return false;}
						 							}else{
						 								return false;
						 							}
												 	var num=1,order =[],result=0;
													for(var i=1;i<=count;i++){
														num*=i;
														order.push(i-1);
													}
													for (var i = 0;i<num;i++) {
														var monomial=1;d=num;o=order.concat();
														var seq=[];
														for (var j=0;j<count;j++) {
																var n =Math.floor(i%d/(d/(count-j)));
																monomial*=matrix[j*count+o[n]];
																d=d/(count-j);
																seq.push(o[n]);
																o.splice(n,1);
														}
														q = this.inversionNum(seq)
														result+=monomial*(q%2==0?1:-1);
													}
												 	return result;
											 	},
						 cross:function(){			var result=[];/*matrix右乘matrix2*/
						 							if(arguments.length==1){
						 								var matrix = this.Matrix;
						 								var count  = this.rowCount;
						 								var matrix2 = arguments[0];
						 								var count2 = Math.sqrt(matrix2.length);
						 								if(count2.toString().indexOf(".")!=-1){return false;}
						 							}else if(arguments.length==2){
						 								var matrix = arguments[0];
						 								var count = Math.sqrt(matrix.length);
						 								var matrix2 = arguments[1];
						 								var count2 = Math.sqrt(matrix2.length);
														if(count.toString().indexOf(".")!=-1||ount2.toString().indexOf(".")!=-1){return false;}
						 							}else{
						 								return false;
						 							}
						 							for(var i =0;i<count;i++){
							 							for(var j = 0;j<count2;j++){
							 								var v = 0;
							 								for(var k = 0;k<count;k++){
							 									 v+= matrix[i*count+k]*matrix2[k*count+j];
							 								}
							 								result[i*count+j]=v;
							 							}
						 							
						 							}
						 							return new Float32Array(result);
						 				},
						 cross$:function(){			var result=[];
						 							if(arguments.length==1){
						 								var matrix = this.Matrix;
						 								var count  = this.rowCount;
						 								var matrix2 = arguments[0];
						 								var count2 = Math.sqrt(matrix2.length);
						 								if(count2.toString().indexOf(".")!=-1){return false;}
						 							}else{
						 								return false;
						 							}
						 							for(var i =0;i<count;i++){
							 							for(var j = 0;j<count2;j++){
							 								var v = 0;
							 								for(var k = 0;k<count;k++){
							 									 v+= matrix[i*count+k]*matrix2[k*count+j];
							 								}
							 								result[i*count+j]=v;
							 							}
						 							
						 							}
						 							this.Matrix = new Float32Array(result);
						 							return this;
						 },
						 inversionNum:function (seqs) { var count =0;/*逆序数*/
														for (var i=0;i<seqs.length-1;i++) {
															for(var j=i+1 ;j<seqs.length;j++){
																if(seqs[i]>seqs[j]){
																	count++
																}
															}
														}
														return count;
													  },
						toString:function(){	var str="";
												for(var i=0;i<this.rowCount;i++){
													var r = i*this.rowCount;
													str += Array.prototype.slice.call(this.Matrix,r,r+this.rowCount).toString().replace(/\,/g,"	")+"\n";
												}
												return str;
											},
						print:function(){ console.log(this.toString());
										}
						}
function Vector3(x,y,z){
	this.x =x;
	this.y =y;
	this.z =z;
	this.Vector =[x,y,z];
}
var Vector3Prototype = {	cross:function(vec2){
								var x = this.Vector[1]*vec2[2]-this.Vector[2]*vec2[1];
								var y = this.Vector[2]*vec2[0]-this.Vector[0]*vec2[2];
								var z = this.Vector[0]*vec2[1]-this.Vector[1]*vec2[0];
								return [x,y,z];
							},
							normalization : function (){
								var m = Math.sqrt(this.Vector[0]*this.Vector[0]+this.Vector[1]*this.Vector[1]+this.Vector[2]*this.Vector[2]);
								return [this.x/m , this.y/m,this.z/m];
							},
							dot:function(vec2){
								return this.x*vec2[0]+this.y*vec2[1]+this.z*vec2[2];
							}
						}
Vector3.prototype=Vector3Prototype;
Matrix.prototype=MatrixPrototype;
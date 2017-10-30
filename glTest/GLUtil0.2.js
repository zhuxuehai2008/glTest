function getGL(dom){
	var gl =canvas.getContext("webgl");
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	return gl;
}
function useShaderProgram (gl , vertexShaderStr, fragmentShaderStr) {
	var program = getShaderprogram(gl,vertexShaderStr,fragmentShaderStr);
	if(program==null){
		console.log("program fail");
	}
	gl.useProgram(program);
	gl.program=program;
	return gl;
}
function getShaderprogram(gl , vertexShaderStr, fragmentShaderStr){
	var vshader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vshader,vertexShaderStr);
	gl.compileShader(vshader);
	var fshader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fshader,fragmentShaderStr);
	gl.compileShader(fshader);
	var compiledflagv = gl.getShaderParameter(vshader, gl.COMPILE_STATUS);
	var compiledflagf = gl.getShaderParameter(fshader, gl.COMPILE_STATUS);
	if(!compiledflagv){
		return getLog(vshader);
	}else if(!compiledflagf){
		return getLog(fshader);
	}
	var program = gl.createProgram();
	gl.attachShader(program,vshader);
	gl.attachShader(program,fshader);
	gl.linkProgram(program);
	var linkedflag = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(!linkedflag){
		return getLog(program);
	}
	return program;
	function getLog(obj){
		var type = Object.prototype.toString.call(obj);
		if(type=="[object WebGLProgram]"){
			var error = gl.getProgramInfoLog(obj);
			console.error("编译着色器失败");
			console.error('Failed to compile shader: ' + error);
			return;
		}else if(type =="[object WebGLShader]"){
			var error = gl.getShaderInfoLog(obj);
			console.error("链接着色器失败");
			console.error('Failed to link program: ' + error);
			return;
		}
	}
}
function writeBuffer(gl,buffer,array){
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  	gl.bufferData(gl.ARRAY_BUFFER,array,gl.STATIC_DRAW);
}
function writeElementBuffer(gl,buffer,array){
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffer);
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,array,gl.STATIC_DRAW);
}
function useBuffer (gl,attr,buffer) {
	
	if(arguments.length==3){
		var size=3
	}else if(arguments.length==4){
		var size=arguments[3];
	}else{
		return false;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 	gl.vertexAttribPointer(attr,size,gl.FLOAT,false,0,0);
  	gl.enableVertexAttribArray(attr);
}
function useElementBuffer (gl,attr,buffer) {
	
	if(arguments.length==3){
		var size=3
	}else if(arguments.length==4){
		var size=arguments[3];
	}else{
		return false;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffer);
 	gl.vertexAttribPointer(attr,size,gl.FLOAT,false,0,0);
  	//gl.enableVertexAttribArray(attr);
}

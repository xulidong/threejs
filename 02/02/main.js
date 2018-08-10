/**
 * 自定义shader
 * 1 传入纹理
 * 2 实时更新颜色
 * 3 混合纹理颜色和实时变化的颜色
 * */
function main() {
	// 1 创建场景
	var scene = new THREE.Scene();

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;
	camera.lookAt(scene.position);

	// 3 光照
	var ambientLight = new THREE.AmbientLight(0x333333);// 环境光
	scene.add(ambientLight);
	var dirLight = new THREE.DirectionalLight();// 平行光
	scene.add(dirLight);

	// 4 加入立方体
	var loader = new THREE.TextureLoader;
	var tex = loader.load("./face.jpg");
	var uniforms = {
		time: {
			type: "f",
			value: 1.0
		},
		texture: {
			type: "t",
			value: tex
		}
	};
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms, // 传入uniform变量的值
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	} );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// 5 渲染
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x4c4a48);
	document.body.appendChild( renderer.domElement );
	renderer.render( scene, camera );

	// 6 循环渲染
	var clock = new THREE.Clock();
	function render() {
		requestAnimationFrame( render );
		var delta = clock.getDelta();
		uniforms.time.value += delta * 5;
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
		renderer.render( scene, camera );
	}
	render();
}
window.onload = main;
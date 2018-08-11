/**
 * 光照贴图
 * 参考：https://learnopengl-cn.github.io/02%20Lighting/04%20Lighting%20maps/
 * */
function main() {
	// 1 创建场景
	var scene = new THREE.Scene();

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.z = 3;
	camera.lookAt(scene.position);

	// 4 加入立方体
	var loader = new THREE.TextureLoader;
	var uniforms = {
		ambientLight: {
			type: "v",
			value: new THREE.Vector3(0.2, 0.2, 0.2)
		},
		specularLight: {
			type: "v",
			value: new THREE.Vector3(1, 1, 1)
		},
		diffuseLight: {
			type: "v",
			value: new THREE.Vector3(0.5, 0.5, 0.5)
		},
		shininess: {
			type: "f",
			value: 64
		},
		posLight: {
			type: "v",
			value: new THREE.Vector3(1.2, 1, 2)
		},
		texture: {
			type: "t",
			value: loader.load("./diffuse.png")
		},
		specular: {
			type: "t",
			value: loader.load("./specular.png")
		}
	};
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
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
	function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	render();
}
window.onload = main;
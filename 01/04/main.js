/**
 * 加入光照
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
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );// Lambert材质
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
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
		renderer.render( scene, camera );
	}
	render();
}
window.onload = main;
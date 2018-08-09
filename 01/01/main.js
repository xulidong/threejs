/**
 * 渲染一个空的场景
 * 步骤
 * 1 创建场景
 * 2 添加相机
 * 3 渲染
 * */

function main() {
	// 1 创建场景
	var scene = new THREE.Scene();

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;
	camera.lookAt(scene.position);

	// 3 渲染
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x4c4a48);
	document.body.appendChild( renderer.domElement );
	renderer.render( scene, camera );
}
window.onload = main;
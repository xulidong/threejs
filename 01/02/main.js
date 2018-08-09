/**
 * 在场景中加入立方体
 * 步骤
 * 1 创建场景
 * 2 添加相机
 * 3 加入立方体
 * 4 渲染
 * */

function main() {
	// 1 创建场景
	var scene = new THREE.Scene();

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;
	camera.lookAt(scene.position);

	// 3 加入立方体
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// 4 渲染
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x4c4a48);
	document.body.appendChild( renderer.domElement );
	renderer.render( scene, camera );
}
window.onload = main;
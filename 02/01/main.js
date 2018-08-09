/**
 * 加载模型
 * */

function main() {
	// 1 创建场景
	var scene = new THREE.Scene();

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 100, 200, 300 );
	camera.lookAt(scene.position);

	// 3 光照
	var ambientLight = new THREE.AmbientLight(0x333333);// 环境光
	scene.add(ambientLight);
	var dirLight = new THREE.DirectionalLight();// 平行光
	scene.add(dirLight);

	// 4 加载模型
	var mixer = null;
	var loader = new THREE.FBXLoader();
	loader.load( 'model/dancing.fbx', function ( object ) {
		mixer = new THREE.AnimationMixer( object );

		var action = mixer.clipAction( object.animations[ 0 ] );
		action.play();

		scene.add( object );
	} );

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
		if (mixer) {
			mixer.update(clock.getDelta());
		}
		renderer.render( scene, camera );
	}
	render();
}
window.onload = main;
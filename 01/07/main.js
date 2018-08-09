/**
 * 加入雾
 * Fog：在指定区间，逐渐雾化
 * FogExp2：雾化程度随距离呈指数增长
 * */
function main() {
	// 1 创建场景
	var scene = new THREE.Scene();
	scene.fog = new THREE.Fog(
		0xffffff, // 雾的颜色
		1, // 雾化开始的距离相机的位置
		15 // 全雾化距离相机的位置
	);
	// scene.fog = new THREE.FogExp2(0xffffff,0.06);

	// 2 添加相机
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;
	camera.lookAt(scene.position);

	// 3 光照
	var ambientLight = new THREE.AmbientLight(0x333333);// 环境光
	scene.add(ambientLight);
	var dirLight = new THREE.DirectionalLight();// 平行光
	dirLight.castShadow = true;// 产生阴影
	scene.add(dirLight);
	var spotLight = new THREE.SpotLight(0xffffff);// 聚光灯
	spotLight.position.set(0, 0, 5);
	scene.add(spotLight);

	// 3 加入立方体
	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshPhongMaterial( { // Phong材质
		color: 0xff0000, // 颜色
		shininess: 10000, // 高光亮度
		specular: 0xffff00, // 高光颜色
	} );
	var cube = new THREE.Mesh( geometry, material );
	cube.castShadow = true;// 产生阴影
	scene.add( cube );

	var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 8, 8), new THREE.MeshLambertMaterial({color: 0xffffff}));
	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -3;
	plane.receiveShadow = true;// 接收阴影
	scene.add(plane);

	// 5 渲染
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x4c4a48);
	renderer.shadowMapEnabled = true;// 开启渲染器渲染阴影
	renderer.shadowMapSoft = true;// 开启软阴影
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
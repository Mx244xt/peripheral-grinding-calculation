import { useEffect } from 'react';
import * as THREE from 'three';

//TODO R パスの描画
// import { Curves } from 'three/examples/jsm/Addons.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function box(dimensions: any) {
  const canvas = document.querySelector("#webgl")!;
  const width = window.innerWidth / 1.2
  const height = window.innerHeight / 2
  const sizes = {
    width: width,
    height: height
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true,
  });

  //頂点位置計算
  const APEX = +dimensions.shape;
  const OBTUSE = 180 - APEX;
  const REF = +dimensions.reliefAngle!;
  const RS = +dimensions.rSize;
  const TK = +dimensions.thickness!;
  const TKH = +dimensions.thickness! / 2;
  const IC = +dimensions.inscribedcircle! / 2;
  const SA_DIFF = TK * Math.tan((Math.PI / 180) * REF);
  const ACH = cornerheight(APEX, IC)
  const OCH = cornerheight(OBTUSE, IC)
  const AWB = cornerheight(APEX, IC - SA_DIFF);
  const OWB = cornerheight(OBTUSE, IC - SA_DIFF);
  function cornerheight(apex: number, inscribedcircle: number) {
    return (
      (1 /
        Math.sin(apex * (Math.PI / 180) / 2) -
        1) *
      (inscribedcircle - RS)) + inscribedcircle;
  }
  function gr() {
    return (Math.atan((ACH - AWB) / TK));
  }
  //(1 ÷ sin(頂角 ÷ 2) - 1) × (内接円 ÷ 2 - Rサイズ)

  //頂点位置描画
  const vertices = new Float32Array([
    // 前面 X, Y, Z 
    -ACH, TKH, ACH, //左上 0
    OCH, TKH, OCH, //右上 1
    -AWB, -TKH, AWB, // 左下 2
    OWB, -TKH, OWB, //右下 3
    // 後面
    -OCH, TKH, -OCH, // 左上 4
    ACH, TKH, -ACH, // 右上 5
    -OWB, -TKH, -OWB, //左下 6
    AWB, -TKH, -AWB, //右下 7
  ]);
  const indices = [
    // 前面
    0, 1, 2,
    1, 2, 3,
    2, 3, 0,
    3, 0, 1,
    // 右側面
    1, 5, 7,
    5, 7, 3,
    7, 3, 1,
    3, 1, 5,
    // // // 後面
    5, 4, 6,
    4, 6, 7,
    6, 7, 5,
    7, 5, 4,
    // // 左側面
    4, 0, 2,
    0, 2, 6,
    2, 6, 4,
    6, 4, 0,
    // 上面
    4, 5, 1,
    1, 0, 4,
    5, 1, 0,
    0, 4, 5,
    // 底面
    6, 7, 3,
    7, 3, 2,
    3, 2, 6,
    2, 6, 7,

  ];


  //ジオメトリ

  const bufferGeometry = new THREE.BufferGeometry()
  const cylinderGeometry = new THREE.CylinderGeometry(RS, RS, TK);
  bufferGeometry.setIndex(indices);
  bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  /**
    TODO R パスの描画
    const path = new Curves.DecoratedTorusKnot4a(RS);    
    const points = path.getPoints(1000);
    bufferGeometry.setFromPoints(points);
    bufferGeometry.center();
  */


  //マテリアル
  const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  //光源
  const light = new THREE.DirectionalLight("#fff", 0.5)
  const pointLight = new THREE.PointLight("#fff", 1)
  light.position.set(0, 0, 100);

  //メッシュ
  const buffer = new THREE.Mesh(bufferGeometry, basicMaterial);
  const cylinder = new THREE.Mesh(cylinderGeometry, basicMaterial)

  //サイズ
  renderer.setSize(sizes.width, sizes.height);

  //ポジション
  camera.position.set(0, 0, IC * 9);
  cylinder.position.set(ACH - RS, 0, ACH - RS);

  cylinder.rotateY(APEX / 2)
  cylinder.rotateX(APEX / 2)
  cylinder.rotateZ(gr())

  const group = new THREE.Group();
  group.add(buffer);
  // group.add(cylinder);

  group.rotateX((Math.PI / 180) * 0);
  group.rotateY((Math.PI / 180) * 0);
  group.rotateZ((Math.PI / 180) * 0);


  scene.add(group);
  scene.add(light, pointLight);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  const animate = () => {
    renderer.render(scene, camera);

    const getDeltaTime = clock.getDelta();

    //メッシュを回転させる
    group.rotateX(0.04 * getDeltaTime)
    group.rotateY(0.4 * getDeltaTime)
    group.rotateZ(0.04 * getDeltaTime)

    window.requestAnimationFrame(animate);
  };
  animate();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WebGL({ dimensions }: any) {

  useEffect(() => {
    box(dimensions);
  }, [dimensions])
  return (
    <canvas id='webgl' className='w-full h-full'></canvas>
  )
}

export default WebGL;
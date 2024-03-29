import * as THREE from 'three'
import { BooleanKeyframeTrack, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 'bisque' );

/**
 * Object
 */
const geometry = new THREE.IcosahedronGeometry( 4, 20 );
// const material = new THREE.MeshNormalMaterial({ wireframe: true })
const material = new THREE.MeshBasicMaterial( { color: '#7BA05B', wireframe: true } );
material.side = THREE.DoubleSide
const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)
mesh2.rotation.x += Math.PI / 2
scene.add(mesh)

scene.add(mesh2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.x=elapsedTime*0.1     //consistent spinning across devices
    mesh.rotation.y = elapsedTime * 0.1
    // mesh.rotation.z=elapsedTime*.07
    mesh2.rotation.y = elapsedTime * -0.1


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
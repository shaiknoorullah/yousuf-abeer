/**
 * /*
 * Auto-generated by: https://github.com/pmndrs/gltfjsx
 *
 * @format
 */

import * as THREE from "three"
import React, {
	useMemo,
	useRef,
	useLayoutEffect,
	useEffect,
	useState,
} from "react"
import {
	useGLTF,
	PerspectiveCamera,
	Environment,
	MeshRefractionMaterial,
	OrbitControls,
	Caustics,
	MeshTransmissionMaterial,
	CubeCamera,
	useProgress,
} from "@react-three/drei"
import {
	useFrame,
	useLoader,
	useThree,
} from "@react-three/fiber"
import { GLTF, RGBELoader } from "three-stdlib"
import { useControls } from "leva"
import {
	WebGLRenderTarget,
	Object3D,
	MeshStandardMaterial,
	TextureLoader,
} from "three"
// @ts-ignore
import BackfaceMaterial from "./BackfaceMaterial"
// @ts-ignore
import RefractionMaterial from "./RefractionMaterial/RefractionMaterial"
import { easing } from "maath"
import { motion } from "framer-motion-3d"

type GLTFResult = GLTF & {
	nodes: {
		Bottle: THREE.Mesh
		Head: THREE.Mesh
		Liquid: THREE.Mesh
		SprayPipe: THREE.Mesh
		LeftRimLight: THREE.Mesh
		LeftRimLight002: THREE.Mesh
		RimLight: THREE.Mesh
	}
	materials: {
		["Glass.002"]: THREE.MeshPhysicalMaterial
		Head: THREE.MeshStandardMaterial
		Liquid: THREE.MeshPhysicalMaterial
		FrontColor: THREE.MeshStandardMaterial
		["LightMat-5"]: THREE.MeshStandardMaterial
	}
}

export default function Model({
	...props
}: JSX.IntrinsicElements["group"]) {
	const group = useRef<THREE.Group>()

	const globalEnvMap: any = useLoader(
		RGBELoader,
		"/envMapSmall.hdr"
	)

	const roughnessMap: any = useLoader(
		TextureLoader,
		"/roughnessMap.jpg"
	)

	const { active } = useProgress()

	const [initialAnimation, setInitialAnimation] =
		useState(false)

	const [Hovered, setIsHovered] = useState(false)

	const isHovered = useMemo(() => Hovered, [Hovered])

	const gltf: any = useGLTF("/perfume.glb")

	const { nodes, materials } = gltf

	useLayoutEffect(() => {
		Object.keys(materials).map(a => {
			if (materials[a].map !== null) {
				materials[a].map.encoding = THREE.LinearEncoding
			}
		})
	}, [materials])

	// for production use this config for bottle Material
	const bottleConfig = {
		samples: 20,
		resolution: 1024,
		transmission: 1.0,
		roughness: 0.3,
		thickness: 0.44,
		ior: 1.52,
		chromaticAberration: 0.06,
		anisotropy: 0.15,
		distortion: 0.07,
		distortionScale: 0.3,
		temporalDistortion: 0.5,
		attenuationDistance: 0.97,
		attenuationColor: "#ffffff",
		color: "#313131",
		bg: "#ffffff",
	}

	materials["LightMat-5"].emissiveIntensity = 5

	const model = useRef()
	const perfume = useRef(null)

	nodes.Bottle.geometry.center()

	const easeOutQuint = (x: number): number => {
		if (x < 0) {
			return Math.pow(1 + x, 10) - 1
		}
		return 1 - Math.pow(1 - x, 10)
	}

	const { clock } = useThree()
	// console.log(time)

	function easeInOutQuint(x: number): number {
		return x < 0.5
			? 16 * x * x * x * x * x
			: 1 - Math.pow(-2 * x + 2, 5) / 2
	}

	useEffect(() => {
		if (active == true) {
			return
		}
		const timeout = setTimeout(() => {
			setInitialAnimation(true)
			console.log("animation set to true")
		}, 4000)

		return () => {
			setInitialAnimation(false)
			clearTimeout(timeout)
		}
	}, [active])

	useFrame((state, delta) => {
		// if (initialAnimation == true) {
		// 	// @ts-ignore
		// 	easing.dampE(
		// 		perfume.current.position,
		// 		[0, -0.6, 0],
		// 		easeInOutQuint(clock.getElapsedTime()),
		// 		delta
		// 	)
		// }

		// @ts-ignore
		easing.dampE(
			perfume.current.rotation,
			[
				isHovered
					? Math.PI * easeOutQuint(state.pointer.y) * 0.03
					: Math.PI * easeOutQuint(state.pointer.y) * 0.02,
				isHovered
					? Math.PI * easeOutQuint(state.pointer.x) * 0.05
					: Math.PI * easeOutQuint(state.pointer.x) * 0.04,
				0,
			],
			0.2,
			delta
		)

		// @ts-ignore
		easing.dampE(
			perfume.current.position,
			[
				Math.PI * easeOutQuint(state.pointer.y) * 0.02,
				-0.6,
				isHovered ? 0.8 : 0,
			],
			0.2,
			delta
		)
	})

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			rotation={[0, -0.2, 0]}
		>
			<group>
				<group>
					<group
						position={[0.24, 0.68, 13.33]}
						rotation={[1.56, 0, -0.01]}
					>
						<OrbitControls
							makeDefault={false}
							autoRotate
							autoRotateSpeed={0.1}
							minPolarAngle={0}
							maxPolarAngle={Math.PI / 2}
						/>
						<PerspectiveCamera
							makeDefault={true}
							far={1000}
							near={0.1}
							fov={20}
							zoom={1}
							rotation={[-Math.PI / 2, 0, 0]}
						/>
					</group>
					<group
						ref={perfume}
						onPointerOver={() => setIsHovered(true)}
						onPointerLeave={() => setIsHovered(false)}
						position={[0, 0.6, 3]}
					>
						<mesh
							ref={model}
							castShadow
							receiveShadow
							position={[0, 0.3, -0.25]}
							geometry={nodes.Bottle.geometry}
							// material={materials["Glass.002"]}
						>
							<meshPhysicalMaterial {...bottleConfig} />
						</mesh>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Head.geometry}
							material={materials.Head}
						/>

						<mesh
							castShadow
							receiveShadow
							geometry={nodes.SprayPipe.geometry}
							material={materials.FrontColor}
						/>
					</group>
					<Environment
						resolution={256}
						blur={5}
						//@ts-ignore
						encoding={THREE.LinearEncoding}
						// background
						// @ts-ignore
						files={"/envMap.hdr"}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.LeftRimLight.geometry}
							material={materials["LightMat-5"]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.LeftRimLight002.geometry}
							material={materials["LightMat-5"]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.RimLight.geometry}
							material={materials["LightMat-5"]}
						/>
					</Environment>
				</group>
			</group>
		</group>
	)
}

useGLTF.preload("/perfume.glb")

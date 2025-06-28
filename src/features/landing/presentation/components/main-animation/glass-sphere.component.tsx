import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const GlassSphere = () => {
	const meshRef = useRef<THREE.Mesh>(null!);

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (meshRef.current) {
			meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.05);
		}
	});

	return (
		<mesh ref={meshRef}>
			<sphereGeometry args={[1, 32, 32]} />
			<meshPhysicalMaterial roughness={0} transmission={1} thickness={1.5} color="#388BFD" />
		</mesh>
	);
};

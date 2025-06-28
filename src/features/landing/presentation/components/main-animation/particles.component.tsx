import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ParticlesProps {
	count: number;
}

export const Particles = ({ count }: ParticlesProps) => {
	const pointsRef = useRef<THREE.Points>(null!);

	const positions = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const radius = 2.5;
		const tempVec = new THREE.Vector3();

		for (let i = 0; i < count; i++) {
			const phi = Math.acos(-1 + (2 * i) / count);
			const theta = Math.sqrt(count * Math.PI) * phi;
			tempVec.setFromSphericalCoords(radius, phi, theta);
			pos[i * 3] = tempVec.x;
			pos[i * 3 + 1] = tempVec.y;
			pos[i * 3 + 2] = tempVec.z;
		}
		return pos;
	}, [count]);

	useFrame((state, delta) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y += delta / 10;
			pointsRef.current.rotation.x += delta / 15;
		}
	});

	return (
		<Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
			<PointMaterial
				transparent
				color="#8774e1"
				size={0.015}
				sizeAttenuation={true}
				depthWrite={false}
			/>
		</Points>
	);
};

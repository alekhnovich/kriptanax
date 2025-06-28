import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { GlassSphere } from './glass-sphere.component';
import { Particles } from './particles.component';

export const NeuralSphereAnimation = () => {
	return (
		<Canvas camera={{ position: [0, 0, 4.5], fov: 90 }} className="h-full w-full">
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} />
			<pointLight position={[-10, -10, -10]} color="#8774e1" intensity={2} />
			<Suspense fallback={null}>
				<GlassSphere />
				<Particles count={2500} />
			</Suspense>
		</Canvas>
	);
};

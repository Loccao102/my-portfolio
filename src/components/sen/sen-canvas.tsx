'use client';
import { Canvas } from '@react-three/fiber';
import SenModel from './SenModel';
export default function SenCanvas({ mood, reduced }: { mood: string; reduced: boolean }) {
  return <Canvas camera={{ position: [0, 0.6, 6.5], fov: 36 }} dpr={[1, 1.5]} frameloop={reduced ? 'demand' : 'always'} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.5} /><directionalLight position={[3, 5, 5]} intensity={3.5} color="#fff0e2" /><pointLight position={[-3, 1, 2]} intensity={12} color="#eda1b6" />
    <SenModel state={mood} reducedMotion={reduced} interactionEnabled={false} />
  </Canvas>;
}

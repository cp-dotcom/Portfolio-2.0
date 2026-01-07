"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Stars, TorusKnot, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DistortedCore({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <MeshDistortMaterial
                    color={color}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.9}
                    roughness={0.1}
                    distort={0.4}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function GlowingSphere({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <Sphere position={position} scale={scale}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </Sphere>
        </Float>
    );
}

export default function GeometricShapes() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#00ff9d" />
                <pointLight position={[-10, -10, -5]} intensity={5} color="#ffd700" />

                {/* Main "Tech" Core */}
                {/* <DistortedCore position={[4, 1, -2]} color="#00ff9d" scale={1.8} /> */}
               

                

                {/* Secondary Abstract Shapes */}
                <DistortedCore position={[-6, -2, -5]} color="#555" scale={1.2} />

                {/* Floating "Data" Points */}
                <GlowingSphere position={[-3, 4, -2]} color="#ffd700" scale={0.1} />
                <GlowingSphere position={[5, -3, 2]} color="#00ff9d" scale={0.15} />
                <GlowingSphere position={[0, -5, -4]} color="#ffffff" scale={0.08} />

                {/* Background Starfield for depth */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}

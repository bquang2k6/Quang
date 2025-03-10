import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Heart model created with Three.js
const Heart = () => {
  const heartRef = useRef();
  
  useEffect(() => {
    // Animation with GSAP
    gsap.to(heartRef.current.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(heartRef.current.position, {
      y: 0.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    gsap.to(heartRef.current.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  useFrame((state, delta) => {
    // Additional subtle animations
    heartRef.current.rotation.z += delta * 0.1;
  });

  // Create a heart shape
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  heartShape.bezierCurveTo(x - 0.3, y + 0.6, x - 0.15, y + 0.8, x, y + 0.95);
  heartShape.bezierCurveTo(x + 0.15, y + 0.8, x + 0.3, y + 0.6, x + 0.3, y + 0.35);
  heartShape.bezierCurveTo(x + 0.3, y + 0.35, x + 0.3, y, x, y);
  
  const extrudeSettings = {
    depth: 0.2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1
  };

  return (
    <group ref={heartRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <mesh>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
};

// Flowers around the heart
const Flowers = () => {
  const flowersRef = useRef();
  
  useEffect(() => {
    gsap.to(flowersRef.current.rotation, {
      y: -Math.PI * 2,
      duration: 15,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <group ref={flowersRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const z = Math.sin(angle) * 3;
        return (
          <Flower 
            key={i} 
            position={[x, 0, z]} 
            rotation={[0, -angle, 0]} 
            color={i % 2 === 0 ? "#FFB6C1" : "#FFC0CB"} 
          />
        );
      })}
    </group>
  );
};

// Individual flower
const Flower = ({ position, rotation, color }) => {
  const flowerRef = useRef();
  
  useEffect(() => {
    gsap.to(flowerRef.current.rotation, {
      z: Math.PI * 2,
      duration: 5 + Math.random() * 5,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(flowerRef.current.position, {
      y: position[1] + 0.3,
      duration: 1 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, [position]);

  return (
    <group ref={flowerRef} position={position} rotation={rotation}>
      {/* Flower center */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFFF88" />
      </mesh>
      
      {/* Petals */}
      {[...Array(5)].map((_, i) => {
        const petalAngle = (i / 5) * Math.PI * 2;
        const px = Math.cos(petalAngle) * 0.3;
        const pz = Math.sin(petalAngle) * 0.3;
        return (
          <mesh key={i} position={[px, 0, pz]} rotation={[Math.PI / 2, 0, petalAngle]}>
            <ellipseCurve args={[0, 0, 0.2, 0.4, 0, Math.PI * 2, false, 0]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
};

const HeartScene = () => {
  return (
    <>
      <Heart />
      <Flowers />
    </>
  );
};

export default HeartScene;
'use client';

import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
}

interface ModelProps {
  activeAnnotation: string | null;
  onAnnotationClick: (id: string) => void;
  annotations: readonly Annotation[];
}

function AnnotationMarker({ 
  annotation, 
  isActive, 
  onClick 
}: { 
  annotation: Annotation; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <group position={[...annotation.position] as [number, number, number]}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial 
          color={isActive ? "#ffffff" : "#ffcccc"} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      <Html distanceFactor={10}>
        <div
          style={{
            background: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(139,21,56,0.8)',
            color: isActive ? '#000' : '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            pointerEvents: 'none'
          }}
        >
          {annotation.title}
        </div>
      </Html>
    </group>
  );
}

function Model({ activeAnnotation, onAnnotationClick, annotations }: ModelProps) {
  const { scene } = useGLTF('/models/g63/source/g-wagon.glb');
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Анимация камеры при выборе аннотации
  useEffect(() => {
    if (activeAnnotation && modelRef.current) {
      const annotation = annotations.find(a => a.id === activeAnnotation);
      if (annotation) {
        const [x, y, z] = annotation.position;
        // Плавное перемещение камеры
        const targetPosition = new THREE.Vector3(x + 2, y + 1, z + 2);
        
        // Простая анимация
        const startPosition = camera.position.clone();
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          camera.position.lerpVectors(startPosition, targetPosition, progress);
          camera.lookAt(x, y, z);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }
    }
  }, [activeAnnotation, annotations, camera]);

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, -1, 0]}
      />
      
      {annotations.map((annotation) => (
        <AnnotationMarker
          key={annotation.id}
          annotation={annotation}
          isActive={activeAnnotation === annotation.id}
          onClick={() => onAnnotationClick(annotation.id)}
        />
      ))}
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
}

interface ModelComponentProps {
  activeAnnotation: string | null;
  onAnnotationClick: (id: string) => void;
  annotations: readonly Annotation[];
}

export default function ModelComponent({ 
  activeAnnotation, 
  onAnnotationClick, 
  annotations 
}: ModelComponentProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
      
      <Suspense fallback={<Loader />}>
        <Model 
          activeAnnotation={activeAnnotation}
          onAnnotationClick={onAnnotationClick}
          annotations={annotations}
        />
      </Suspense>
      
      <Environment preset="sunset" />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

useGLTF.preload('/models/g63/source/g-wagon.glb');
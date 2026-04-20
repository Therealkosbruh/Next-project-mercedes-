"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  PerspectiveCamera,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import annotationStyles from "@/styles/components/annotation.module.scss";
import parentStyles from "@/styles/components/model-parent.module.scss";

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
  readonly cameraPosition?: readonly [number, number, number];
  readonly specs?: readonly string[];
}

interface ModelProps {
  activeAnnotation: string | null;
  onAnnotationClick: (id: string) => void;
  annotations: readonly Annotation[];
  onLoaded?: () => void;
}

function AnnotationMarker({
  annotation,
  isActive,
  onClick,
}: {
  annotation: Annotation;
  isActive: boolean;
  onClick: () => void;
}) {
  const hasStats =
    annotation.id !== "default" &&
    annotation.specs &&
    annotation.specs.length > 0;

  return (
    <group position={[...annotation.position] as [number, number, number]}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#ffffff" : "#ffcccc"}
          transparent
          opacity={isActive ? 1 : 0.8}
        />
      </mesh>
      {!isActive && (
        <Html distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(139,21,56,0.85)",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              pointerEvents: "none",
            }}
          >
            {annotation.title}
          </div>
        </Html>
      )}
      {isActive && hasStats && (
        <Html style={{ pointerEvents: "none" }}>
          <div className={annotationStyles.statsOverlay}>
            <div className={annotationStyles.statsLine} />
            <div className={annotationStyles.statsPanel}>
              <p className={annotationStyles.statsTitle}>{annotation.title}</p>
              {annotation.specs!.map((spec, i) => (
                <p key={i} className={annotationStyles.statsItem}>
                  · {spec}
                </p>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Model({
  activeAnnotation,
  onAnnotationClick,
  annotations,
  onLoaded,
}: ModelProps) {
  const { scene } = useGLTF("/models/g63/source/g-wagon.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const minDist = size.width < 600 ? 13 : 10;
  const modelCenter = new THREE.Vector3(0, 0.5, 0);

  useEffect(() => {
    onLoaded?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeAnnotation && modelRef.current) {
      const annotation = annotations.find((a) => a.id === activeAnnotation);
      if (annotation) {
        const [x, y, z] = annotation.position;
        const raw = annotation.cameraPosition
          ? new THREE.Vector3(...annotation.cameraPosition)
          : new THREE.Vector3(x + 2, y + 1, z + 2);

        const targetPosition = raw.length() < minDist
          ? raw.clone().normalize().multiplyScalar(minDist)
          : raw.clone();
        const startPosition = camera.position.clone();
        const duration = 1000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const t = 1 - Math.pow(1 - progress, 3);

          camera.position.lerpVectors(startPosition, targetPosition, t);
          camera.lookAt(modelCenter);

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
      <primitive object={scene} scale={1} position={[0, -1, 0]} />

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

interface ModelComponentProps {
  activeAnnotation: string | null;
  onAnnotationClick: (id: string) => void;
  annotations: readonly Annotation[];
}

export default function ModelComponent({
  activeAnnotation,
  onAnnotationClick,
  annotations,
}: ModelComponentProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={parentStyles.modelCanvasWrap}>
      {loading && (
        <div className={parentStyles.modelLoader}>
          <span className={parentStyles.modelLoaderRing} />
          <span className={parentStyles.modelLoaderLabel}>Loading</span>
        </div>
      )}
      <Canvas style={{ width: "100%", height: "100%" }} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={50} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
        />

        <Suspense fallback={null}>
          <Model
            activeAnnotation={activeAnnotation}
            onAnnotationClick={onAnnotationClick}
            annotations={annotations}
            onLoaded={() => setLoading(false)}
          />
        </Suspense>

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/g63/source/g-wagon.glb");

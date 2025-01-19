import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei"; // For basic 3D helpers

function Car3d() {
  // Car component with rotation animation
  const Car = () => {
    const carRef = useRef();

    // Rotating the car on the Y-axis
    useState(() => {
      const interval = setInterval(() => {
        carRef.current.rotation.y += 0.01;
      }, 16);
      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <div>
          <mesh ref={}>
            <boxGeometry args={[2, 1, 1]} /> {/* Replace with your car model */}
            <meshStandardMaterial color="skyblue" />
          </mesh>
        </div>

        <div style={{ height: "100vh", width: "100%" }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Car />
            <OrbitControls /> {/* Enables interactive camera controls */}
          </Canvas>
        </div>
      </div>
    );
  };
}
export default Car3d;

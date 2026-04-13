"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { animated as animatedWeb, useSpring as useSpringWeb } from "@react-spring/web";
import { MeshPhysicalMaterial } from "three";

function Ball({ isOn }: { isOn: boolean }) {
    const { posX, rotY } = useSpring({
        posX: isOn ? 1.111 : -1.111,
        rotY: isOn ? Math.PI : 0,
        config: { duration: 400 },
    });

    const redMat = new MeshPhysicalMaterial({
        color: "#c93844",
        roughness: 0.6,
        emissive: "#442222",
    });
    const greenMat = new MeshPhysicalMaterial({
        color: "#6aba37",
        roughness: 0.6,
    });

    return (
        <animated.group position-x={posX} rotation-y={rotY}>
            <mesh material={redMat}>
                <sphereGeometry args={[1.111, 100, 40, 0, Math.PI]} />
            </mesh>
            <mesh material={greenMat}>
                <sphereGeometry args={[1.111, 100, 40, Math.PI, Math.PI]} />
            </mesh>
        </animated.group>
    );
}

export default function Page() {
    const [isOn, setIsOn] = useState(false);

    const containerSpring = useSpringWeb({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 400 },
    });

    const { progress } = useSpringWeb({
        progress: isOn ? 1 : 0,
        config: { duration: 400 },
    });

    const leftWidth = progress.to(p => {
        const centerPercent = 24 + p * 52;
        return `${centerPercent}%`;
    });

    const rightWidth = progress.to(p => {
        const centerPercent = 24 + p * 52;
        return `${100 - centerPercent}%`;
    });

    const shadowX = progress.to(p => `${24 + p * 52}%`);

    const leftShadowOpacity = useSpringWeb({
        opacity: isOn ? 0 : 1,
        config: { duration: 400 },
    });

    const rightShadowOpacity = useSpringWeb({
        opacity: isOn ? 1 : 0,
        config: { duration: 400 },
    });

    const tumblerShadow = progress.to(p => {
        const offset = -2 + p * 6;
        return `${offset}px 0px 3px rgba(0, 0, 0, 0.5)`;
    });

    return (
        <animatedWeb.div
            style={{
                opacity: containerSpring.opacity,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#f2efef",
                fontFamily: "system-ui, sans-serif",
                backgroundImage: "url('/assets/smooth-plaster-wall.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <animatedWeb.div
                style={{
                    position: "relative",
                    padding: "22px",
                    borderRadius: "999px",
                    background: "#dadae3",
                    boxShadow: `
                        -20px 40px 40px rgba(0, 0, 0, 0.2),
                        0 4px 8px rgba(0, 0, 0, 0.02),
                        inset 0 2px 1px 1px rgba(255, 255, 255, 0.8),
                        inset 0 -2px 1px rgba(255, 255, 255, 0.3),
                        inset 0 -3px 6px rgba(0, 0, 0, 0.3)
                    `,
                }}
            >
                {/* Левая красная тень */}
                <animatedWeb.div
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        height: "90px",
                        width: "50px",
                        borderRadius: "9999px 0 0 9999px",
                        background: "rgba(201, 56, 68, 0.4)",
                        filter: "blur(8px)",
                        pointerEvents: "none",
                        zIndex: 5,
                        opacity: leftShadowOpacity.opacity,
                        left: progress.to(p => {
                            const trackLeft = 0;
                            const trackWidth = 160;
                            const shadowWidth = 40;
                            const ballCenter = trackLeft + (24 + p * 52) * trackWidth / 100;
                            return `${ballCenter - shadowWidth / 2}px`;
                        }),
                    }}
                />

                {/* Правая зелёная тень */}
                <animatedWeb.div
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        height: "90px",
                        width: "50px",
                        borderRadius: "0 9999px 9999px 0",
                        background: "rgba(106, 186, 55, 0.4)",
                        filter: "blur(8px)",
                        pointerEvents: "none",
                        zIndex: 5,
                        opacity: rightShadowOpacity.opacity,
                        left: progress.to(p => {
                            const trackLeft = 34;
                            const trackWidth = 160;
                            const shadowWidth = 40;
                            const ballCenter = trackLeft + (24 + p * 52) * trackWidth / 100;
                            return `${ballCenter - shadowWidth / 2}px`;
                        }),
                    }}
                />

                <animatedWeb.div
                    onClick={() => setIsOn(!isOn)}
                    style={{
                        position: "relative",
                        width: "160px",
                        height: "80px",
                        borderRadius: "40px",
                        boxShadow: tumblerShadow.to(shadow => `
                            ${shadow},
                            0 -5px 1px rgba(255, 255, 255, 0.3),
                            0 -3px 2px rgba(0, 0, 0, 0.2),
                            0 4px 2px rgba(255, 255, 255, 0.8),
                            0 2px 2px rgba(0, 0, 0, 0.7)
                        `),
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "#e5e5ea",
                    }}
                >
                    <animatedWeb.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: leftWidth,
                            borderRadius: "40px 0px 0px 40px",
                            background: "#6aba37",
                            boxShadow: "inset 0 20px 16px rgba(0,0,0,0.3), inset 0 -3px 15px rgba(0,0,0,0.2)",
                        }}
                    />
                    <animatedWeb.div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: "100%",
                            width: rightWidth,
                            borderRadius: "0px 40px 40px 0px",
                            background: "#c93844",
                            boxShadow: "inset 0 20px 16px rgba(0,0,0,0.3), inset 0 -3px 15px rgba(0,0,0,0.2)",
                        }}
                    />

                    <animatedWeb.div
                        style={{
                            position: "absolute",
                            bottom: "4px",
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                        }}
                    >
                        <animatedWeb.div
                            style={{
                                position: "absolute",
                                left: shadowX,
                                bottom: "0px",
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                background: "rgba(0, 0, 0, 1)",
                                filter: "blur(18px)",
                                transform: "translateX(-50%)",
                            }}
                        />
                    </animatedWeb.div>

                    <animatedWeb.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: "none",
                            zIndex: 1000,
                        }}
                    >
                        <Canvas
                            orthographic
                            camera={{ position: [0, 0, 5], zoom: 36, near: 0.1, far: 100 }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ambientLight intensity={0.3} />
                            <directionalLight position={[10, 6, 6]} intensity={1.8} />
                            <directionalLight position={[2, 20, 30]} intensity={1.8} />
                            <directionalLight position={[40, -10, 10]} intensity={1} />
                            <directionalLight position={[-10, -20, 18]} intensity={1.4} />


                            <Ball isOn={isOn} />
                        </Canvas>
                    </animatedWeb.div>
                </animatedWeb.div>
            </animatedWeb.div>
        </animatedWeb.div>
    );
}
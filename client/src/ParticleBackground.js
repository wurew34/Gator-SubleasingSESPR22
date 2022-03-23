import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./config/particle-config";
import './components/pages/styles.css';

export default function ParticleBackground() {
  return <Particles id="particle-js" params={particlesConfig} />;
}

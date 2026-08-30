import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { RoundedBoxGeometry } from "three-stdlib";
import { TOOL_ICONS, createToolTexture } from "./utils/textureGenerator";

/**
 * Creates a 3D Rounded Squircle / Square Tile Geometry
 * with custom double-sided orthographic UV mapping
 * so the software icon logo is crisp and right-side-up on BOTH front and back faces!
 */
function createDoubleSidedSquircleGeometry(
  size = 1.7,
  depth = 0.44,
  radius = 0.38,
  smoothness = 6
) {
  const geom = new RoundedBoxGeometry(size, size, depth, smoothness, radius);
  const pos = geom.attributes.position;
  const uvs = geom.attributes.uv;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Front face (z >= 0) and Back face (z < 0)
    // Map [-size/2, size/2] to [0, 1]
    const uFront = 0.5 + x / (size * 1.02);
    const uBack = 0.5 - x / (size * 1.02);
    const v = 0.5 + y / (size * 1.02);

    if (z >= 0) {
      uvs.setXY(
        i,
        Math.max(0.01, Math.min(0.99, uFront)),
        Math.max(0.01, Math.min(0.99, v))
      );
    } else {
      uvs.setXY(
        i,
        Math.max(0.01, Math.min(0.99, uBack)),
        Math.max(0.01, Math.min(0.99, v))
      );
    }
  }
  uvs.needsUpdate = true;
  return geom;
}

// 24 total 3D squircle tiles representing all 12 tools (2 of each tool)
const TOTAL_TILES = 24;
const scales = [0.75, 0.95, 1.15, 0.85, 1.05];

const tilesData = [...Array(TOTAL_TILES)].map((_, i) => ({
  scale: scales[i % scales.length],
  toolIndex: i % TOOL_ICONS.length, // 0..11 for all 12 tools
}));

type TileProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  geometry: THREE.BufferGeometry;
  isActive: boolean;
};

function SquirclePhysicsTile({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  geometry,
  isActive,
}: TileProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale * 0.95]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={geometry}
        material={material}
        rotation={[0.3, 0.8, 0.6]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.2]} />
    </RigidBody>
  );
}

interface SoftwareIconBallsProps {
  isActive: boolean;
}

export const SoftwareIconBalls = ({ isActive }: SoftwareIconBallsProps) => {
  // 3D Rounded Squircle / Square tile geometry
  const geometry = useMemo(
    () => createDoubleSidedSquircleGeometry(1.65, 0.44, 0.36, 6),
    []
  );

  // Create high-res textures and materials for each of the 12 tools
  const materials = useMemo(() => {
    return TOOL_ICONS.map((tool) => {
      const texture = createToolTexture(tool.id);
      const isWhiteBg =
        tool.id === "capcut" ||
        tool.id === "code" ||
        tool.id === "cpp" ||
        tool.id === "blender" ||
        tool.id === "gemini";

      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: new THREE.Color(isWhiteBg ? "#180e2a" : "#3b155e"),
        emissiveIntensity: isWhiteBg ? 0.15 : 0.35,
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 0.95,
        clearcoatRoughness: 0.08,
        reflectivity: 0.95,
      });
    });
  }, []);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer isActive={isActive} />
      {tilesData.map((props, i) => (
        <SquirclePhysicsTile
          key={i}
          scale={props.scale}
          material={materials[props.toolIndex]}
          geometry={geometry}
          isActive={isActive}
        />
      ))}
    </Physics>
  );
};

export default SoftwareIconBalls;

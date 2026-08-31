import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let modelUrl: string;
        try {
          if (typeof window !== "undefined" && window.crypto?.subtle) {
            const encryptedBlob = await decryptFile(
              "/models/character.enc",
              "Character3D#@"
            );
            modelUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          } else {
            modelUrl = "/models/character.glb";
          }
        } catch {
          modelUrl = "/models/character.glb";
        }

        loader.load(
          modelUrl,
          async (gltf) => {
            try {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: any) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.frustumCulled = true;
                }
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              const footR = character.getObjectByName("footR");
              if (footR) footR.position.y = 3.36;
              const footL = character.getObjectByName("footL");
              if (footL) footL.position.y = 3.36;
              dracoLoader.dispose();
            } catch (innerErr) {
              resolve(gltf);
            }
          },
          undefined,
          (error) => {
            console.warn("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        console.warn("Character load caught error:", err);
        reject(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;

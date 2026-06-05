"use client";

import { StarField } from "./star-field";
import { SciFiAtmosphere } from "./sci-fi-atmosphere";
import { SceneOne } from "./scene-one";
import { SceneTwo } from "./scene-two";
import { SceneThree } from "./scene-three";
import { SceneFour } from "./scene-four";
import { SceneFive } from "./scene-five";
import { SceneSix } from "./scene-six";
import { SceneSeven } from "./scene-seven";

export function TimelinePage() {
  return (
    <main style={{ position: "relative", background: "var(--night)" }}>
      {/* Stars are fixed behind everything — they never scroll */}
      <StarField />
      <SciFiAtmosphere />

      {/* Scene 1: Two Trajectories Intersect — Dec 31, 2025 */}
      <SceneOne />

      {/* Scene 2: One Month Later — Jan 31, 2026 */}
      <SceneTwo />

      {/* Scene 3: Love In Motion — Feb–May 2026 */}
      <SceneThree />

      {/* Scene 4: The Test That Changed Everything — June 1, 2026 */}
      <SceneFour />

      {/* Scene 5: The Future Doubled — June 2026 */}
      <SceneFive />

      {/* Scene 6: Countdown To January — June 2026 → January 2027 */}
      <SceneSix />

      {/* Scene 7: The Beginning Of Everything — January 2027 */}
      <SceneSeven />
    </main>
  );
}

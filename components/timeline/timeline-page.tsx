"use client";

import { StarField } from "./star-field";
import { SceneOne } from "./scene-one";
import { SceneTwo } from "./scene-two";
import { SceneThree } from "./scene-three";

export function TimelinePage() {
  return (
    <main style={{ position: "relative", background: "var(--night)" }}>
      {/* Stars are fixed behind everything — they never scroll */}
      <StarField />

      {/* Scene 1: Two Trajectories Intersect — Dec 31, 2025 */}
      <SceneOne />

      {/* Scene 2: One Month Later — Jan 31, 2026 */}
      <SceneTwo />

      {/* Scene 3: Love In Motion — Feb–May 2026 */}
      <SceneThree />

      {/*
        Scenes 4–7 will be added in future sessions.
        4: The Test That Changed Everything (June 1, 2026)
        5: The Future Doubled (twins reveal)
        6: Countdown to January
        7: The Beginning Of Everything
      */}
    </main>
  );
}

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

/**
 * Physics config for favicon rotation animation
 *
 * friction:     Decay multiplier per frame (0.98 = 2% speed loss per frame).
 *               Lower = stops faster, higher = coasts longer.
 * scrollForce:  How much scroll velocity affects rotation.
 *               Higher = more responsive to scrolling.
 * initialNudge: Starting angular velocity in degrees/second.
 * minVelocity:  Floor speed - rotation never drops below this (degrees/second).
 *               Ensures the favicon is always spinning.
 */
const PHYSICS_CONFIG = {
  friction: 0.995,
  scrollForce: 0.05,
  initialNudge: 45,
  minVelocity: 0,
};

const GameBanner = () => {
  const config = PHYSICS_CONFIG;

  const rotation = useMotionValue(0);
  const angularVelocity = useRef(config.initialNudge);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useAnimationFrame((_, delta) => {
    // Apply scroll force to angular velocity
    // Scroll down = positive force (clockwise)
    // Scroll up = negative force (counter-clockwise)
    const scrollForce = scrollVelocity.get() * config.scrollForce;
    angularVelocity.current += scrollForce;

    // Apply friction (exponential decay)
    angularVelocity.current *= config.friction;

    // Apply minimum velocity floor (preserve direction)
    if (Math.abs(angularVelocity.current) < config.minVelocity) {
      angularVelocity.current =
        Math.sign(angularVelocity.current || 1) * config.minVelocity;
    }

    // Update rotation based on angular velocity
    const deltaSeconds = delta / 1000;
    rotation.set(rotation.get() + angularVelocity.current * deltaSeconds);
  });

  return (
    <div className="sticky top-0 z-50 bg-primary py-[clamp(1.5rem,4vh,3rem)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-center gap-4 max-w-[clamp(20rem,90vw,48rem)] mx-auto">
        <motion.img
          src="/favicon-192.png"
          alt="Three Beasts logo"
          className="w-[clamp(2.5rem,6vw,4rem)] h-[clamp(2.5rem,6vw,4rem)]"
          style={{ rotate: rotation }}
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground text-center">
          The Three Beasts
        </h1>
      </div>
    </div>
  );
};

export default GameBanner;

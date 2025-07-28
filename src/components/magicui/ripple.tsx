import React from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  // 고유한 ID 생성으로 완전히 격리된 애니메이션
  const rippleId = React.useId();
  const animationName = `ripple-${rippleId.replace(/:/g, "")}`;

  return (
    <>
      {/* 컴포넌트별 고유 키프레임 정의 */}
      <style>
        {`
          @keyframes ${animationName} {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: ${mainCircleOpacity};
            }
            50% {
              transform: translate(-50%, -50%) scale(0.9);
              opacity: ${mainCircleOpacity * 0.7};
            }
          }
        `}
      </style>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
          className
        )}
        {...props}
      >
        {Array.from({ length: numCircles }, (_, i) => {
          const size = mainCircleSize + i * 70;
          const opacity = mainCircleOpacity - i * 0.03;
          const animationDelay = `${i * 0.06}s`;

          const circleStyle: CSSProperties = {
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDelay,
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: `rgba(255, 255, 255, 0.3)`,
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            animationName: animationName,
            animationDuration: "3s",
            animationTimingFunction: "ease",
            animationIterationCount: "infinite",
          } as CSSProperties;

          return (
            <div
              key={i}
              className="absolute rounded-full border shadow-xl"
              style={circleStyle}
            />
          );
        })}
      </div>
    </>
  );
});

Ripple.displayName = "Ripple";

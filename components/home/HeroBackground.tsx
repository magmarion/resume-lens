"use client";

import { useEffect, useRef } from "react";
import { ORBS } from "./hero.constants";

export interface Orb {
    cx: number;
    cy: number;
    r: number;
    color: string;
    sinFreq: number;
    cosFreq: number;
    sinAmp: number;
    cosAmp: number;
    alpha: number;
    alphaFade: number;
}

export function HeroBackground() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let t = 0;

        function resize() {
            if (!canvas || !ctx) return;
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        resize();
        window.addEventListener("resize", resize);

        function drawOrb(orb: Orb) {
            if (!canvas || !ctx) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const ox = w * (orb.cx + Math.sin(t * orb.sinFreq) * orb.sinAmp);
            const oy = h * (orb.cy + Math.cos(t * orb.cosFreq) * orb.cosAmp);
            const rad = w * orb.r;
            const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
            g.addColorStop(0, `rgba(${orb.color},${orb.alpha})`);
            g.addColorStop(0.5, `rgba(${orb.color},${orb.alphaFade})`);
            g.addColorStop(1, `rgba(${orb.color},0)`);
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        }

        function draw() {
            if (!canvas || !ctx) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            ORBS.forEach(drawOrb);
            t++;
            animId = requestAnimationFrame(draw);
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            t = 300;
            if (canvas && ctx) {
                const w = canvas.offsetWidth;
                const h = canvas.offsetHeight;
                ctx.clearRect(0, 0, w, h);
                ORBS.forEach(drawOrb);
            }
        } else {
            draw();
        }

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}
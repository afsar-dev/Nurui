/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/nurui/button";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";

interface GeoFeature {
  type: string;
  geometry: any;
  properties: any;
}

function interpolateProjection(raw0: any, raw1: any) {
  const mutate: any = d3.geoProjectionMutator(
    (t: number) => (x: number, y: number) => {
      const [x0, y0] = raw0(x, y);
      const [x1, y1] = raw1(x, y);
      return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
    },
  );
  let t = 0;
  return Object.assign((mutate as any)(t), {
    alpha(_: number) {
      return arguments.length ? (mutate as any)((t = +_)) : t;
    },
  });
}

export function GlobeToMapTransform() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [worldData, setWorldData] = useState<GeoFeature[]>([]);
  const [rotation, setRotation] = useState([0, 0]);
  const [translation, setTranslation] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState([0, 0]);

  const width = 800;
  const height = 500;

  // Load world data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        // Using Natural Earth data from a CDN
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        );
        const world: any = await response.json();
        // topojson-client's `feature` return type can be ambiguous; cast to any/FeatureCollection to access .features
        const countries = (feature(world, world.objects.countries) as any)
          .features;
        setWorldData(countries);
        console.log(
          "[v0] Successfully loaded world data with",
          countries.length,
          "countries",
        );
      } catch (error) {
        console.log("[v0] Error loading world data:", error);
        // Fallback: create a simple world outline
        const fallbackData = [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
              ],
            },
            properties: {},
          },
        ];
        setWorldData(fallbackData);
      }
    };

    loadWorldData();
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setLastMouse([event.clientX - rect.left, event.clientY - rect.top]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentMouse = [event.clientX - rect.left, event.clientY - rect.top];
    const dx = currentMouse[0] - lastMouse[0];
    const dy = currentMouse[1] - lastMouse[1];

    const t = progress[0] / 100;

    if (t < 0.5) {
      // Globe mode - rotate
      const sensitivity = 0.5;
      // NOTE: flip horizontal sign so dragging right rotates globe to the right
      setRotation((prev) => [
        prev[0] + dx * sensitivity,
        Math.max(-90, Math.min(90, prev[1] - dy * sensitivity)),
      ]);
    } else {
      // Map mode - rotate the projection (not simple pan)
      // This updates the projection.rotate(...) used when in equirectangular mode.
      const sensitivityMap = 0.25; // lower sensitivity for longitude/latitude rotation
      setRotation((prev) => [
        prev[0] + dx * sensitivityMap,
        Math.max(-90, Math.min(90, prev[1] - dy * sensitivityMap)),
      ]);
    }

    setLastMouse(currentMouse);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Initialize and update visualization
  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const t = progress[0] / 100;
    const alpha = Math.pow(t, 0.5); // Ease-out for smoother animation

    const scale = d3.scaleLinear().domain([0, 1]).range([200, 120]);
    const baseRotate = d3.scaleLinear().domain([0, 1]).range([0, 0]);

    const projection = interpolateProjection(
      d3.geoOrthographicRaw,
      d3.geoEquirectangularRaw,
    )
      .scale(scale(alpha))
      .translate([width / 2 + translation[0], height / 2 + translation[1]])
      .rotate([baseRotate(alpha) + rotation[0], rotation[1]])
      .precision(0.1);

    // Set the interpolation parameter
    projection.alpha(alpha);

    // Create path generator
    const path = d3.geoPath(projection);

    // Add graticule (grid lines) above ocean fill but below countries
    try {
      const graticule = d3.geoGraticule();
      const graticulePath = path(graticule());
      if (graticulePath) {
        svg
          .append("path")
          .datum(graticule())
          .attr("d", graticulePath)
          .attr("fill", "none")
          .attr("stroke", "#3ca2fa")
          .attr("stroke-width", 1)
          .attr("opacity", 0.2);
      }
    } catch (error) {
      console.log("[v0] Error creating graticule:", error);
    }

    // Add countries
    svg
      .selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => {
        try {
          const pathString = path(d as any);
          if (!pathString) return "";
          if (
            typeof pathString === "string" &&
            (pathString.includes("NaN") || pathString.includes("Infinity"))
          ) {
            return "";
          }
          return pathString;
        } catch (error) {
          console.log("[v0] Error generating path for country:", error);
          return "";
        }
      })
      .attr("fill", "none")
      .attr("stroke", "#3ca2fa")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1.0)
      .style("visibility", function () {
        const pathData = d3.select(this).attr("d");
        return pathData && pathData.length > 0 && !pathData.includes("NaN")
          ? "visible"
          : "hidden";
      });
    // hover handlers removed to keep country borders style constant

    // Draw sphere outline on top so the map border overlays countries
    try {
      const sphereOutline = path({ type: "Sphere" });
      if (sphereOutline) {
        svg
          .append("path")
          .datum({ type: "Sphere" })
          .attr("d", sphereOutline)
          .attr("fill", "none")
          .attr("stroke", "#3ca2fa")
          .attr("stroke-width", 1)
          .attr("opacity", 1.0);
      }
    } catch (error) {
      console.log("[v0] Error creating sphere outline:", error);
    }

    console.log("[v0] Visualization updated with progress:", progress[0]);
  }, [worldData, progress, rotation, translation]);

  const handleAnimate = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const startProgress = progress[0];
    const endProgress = startProgress === 0 ? 100 : 0;
    const duration = 2000;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const currentProgress =
        startProgress + (endProgress - startProgress) * eased;

      setProgress([currentProgress]);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animate();
  };

  const handleReset = () => {
    setRotation([0, 0]);
    setTranslation([0, 0]);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full border rounded-lg bg-transparent border-[#3ca2fa66] cursor-grab active:cursor-grabbing"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute bottom-2 right-4 flex gap-2 z-10">
        <Button
          onClick={handleAnimate}
          disabled={isAnimating}
          className="cursor-pointer min-w-[120px] rounded"
        >
          {isAnimating
            ? "Animating..."
            : progress[0] === 0
              ? "Unroll Globe"
              : "Roll to Globe"}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="cursor-pointer min-w-[80px] dark:text-white border-black dark:border-white/20 hover:bg-white/5 bg-transparent rounded"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

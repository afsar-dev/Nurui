/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useCallback } from "react";

// Type definitions
interface PointerState {
  x: number;
  y: number;
  tX: number;
  tY: number;
}

interface UniformLocations {
  [key: string]: WebGLUniformLocation | null;
}

// Shader source types
type ShaderType =
  | WebGLRenderingContext["VERTEX_SHADER"]
  | WebGLRenderingContext["FRAGMENT_SHADER"];

const NeuralNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<UniformLocations | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  const vertexShaderSource: string = `
    precision mediump float;

    varying vec2 vUv;
    attribute vec2 a_position;

    void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource: string = `
    precision mediump float;

    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;

    vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;

        for (int j = 0; j < 15; j++) {
            uv = rotate(uv, 1.0);
            sine_acc = rotate(sine_acc, 1.0);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.4 * p;
            res += (0.5 + 0.5 * cos(layer)) / scale;
            scale *= 1.2;
        }
        return res.x + res.y;
    }

    void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);

        float t = 0.001 * u_time;
        vec3 color = vec3(0.0);

        float noise = neuro_shape(uv, t, p);

        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));

        // Green/mint color palette based on #80eeb4
        color = vec3(0.5, 0.93, 0.71); // Base mint green color (#80eeb4)
        color += vec3(0.2, 0.8, 0.4) * sin(3.0 * u_scroll_progress + 1.5); // Green variation

        color = color * noise;

        gl_FragColor = vec4(color, noise);
    }
  `;

  const createShader = useCallback(
    (
      gl: WebGLRenderingContext,
      sourceCode: string,
      type: ShaderType,
    ): WebGLShader | null => {
      const shader: WebGLShader | null = gl.createShader(type);
      if (!shader) {
        console.error("Failed to create shader");
        return null;
      }

      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorLog: string | null = gl.getShaderInfoLog(shader);
        console.error("An error occurred compiling the shaders: " + errorLog);
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    [],
  );

  const createShaderProgram = useCallback(
    (
      gl: WebGLRenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader,
    ): WebGLProgram | null => {
      const program: WebGLProgram | null = gl.createProgram();
      if (!program) {
        console.error("Failed to create shader program");
        return null;
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const errorLog: string | null = gl.getProgramInfoLog(program);
        console.error("Unable to initialize the shader program: " + errorLog);
        gl.deleteProgram(program);
        return null;
      }

      return program;
    },
    [],
  );

  const getUniforms = useCallback(
    (gl: WebGLRenderingContext, program: WebGLProgram): UniformLocations => {
      const uniforms: UniformLocations = {};
      const uniformCount: number = gl.getProgramParameter(
        program,
        gl.ACTIVE_UNIFORMS,
      );

      for (let i = 0; i < uniformCount; i++) {
        const uniformInfo: WebGLActiveInfo | null = gl.getActiveUniform(
          program,
          i,
        );
        if (uniformInfo) {
          const location: WebGLUniformLocation | null = gl.getUniformLocation(
            program,
            uniformInfo.name,
          );
          uniforms[uniformInfo.name] = location;
        }
      }
      return uniforms;
    },
    [],
  );

  const initShader = useCallback((): WebGLRenderingContext | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found");
      return null;
    }

    const gl: WebGLRenderingContext | null =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.error("WebGL is not supported by your browser.");
      return null;
    }

    const vertexShader: WebGLShader | null = createShader(
      gl,
      vertexShaderSource,
      gl.VERTEX_SHADER,
    );
    const fragmentShader: WebGLShader | null = createShader(
      gl,
      fragmentShaderSource,
      gl.FRAGMENT_SHADER,
    );

    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create shaders");
      return null;
    }

    const shaderProgram: WebGLProgram | null = createShaderProgram(
      gl,
      vertexShader,
      fragmentShader,
    );
    if (!shaderProgram) {
      console.error("Failed to create shader program");
      return null;
    }

    programRef.current = shaderProgram;
    uniformsRef.current = getUniforms(gl, shaderProgram);

    const vertices: Float32Array = new Float32Array([
      -1, -1, 1, -1, -1, 1, 1, 1,
    ]);

    const vertexBuffer: WebGLBuffer | null = gl.createBuffer();
    if (!vertexBuffer) {
      console.error("Failed to create vertex buffer");
      return null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation: number = gl.getAttribLocation(
      shaderProgram,
      "a_position",
    );
    if (positionLocation === -1) {
      console.error("Failed to get position attribute location");
      return null;
    }

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return gl;
  }, [createShader, createShaderProgram, getUniforms]);

  const resizeCanvas = useCallback((): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const gl: WebGLRenderingContext | null = glRef.current;
    const uniforms: UniformLocations | null = uniformsRef.current;

    if (!canvas || !gl || !uniforms) {
      console.warn("Missing dependencies for canvas resize");
      return;
    }

    const devicePixelRatio: number = Math.min(window.devicePixelRatio || 1, 2);
    const width: number = window.innerWidth * devicePixelRatio;
    const height: number = window.innerHeight * devicePixelRatio;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    gl.viewport(0, 0, width, height);

    if (uniforms.u_ratio) {
      gl.uniform1f(uniforms.u_ratio, width / height);
    }
  }, []);

  const render = useCallback((): void => {
    const gl: WebGLRenderingContext | null = glRef.current;
    const uniforms: UniformLocations | null = uniformsRef.current;
    const pointer: PointerState = pointerRef.current;

    if (!gl || !uniforms) {
      console.warn("Missing WebGL context or uniforms for rendering");
      return;
    }

    const currentTime: number = performance.now();

    // Smooth pointer interpolation
    pointer.x += (pointer.tX - pointer.x) * 0.1;
    pointer.y += (pointer.tY - pointer.y) * 0.1;

    // Clear canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Update uniforms with null checks
    if (uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, currentTime);
    }

    if (uniforms.u_pointer_position) {
      const normalizedX: number = pointer.x / window.innerWidth;
      const normalizedY: number = 1 - pointer.y / window.innerHeight;
      gl.uniform2f(uniforms.u_pointer_position, normalizedX, normalizedY);
    }

    if (uniforms.u_scroll_progress) {
      const maxScroll: number = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const scrollProgress: number = window.pageYOffset / maxScroll;
      gl.uniform1f(uniforms.u_scroll_progress, scrollProgress);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationRef.current = requestAnimationFrame(render);
  }, []);

  const updateMousePosition = useCallback((x: number, y: number): void => {
    if (typeof x !== "number" || typeof y !== "number") {
      console.warn("Invalid mouse position coordinates");
      return;
    }
    pointerRef.current.tX = x;
    pointerRef.current.tY = y;
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent): void => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        updateMousePosition(e.clientX, e.clientY);
      }
    },
    [updateMousePosition],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent): void => {
      e.preventDefault();
      if (e.touches && e.touches.length > 0) {
        const touch: Touch = e.touches[0];
        if (touch.clientX !== undefined && touch.clientY !== undefined) {
          updateMousePosition(touch.clientX, touch.clientY);
        }
      }
    },
    [updateMousePosition],
  );

  const handleClick = useCallback(
    (e: MouseEvent): void => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        updateMousePosition(e.clientX, e.clientY);
      }
    },
    [updateMousePosition],
  );

  const handleResize = useCallback((): void => {
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect((): (() => void) => {
    // Initialize WebGL
    const gl: WebGLRenderingContext | null = initShader();
    if (!gl) {
      console.error("Failed to initialize WebGL");
      return () => {}; // Return empty cleanup function
    }

    glRef.current = gl;

    // Set up canvas
    resizeCanvas();

    // Start render loop
    render();

    // Add event listeners with proper typing
    const resizeHandler = handleResize as EventListener;
    const pointerMoveHandler = handlePointerMove as EventListener;
    const touchMoveHandler = handleTouchMove as EventListener;
    const clickHandler = handleClick as EventListener;

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("pointermove", pointerMoveHandler);
    window.addEventListener("touchmove", touchMoveHandler, { passive: false });
    window.addEventListener("click", clickHandler);

    // Cleanup function
    return (): void => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("click", clickHandler);

      // Clean up WebGL resources
      const currentGl: WebGLRenderingContext | null = glRef.current;
      const currentProgram: WebGLProgram | null = programRef.current;

      if (currentGl && currentProgram) {
        currentGl.deleteProgram(currentProgram);
        programRef.current = null;
      }

      glRef.current = null;
      uniformsRef.current = null;
    };
  }, [
    initShader,
    resizeCanvas,
    render,
    handleResize,
    handlePointerMove,
    handleTouchMove,
    handleClick,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-95"
      style={{
        backgroundColor: "#000000",
        zIndex: -1,
      }}
    />
  );
};

export default NeuralNoise;

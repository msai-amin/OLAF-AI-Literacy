import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { IconScan, IconBook } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { LidarGuideContent } from './guides/LidarGuideContent';

export const LidarLab = () => {
    const mountRef = useRef(null);
    const pointsRef = useRef(null);
    const [mode, setMode] = useState('raw'); // raw, classified
    const [elevationFilter, setElevationFilter] = useState(0);
    const [showGuide, setShowGuide] = useState(false);

    // Re-bind the scene logic to capture the ref
    useEffect(() => {
        if(!mountRef.current) return;
        
        const mount = mountRef.current;
        
        // Clear previous contents if any
        while(mount.firstChild) {
            mount.removeChild(mount.firstChild);
        }

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111827);
        const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.set(0, 15, 30);
        camera.lookAt(0, 0, 0);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Data Gen
        const positions = [];
        const types = []; // 0=ground, 1=tree
        
        // Ground
        for(let i=0; i<4000; i++) {
            const x = (Math.random()-0.5)*60;
            const z = (Math.random()-0.5)*60;
            const y = Math.sin(x*0.1)*2 + Math.cos(z*0.1)*2; // Terrain
            positions.push(x,y,z);
            types.push(0);
        }
        // Trees
        for(let t=0; t<20; t++) {
            const tx = (Math.random()-0.5)*50;
            const tz = (Math.random()-0.5)*50;
            const baseH = Math.sin(tx*0.1)*2 + Math.cos(tz*0.1)*2;
            // Trunk
            for(let h=0; h<8; h+=0.3) {
                positions.push(tx + (Math.random()-0.5)*0.3, baseH + h, tz + (Math.random()-0.5)*0.3);
                types.push(1);
            }
            // Leaves
            for(let l=0; l<40; l++) {
                positions.push(
                    tx + (Math.random()-0.5)*5,
                    baseH + 5 + Math.random()*5,
                    tz + (Math.random()-0.5)*5
                );
                types.push(1);
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        // Init Colors
        const colors = new Float32Array(positions.length * 3); // 3 values per point
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({ size: 0.25, vertexColors: true });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);
        
        // Store refs for update loop
        pointsRef.current = { geometry, types, positions };

        // Handle resize
        const handleResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            pointCloud.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        animate();

        // Store renderer to clean up later
        const currentMount = mount;
        const currentRenderer = renderer;

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount && currentRenderer.domElement && currentMount.contains(currentRenderer.domElement)) {
                currentMount.removeChild(currentRenderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            currentRenderer.dispose();
        };
    }, []);

    // Effect to Update Colors based on State
    useEffect(() => {
        if(!pointsRef.current) return;
        
        const { geometry, types, positions } = pointsRef.current;
        const colors = geometry.attributes.color.array;
        const pos = positions; // [x,y,z, x,y,z...]

        for(let i=0; i < types.length; i++) {
            const y = pos[i*3 + 1]; // y coordinate
            const isTree = types[i] === 1;
            
            // Filter Logic: If point is below filter height, hide it (make black/transparent)
            // Note: ThreeJS points don't support transparency easily without sorting, so we'll just color them background color
            if (y < elevationFilter) {
                colors[i*3] = 0.07; // R (Dark Grey)
                colors[i*3+1] = 0.09; // G
                colors[i*3+2] = 0.15; // B
            } else {
                if (mode === 'raw') {
                    // White/Grey
                    colors[i*3] = 0.8;
                    colors[i*3+1] = 0.8;
                    colors[i*3+2] = 0.8;
                } else {
                    // Classified
                    if (isTree) {
                        colors[i*3] = 0.2; // R
                        colors[i*3+1] = 0.8; // G (Green)
                        colors[i*3+2] = 0.2; // B
                    } else {
                        colors[i*3] = 0.6; // R (Brownish)
                        colors[i*3+1] = 0.4; // G
                        colors[i*3+2] = 0.2; // B
                    }
                }
            }
        }
        geometry.attributes.color.needsUpdate = true;

    }, [mode, elevationFilter]);

    return (
        <div className="flex flex-col gap-4">
            {showGuide && (
                <LabGuideModal title="Lab 6: 3D LiDAR Point Cloud Processing" onClose={() => setShowGuide(false)}>
                    <LidarGuideContent />
                </LabGuideModal>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-600">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconScan className="text-purple-600"/> Module 6: LiDAR 3D Scanning
                    </h3>
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors"
                    >
                        <IconBook className="w-4 h-4" /> Open Lab Guide
                    </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                    <strong>Scenario:</strong> You've received a LiDAR point cloud from a drone survey. Raw data is just millions of "points in space" with X, Y, Z coordinates. 
                    AI performs <strong>Semantic Segmentation</strong> to classify each point as Ground or Vegetation.
                </p>
                
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-start gap-2 text-xs">
                        <span className="font-bold text-purple-800">💡 What's happening:</span>
                        <div className="text-purple-700">
                            {mode === 'raw' ? (
                                <span>Viewing <strong>raw point cloud</strong> - all points appear gray. The AI hasn't classified anything yet. This is what LiDAR sensors output: just coordinates, no labels.</span>
                            ) : (
                                <span>Viewing <strong>classified point cloud</strong> - AI has analyzed each point and labeled it. <span className="text-green-600 font-bold">Green = Vegetation (trees)</span>, <span className="text-amber-700 font-bold">Brown = Ground</span>. The classifier uses elevation, density, and spatial relationships to make these distinctions.</span>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setMode('raw')}
                            className={`px-4 py-2 text-sm font-bold rounded transition-colors ${mode==='raw' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Raw Data
                        </button>
                        <button 
                            onClick={() => setMode('classified')}
                            className={`px-4 py-2 text-sm font-bold rounded transition-colors ${mode==='classified' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Run AI Classification
                        </button>
                    </div>

                    <div className="flex-1 flex items-center gap-2 border-l pl-4 border-gray-300">
                        <label className="text-xs font-bold whitespace-nowrap">Filter Elevation:</label>
                        <input 
                            type="range" min="-5" max="15" 
                            value={elevationFilter} 
                            onChange={e=>setElevationFilter(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 w-12 text-right">{elevationFilter.toFixed(1)}m</span>
                    </div>
                </div>

                {mode === 'classified' && (
                    <div className="mt-3 flex gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-600 rounded"></div>
                            <span className="text-gray-700">Vegetation (Trees)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-amber-700 rounded"></div>
                            <span className="text-gray-700">Ground</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900">
                <div ref={mountRef} className="w-full h-full" />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-3 py-2 rounded pointer-events-none backdrop-blur-sm">
                    <div className="font-mono">
                        <div>Renderer: Three.js (WebGL)</div>
                        <div>Points: ~5,000</div>
                        <div>Mode: {mode === 'raw' ? 'Raw Point Cloud' : 'Classified (Ground/Veg)'}</div>
                        {elevationFilter > -5 && (
                            <div>Elevation Filter: {elevationFilter.toFixed(1)}m (points below hidden)</div>
                        )}
                    </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-2 rounded pointer-events-none backdrop-blur-sm">
                    <div className="text-yellow-300">💡 Tip: Use elevation filter to isolate canopy layers</div>
                </div>
            </div>
        </div>
    );
};


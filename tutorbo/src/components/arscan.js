import React from 'react';
import "./arscan.css";

function ARComponent() {
    return (
        <div style={{ margin: 0, overflow: 'hidden' }}>
        <a-scene xr="type: ar">
            {/* Adding a GLTF model */}
            <a-gltf-model src="/ColoredNeutral3d.gltf" 
                position="0 2 -3" 
                scale="0.1 0.1 0.1" 
                material="color: red;"
            >
            </a-gltf-model>

            <a-entity camera position="0 -1.2 0"></a-entity>
        </a-scene>
        </div>
    );
}

export default ARComponent;

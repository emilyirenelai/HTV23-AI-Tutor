import React from 'react';
import "./ardino.css";

function ARComponent() {
    return (
        <div>
        <a-scene xr="type: ar">
            <a-box position="0 2 -5" rotation="0 45 0" color="#4CC3D9"></a-box>
            <a-entity camera position="0 1.6 0"></a-entity>
        </a-scene>
        </div>
    );
}

export default ARComponent;

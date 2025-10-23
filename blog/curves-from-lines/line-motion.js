var image = `
// Compute the distance from point p to the line segment between a and b
    float sdf_line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba,ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.y;
    
    float duration = 3.0;
    float itime = mod(iTime, duration * 8.0);

    float num_steps = 4.0 * pow(2.0, floor(itime / duration));
    float t = mod(itime, duration) / duration;
    
    t = floor(t * (num_steps + 1.0)) / num_steps;
    
    vec2 a = vec2(0.0, 1.0 - t);
    vec2 b = vec2(t, 0.0);
    
    a = a * 0.8 + 0.1;
    b = b * 0.8 + 0.1;
    
    float dp = 1.0 / iResolution.y;
    // Compute the distance from the current fragment to the line
    float d = sdf_line(uv, a, b);
    float f = smoothstep(0.0, d, dp);
    
    vec3 grid = vec3(1.0);
    grid *= smoothstep(0.0, dp, abs(0.1 - uv.x));
    grid *= smoothstep(0.0, dp, abs(0.1 - uv.y));
 
    // Output to screen
    fragColor = vec4(mix(1.0 - grid, vec3(0.0, 1.0, 0.0), vec3(f)), 1.0);
}
    `;
var canvasName = document.currentScript.id;
console.log(canvasName)
var stl = new ShaderToyLite(canvasName);
if (!stls) {
    var stls = new Map();
}
stls.set(canvasName, stl);
stl.setCommon('');
// toy.setBufferA({source: a });
stl.setImage({ source: image });
// toy.play();
stl.draw();
// toy.setOnDraw(function() {
//   console.log(toy.getFrame());
// });
document.getElementById(canvasName).onclick = function (e) {
    var stl = stls.get(e.target.id);
    if (stl.getIsPlaying()) {
        stl.pause();
    } else {
        stl.play();
    }
};

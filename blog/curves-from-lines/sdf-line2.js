var image = `
float sdf_line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba,ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    // define two points, a and b, that rotate over time
    float t = iTime * 0.125 - 1.0;
    vec2 sc = vec2(sin(t), cos(t)) * 0.35;
    vec2 a = 0.5 - sc;
    vec2 b = 0.5 + sc;
    float dist = sdf_line(uv, a, b);
    // Threshold distance of 4 pixels
    float thresh = 4.0 / iResolution.y;
    // Hard threshold on left, soft on right
    if (uv.x < 0.5) {
        dist = step(dist, thresh);
    } else {
        dist = smoothstep(thresh, 0.0, dist);
    }
    // multiply the thresholded value by a nice color
    vec3 col = vec3(0.5, 1.0, 0.0) * dist;
    fragColor = vec4(col, 1.0);
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
// stl.play();
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
var image = `
float sdf_line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba,ba), 0.0, 1.0);
    return length(pa - ba * h);
}

const int NUM_LINES = 100;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    vec3 col = vec3(0.0);
    for (int i=0; i<NUM_LINES; i++) {
        float d = float(i) / float(NUM_LINES - 1);
        vec2 a = vec2(0.0, 1.0 - d) * 0.9 + 0.05;
        vec2 b = vec2(d, 0.0) * 0.9 + 0.05;
        float dist = sdf_line(uv, a, b);
        dist = smoothstep(1.0 / iResolution.y, 0.0, dist);
        // dist = step(dist, 0.5 / iResolution.y) * 1.0;
        if (uv.y - uv.x < 0.0) {
            dist /= float(NUM_LINES / 10);
        }
        col += vec3(0.5, 1.0, 0.0) * dist;
    }
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

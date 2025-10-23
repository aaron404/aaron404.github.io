var image = `
float sdf_line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba,ba), 0.0, 1.0);
    return length(pa - ba * h);
}

#define TWO_PI (3.14159264 * 2.0)
const int NUM_LINES = 4069*4;
const float RADIUS = 0.45;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    vec3 col = vec3(0.0);
    float theta = TWO_PI * 11.0 / 32.0;
    for (int i=0; i<NUM_LINES; i++) {
        float d = TWO_PI * float(i) / float(NUM_LINES);
        vec2 a = 0.5 + RADIUS * vec2(sin(d * 3.0 + 0.123), sin(d * 5.0));
        vec2 b = 0.5 + RADIUS * vec2(sin(d * 4.0), sin(d * 7.0));
        float dist = sdf_line(uv, a, b);
        dist = smoothstep(1.0 / iResolution.y, 0.0, dist);
        dist /= float(NUM_LINES) * 0.005;
        col += vec3(0.2, 0.5, 1.0) * dist;
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
    // var stl = stls.get(e.target.id);
    // if (stl.getIsPlaying()) {
    //     stl.pause();
    // } else {
    //     stl.play();
    // }
    var image = document.getElementById(e.target.id).toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href = image;
};

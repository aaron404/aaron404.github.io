var image = `
float sdf_line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba,ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    vec2 a = vec2(0.2, 0.65);
    vec2 b = vec2(0.8, 0.35);
    float dist = sdf_line(uv, a, b);
    vec3 col = vec3(dist);
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

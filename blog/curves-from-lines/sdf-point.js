var image = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize fragCoord to [0,1] range
    vec2 uv = fragCoord.xy / iResolution.y;
    vec2 p = vec2(0.25, 0.75);
    float dist = distance(p, uv);
    fragColor = vec4(dist, dist, dist, 1.0);
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

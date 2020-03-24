function bubbly(config = {}) {
  const r = Math.random;
  const canvas = config.canvas || document.createElement('canvas');
  canvas.setAttribute(
    'style',
    'position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;',
  );
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  document.body.appendChild(canvas);
  const defaults = {
    animate: true,
    blur: 4,
    bubbleFunc: () => `hsla(0, 0%, 100%, ${r() * 0.1})`,
    bubbles: Math.floor((width + height) * 0.02),
    colorStart: '#25A6E1',
    colorStop: '#176EB5',
    compose: 'lighter',
    shadowColor: '#fff',
  };
  const c = Object.assign({}, defaults, config);
  const context = canvas.getContext('2d');
  context.shadowColor = c.shadowColor;
  context.shadowBlur = c.blur;
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, c.colorStart);
  gradient.addColorStop(0, c.colorStop);
  const nrBubbles = c.bubbles;
  console.log(nrBubbles);
  const bubbles = [...new Array(nrBubbles).keys()].map(() => ({
    f: c.bubbleFunc(),
    x: r() * width,
    y: r() * height,
    r: 4 + (r() * width) / 25,
    a: r() * Math.PI * 2,
    v: 0.1 + r() * 0.5,
  }));
  (function draw() {
    if (c.animate) {
      requestAnimationFrame(draw);
    }
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = c.compose;
    bubbles.forEach(bubble => {
      context.beginPath();
      context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
      context.fillStyle = bubble.f;
      context.fill();

      bubble.x += Math.cos(bubble.a) * bubble.v;
      bubble.y += Math.sin(bubble.a) * bubble.v;
      if (bubble.x - bubble.r > width) {
        bubble.x = -bubble.r;
      }
      if (bubble.x + bubble.r < 0) {
        bubble.x = width + bubble.r;
      }
      if (bubble.y - bubble.r > height) {
        bubble.y = -bubble.r;
      }
      if (bubble.y + bubble.r < 0) {
        bubble.y = height + bubble.r;
      }
    });
  })();
}

bubbly({
  colorStart: '#fff4e6',
  colorStop: '#ffe9e4',
  blur: 1,
  bubbles: 10000,
  compose: 'source-over',
  bubbleFunc: () =>
    `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`,
});

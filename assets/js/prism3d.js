/* ============================================================
   MORA Industries — the prism, in three dimensions.

   A self-contained renderer: no library, no build step, no
   third-party request. Roughly 300 lines of geometry, a painter's
   algorithm and a pointer handler.

   The scene is a triangular prism extruded along z. Two bundles of
   fragmented input strike the face turned furthest to the left,
   travel through the solid, and leave the face turned furthest to
   the right as four separated, prioritized outputs. Because the
   entry and exit faces are chosen from the *rotated* normals, the
   beam keeps reading correctly at every angle.

   The four output labels never move. Only the prism and the beams
   do — so the diagram stays legible while it spins.

   Under prefers-reduced-motion this never initializes and the
   static SVG diagram remains in place.
   ============================================================ */
(function(){
'use strict';

/* ---------- Geometry: apex-up triangle, extruded along z ---------- */
var AX = 0,   AY =  0.80,
    BX = -0.80, BY = -0.56,
    CX = 0.80,  CY = -0.56,
    DZ = 0.60;

var VERTS = [
  [AX, AY,  DZ], [BX, BY,  DZ], [CX, CY,  DZ],   /* front cap  0,1,2 */
  [AX, AY, -DZ], [BX, BY, -DZ], [CX, CY, -DZ]    /* back cap   3,4,5 */
];
/* Wound so every normal points outward. */
var CAPS  = [[0,1,2],[5,4,3]];
var SIDES = [[0,3,4,1],[1,4,5,2],[2,5,3,0]];     /* A-B, B-C, C-A */
var EDGES = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]];

var CAM = 4.15;                 /* camera distance on +z            */
var AUTO = 0.0038;              /* idle rotation, radians per frame  */
var REST_PITCH = 0.28;          /* the angle it settles back to      */
var MAX_PITCH = 0.62;

/* Spectrum, in the order the four outputs are labelled. Gold stays
   reserved for opportunity, per the brand rules. */
var RAYS = ['201,237,244','111,214,231','184,134,43','31,156,184'];

var instance = null;

/* ---------- Small vector helpers ---------- */
function sub(a,b){ return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function cross(a,b){
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
}
function dot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function norm(a){
  var m = Math.hypot(a[0],a[1],a[2]) || 1;
  return [a[0]/m, a[1]/m, a[2]/m];
}
function clamp(v,lo,hi){ return v<lo?lo:(v>hi?hi:v); }

/* ============================================================
   Prism
   ============================================================ */
function Prism(root){
  this.root   = root;
  this.canvas = root.querySelector('.p3d__c');
  this.ctx    = this.canvas.getContext('2d');
  this.hint   = root.querySelector('.p3d__hint');

  this.yaw = -0.55; this.pitch = REST_PITCH;
  this.vy = AUTO;   this.vp = 0;
  this.dragging = false; this.pid = null;
  this.visible = true; this.raf = 0;
  this.anchors = {in:[], out:[]};

  this.onResize  = this.measure.bind(this);
  this.onDown    = this.pointerDown.bind(this);
  this.onMove    = this.pointerMove.bind(this);
  this.onUp      = this.pointerUp.bind(this);
  this.onVis     = this.visibility.bind(this);
  this.frame     = this.tick.bind(this);

  this.canvas.addEventListener('pointerdown', this.onDown);
  addEventListener('pointermove', this.onMove, {passive:true});
  addEventListener('pointerup', this.onUp);
  addEventListener('pointercancel', this.onUp);
  document.addEventListener('visibilitychange', this.onVis);

  if(window.ResizeObserver){
    this.ro = new ResizeObserver(this.onResize);
    this.ro.observe(root);
  } else {
    addEventListener('resize', this.onResize);
  }
  if(window.IntersectionObserver){
    var self = this;
    this.io = new IntersectionObserver(function(en){
      self.visible = en[0].isIntersecting;
      self.visible ? self.start() : self.stop();
    }, {rootMargin:'120px'});
    this.io.observe(root);
  }

  this.measure();
  this.start();
}

/* ---------- Sizing, and reading the anchors off the labels ----------
   The labels are placed in CSS, so the rays are drawn to wherever the
   text actually sits. One source of truth, and it survives any
   responsive change to the label positions. */
Prism.prototype.measure = function(){
  var box = this.root.getBoundingClientRect();
  if(!box.width) return;
  var dpr = Math.min(devicePixelRatio || 1, 2);
  this.W = box.width; this.H = box.height;
  this.canvas.width  = Math.round(this.W * dpr);
  this.canvas.height = Math.round(this.H * dpr);
  this.canvas.style.width  = this.W + 'px';
  this.canvas.style.height = this.H + 'px';
  this.ctx.setTransform(dpr,0,0,dpr,0,0);

  /* Portrait means the stacked layout: inputs above, outputs below,
     so the solid sits higher and a little left of centre. */
  var tall = this.H > this.W;
  this.f  = tall ? Math.min(this.W * 0.85, this.H * 0.80)
                 : Math.min(this.W * 0.76, this.H * 0.94);
  this.ox = this.W * (tall ? 0.50 : 0.48);
  this.oy = this.H * (tall ? 0.36 : 0.50);

  var root = this.root;
  var read = function(sel, side){
    var out = [];
    root.querySelectorAll(sel).forEach(function(el){
      var r = el.getBoundingClientRect();
      out.push([
        side === 'in' ? (r.right - box.left + 11) : (r.left - box.left - 11),
        r.top - box.top + r.height / 2,
        r.left - box.left,
        r.bottom - box.top
      ]);
    });
    return out;
  };
  this.anchors.in  = read('.p3d__lbl--in', 'in');
  this.anchors.out = read('.p3d__lbl--out', 'out');
  if(!this.raf) this.render();
};

/* ---------- Loop ---------- */
Prism.prototype.start = function(){
  if(this.raf || !this.visible || document.hidden) return;
  this.raf = requestAnimationFrame(this.frame);
};
Prism.prototype.stop = function(){
  if(this.raf){ cancelAnimationFrame(this.raf); this.raf = 0; }
};
Prism.prototype.visibility = function(){
  document.hidden ? this.stop() : this.start();
};
Prism.prototype.tick = function(){
  if(!this.dragging){
    this.vy += (AUTO - this.vy) * 0.035;      /* momentum decays into the idle drift */
    this.yaw += this.vy;
    this.vp *= 0.90;
    this.pitch = clamp(this.pitch + this.vp, -MAX_PITCH, MAX_PITCH);
    this.pitch += (REST_PITCH - this.pitch) * 0.016;
  }
  this.render();
  this.raf = requestAnimationFrame(this.frame);
};

/* ---------- Pointer ----------
   touch-action:pan-y on the canvas leaves vertical scrolling to the
   browser, so a horizontal drag rotates and a vertical one scrolls
   the page. Nothing here is essential: it is ornament, and the
   diagram reads the same without it. */
Prism.prototype.pointerDown = function(e){
  if(this.pid !== null) return;
  this.pid = e.pointerId;
  this.dragging = true;
  this.lx = e.clientX; this.ly = e.clientY;
  this.vy = 0; this.vp = 0;
  try{ this.canvas.setPointerCapture(e.pointerId); }catch(err){}
  this.root.classList.add('is-dragging','has-dragged');
  this.start();
};
Prism.prototype.pointerMove = function(e){
  if(!this.dragging || e.pointerId !== this.pid) return;
  var dx = e.clientX - this.lx, dy = e.clientY - this.ly;
  this.lx = e.clientX; this.ly = e.clientY;
  this.vy = dx * 0.0072;
  this.vp = -dy * 0.0055;
  this.yaw += this.vy;
  this.pitch = clamp(this.pitch + this.vp, -MAX_PITCH, MAX_PITCH);
};
Prism.prototype.pointerUp = function(e){
  if(e.pointerId !== this.pid) return;
  this.dragging = false; this.pid = null;
  this.root.classList.remove('is-dragging');
};

/* ---------- Render ---------- */
Prism.prototype.render = function(){
  var ctx = this.ctx, W = this.W, H = this.H;
  if(!W) return;
  ctx.clearRect(0,0,W,H);

  var cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
  var cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);

  /* Model -> world: yaw about y, then pitch about x. */
  var R = VERTS.map(function(p){
    var x =  p[0]*cy + p[2]*sy;
    var z = -p[0]*sy + p[2]*cy;
    return [x, p[1]*cp - z*sp, p[1]*sp + z*cp];
  });
  var self = this;
  var project = function(p){
    var k = self.f / (CAM - p[2]);
    return [self.ox + p[0]*k, self.oy - p[1]*k];
  };
  var P = R.map(project);

  /* Faces, with outward normal and centroid depth. */
  var polys = [];
  CAPS.concat(SIDES).forEach(function(idx, i){
    var c = [0,0,0];
    idx.forEach(function(v){ c[0]+=R[v][0]; c[1]+=R[v][1]; c[2]+=R[v][2]; });
    c = [c[0]/idx.length, c[1]/idx.length, c[2]/idx.length];
    var n = norm(cross(sub(R[idx[1]],R[idx[0]]), sub(R[idx[2]],R[idx[0]])));
    var view = norm([-c[0], -c[1], CAM - c[2]]);
    polys.push({idx:idx, z:c[2], n:n, nv:Math.abs(dot(n,view)), front:dot(n,view) > 0, cap:i < 2});
  });
  polys.sort(function(a,b){ return a.z - b.z; });

  /* Entry and exit: the side faces turned furthest left and right. */
  var entry = null, exit = null;
  SIDES.forEach(function(idx){
    var c = [0,0,0];
    idx.forEach(function(v){ c[0]+=R[v][0]; c[1]+=R[v][1]; c[2]+=R[v][2]; });
    c = [c[0]/4, c[1]/4, c[2]/4];
    var n = norm(cross(sub(R[idx[1]],R[idx[0]]), sub(R[idx[2]],R[idx[0]])));
    if(!entry || n[0] < entry.nx) entry = {nx:n[0], p:project(c)};
    if(!exit  || n[0] > exit.nx)  exit  = {nx:n[0], p:project(c)};
  });
  var eIn = entry.p, eOut = exit.p, mid = project([0,0,0]);

  /* 1 — fragmented input, behind the solid */
  ctx.lineCap = 'round';
  this.anchors.in.forEach(function(a){
    ctx.strokeStyle = 'rgba(201,237,244,.34)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(eIn[0], eIn[1]); ctx.stroke();
    ctx.strokeStyle = 'rgba(201,237,244,.30)';
    [46,32,40].forEach(function(w,i){
      var y = a[3] + 7 + i*5;
      ctx.beginPath(); ctx.moveTo(a[2], y); ctx.lineTo(a[2]+w, y); ctx.stroke();
    });
  });

  /* 2 — back faces */
  var self2 = this;
  polys.forEach(function(f){ if(!f.front) self2.face(P, f); });

  /* 3 — the refracted path through the solid */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(eIn[0], eIn[1]);
  ctx.quadraticCurveTo(mid[0], mid[1], eOut[0], eOut[1]);
  ctx.strokeStyle = 'rgba(111,214,231,.20)';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = 'rgba(201,237,244,.72)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  /* 4 — front faces, so the back reads through the glass */
  polys.forEach(function(f){ if(f.front) self2.face(P, f); });

  /* 5 — edges, brighter as they come toward the camera */
  EDGES.forEach(function(e){
    var z = (R[e[0]][2] + R[e[1]][2]) / 2;
    var t = clamp((z + 1.3) / 2.6, 0, 1);
    ctx.strokeStyle = 'rgba(111,214,231,' + (0.30 + t*0.66).toFixed(3) + ')';
    ctx.lineWidth = 0.95 + t*0.85;
    ctx.beginPath();
    ctx.moveTo(P[e[0]][0], P[e[0]][1]);
    ctx.lineTo(P[e[1]][0], P[e[1]][1]);
    ctx.stroke();
  });

  /* 6 — dispersion */
  var g = ctx.createRadialGradient(eOut[0], eOut[1], 0, eOut[0], eOut[1], 34);
  g.addColorStop(0, 'rgba(111,214,231,.20)');
  g.addColorStop(1, 'rgba(111,214,231,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(eOut[0], eOut[1], 34, 0, Math.PI*2); ctx.fill();

  var outs = this.anchors.out;
  ctx.save();
  outs.forEach(function(a, i){
    var dx = a[0]-eOut[0], dy = a[1]-eOut[1];
    var m = Math.hypot(dx,dy) || 1;
    var px = -dy/m, py = dx/m;                       /* separate the rays at the face */
    var o = (i - (outs.length-1)/2) * 3.4;
    var col = RAYS[i % RAYS.length];
    ctx.strokeStyle = 'rgba(' + col + ',.92)';
    ctx.lineWidth = 1.6;
    ctx.shadowColor = 'rgba(' + col + ',.55)';
    ctx.shadowBlur = 9;
    ctx.beginPath();
    ctx.moveTo(eOut[0] + px*o, eOut[1] + py*o);
    ctx.lineTo(a[0] - 9, a[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.stroke();
  });
  ctx.restore();

  ctx.fillStyle = 'rgba(233,242,246,.9)';
  ctx.beginPath(); ctx.arc(eOut[0], eOut[1], 2, 0, Math.PI*2); ctx.fill();
};

/* One translucent face. Alpha rises as the face turns edge-on, which
   is roughly how glass behaves and reads as solidity without fog. */
Prism.prototype.face = function(P, f){
  var ctx = this.ctx, idx = f.idx;
  ctx.beginPath();
  ctx.moveTo(P[idx[0]][0], P[idx[0]][1]);
  for(var i=1;i<idx.length;i++) ctx.lineTo(P[idx[i]][0], P[idx[i]][1]);
  ctx.closePath();

  var edge = 1 - f.nv;
  var a = (f.cap ? 0.042 : 0.058) + edge*0.165;
  if(!f.front) a *= 0.5;

  var ys = idx.map(function(v){ return P[v][1]; });
  var g = ctx.createLinearGradient(0, Math.min.apply(null,ys), 0, Math.max.apply(null,ys));
  g.addColorStop(0, 'rgba(111,214,231,' + (a*1.5).toFixed(3) + ')');
  g.addColorStop(0.55, 'rgba(31,156,184,' + (a*0.9).toFixed(3) + ')');
  g.addColorStop(1, 'rgba(8,58,86,'   + (a*0.7).toFixed(3) + ')');
  ctx.fillStyle = g;
  ctx.fill();
};

Prism.prototype.destroy = function(){
  this.stop();
  this.canvas.removeEventListener('pointerdown', this.onDown);
  removeEventListener('pointermove', this.onMove);
  removeEventListener('pointerup', this.onUp);
  removeEventListener('pointercancel', this.onUp);
  document.removeEventListener('visibilitychange', this.onVis);
  if(this.ro) this.ro.disconnect(); else removeEventListener('resize', this.onResize);
  if(this.io) this.io.disconnect();
};

/* ============================================================
   Mount. Called after every route render; a no-op on pages
   without a prism, and on the reduced-motion path.
   ============================================================ */
function initPrism3D(){
  if(instance){ instance.destroy(); instance = null; }
  var root = document.querySelector('[data-prism3d]');
  if(!root) return;
  var canvas = root.querySelector('.p3d__c');
  if(!canvas || !canvas.getContext || !canvas.getContext('2d')) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  root.classList.add('is-live');          /* hides the static SVG fallback */
  instance = new Prism(root);
}

window.initPrism3D = initPrism3D;
})();

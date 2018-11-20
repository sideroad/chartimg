// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

import {
  SvgCanvas,
  Rect2D,
  SvgCanvas2DGradient
} from "red-agate-svg-canvas/modules";
import * as ChartJs from "chart.js";

// Get the global scope.
// If running on a node, "g" points to a "global" object.
// When running on the browser, "g" points to the "window" object.
const g = Function("return this")();

// Chart options
// https://www.chartjs.org/docs/latest/getting-started/usage.html

const render = (opts: any, width: string, height: string) => {
  // SvgCanvas has a "CanvasRenderingContext2D"-compatible interface.
  const ctx = new SvgCanvas();

  // SvgCanvas lacks the canvas property.
  (ctx as any).canvas = {
    width: Number(width || 800),
    height: Number(height || 400),
    style: {
      width: `${width || 800}px`,
      height: `${height || 400}px`
    }
  };

  // SvgCanvas does not have font glyph information,
  // so manually set the ratio of (font height / font width).
  ctx.fontHeightRatio = 2;

  // Chart.js needs a "HTMLCanvasElement"-like interface that has "getContext()" method.
  // "getContext()" should returns a "CanvasRenderingContext2D"-compatible interface.
  const el = { getContext: () => ctx };

  // If "devicePixelRatio" is not set, Chart.js get the devicePixelRatio from "window" object.
  // node.js environment has no window object.
  opts.options.devicePixelRatio = 1;

  // Disable animations.
  opts.options.animation = false;
  opts.options.events = [];
  opts.options.responsive = false;

  // Chart.js needs the "CanvasGradient" in the global scope.
  const savedGradient = g.CanvasGradient;
  g.CanvasGradient = SvgCanvas2DGradient;
  try {
    const chart = new ChartJs.Chart(el as any, opts);
  } finally {
    if (savedGradient) {
      g.CanvasGradient = savedGradient;
    }
  }

  // Render as SVG.
  const svgString = ctx.render(
    new Rect2D(0, 0, Number(width || 800), Number(height || 400)),
    "px"
  );
  return svgString;
};

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const DEFAULT_BD_COLORS = [
  "rgba(54, 162, 235, 1)",
  "rgba(255,99,132,1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)"
].join("|");

const getData = (req: any) => ({
  labels: (req.query.yaxis || "").split("|"),
  datasets: (req.query.datasets || []).map(
    (dataset: string, index: number) => ({
      label: (req.query.legends || "").split("|")[index],
      backgroundColor: (req.query.colors || DEFAULT_BD_COLORS).split("|")[
        index
      ],
      borderColor: (req.query.colors || DEFAULT_BD_COLORS).split("|")[index],
      data: (dataset || "").split("|"),
      fill: false
    })
  )
});

app.get("/chart/line.svg", (req: any, res: any) => {
  const opts = {
    type: "line",
    data: getData(req),
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  };
  res.send(render(opts, req.query.width, req.query.height));
});

app.get("/chart/bar.svg", (req: any, res: any) => {
  const opts = {
    type: "bar",
    data: getData(req),
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };
  res.send(render(opts, req.query.width, req.query.height));
});

app.get("/", (req: any, res: any) => {
  res.redirect("https://github.com/sideroad/chartimg");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

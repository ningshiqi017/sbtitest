'use client';

const AD_KEY = '10fdcf1e575bfdac628719834cfd7948';
const INVOKE_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const adSrcDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 160px;
        height: 600px;
        overflow: hidden;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      var atOptions = {
        'key' : '${AD_KEY}',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="${INVOKE_SRC}"></script>
  </body>
</html>`;

export default function AdsterraIframeUnit() {
  return (
    <iframe
      className="adsterra-frame"
      title="Adsterra 160x600"
      width={160}
      height={600}
      srcDoc={adSrcDoc}
      loading="lazy"
      scrolling="no"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}

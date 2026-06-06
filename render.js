/* =========================================================================
 * S3 Tech — Offer renderer
 * Pure function: offer JSON  ->  self-contained HTML string (Gamma-like).
 * Used in two places:
 *   1. n8n "Build HTML" Code node -> piped to Gotenberg for the PDF.
 *   2. editor/index.html live preview (loaded as a <script>).
 * Keep it dependency-free so it runs in both n8n's sandbox and the browser.
 * ========================================================================= */
(function (root) {
  // S3 Technologies official logo (from s3tech.ca), embedded so the PDF is self-contained.
  const LOGO_S3 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTIuMzk1IiBoZWlnaHQ9IjYyLjMxOCIgdmlld0JveD0iMCAwIDE1Mi4zOTUgNjIuMzE4Ij48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGQ9Ik0wIDYyLjMxOGgxNTIuMzk1VjBIMHoiIGZpbGw9Im5vbmUiLz48L2NsaXBQYXRoPjwvZGVmcz48cGF0aCBkPSJNNzEuOTY0IDMzLjdhNy43NiA3Ljc2IDAgMDEtMy4xMzMgNi40MTggOC42NzYgOC42NzYgMCAwMS01LjMzMSAyLjAyM0g4LjQ2NmE3LjczMSA3LjczMSAwIDAxLTYuNTE5LTMuMTI0QTguNiA4LjYgMCAwMTAgMzMuN2g2My41di04LjQ0OUg4LjQ2NmE3LjggNy44IDAgMDEtNi40MzUtMy4xMTRBOC41NzkgOC41NzkgMCAwMTAgMTYuODMzVjguNDE4YTcuNzQzIDcuNzQzIDAgMDEzLjA0OC02LjQ4MkE4LjU0OSA4LjU0OSAwIDAxOC40NjYgMEg2My41YTcuNzI3IDcuNzI3IDAgMDE2LjQzNCAzLjA0IDguNDkzIDguNDkzIDAgMDEyLjAzMiA1LjRoLTYzLjV2OC4zNjFINjMuNWE3LjcyNSA3LjcyNSAwIDAxNi40MzQgMy4wNCA4LjQ5MyA4LjQ5MyAwIDAxMi4wMzIgNS40em04MC40MzEuMDEzYTguMzQ5IDguMzQ5IDAgMDEtMS45NDcgNS4zMSA3Ljg4MiA3Ljg4MiAwIDAxLTYuNTE3IDMuMTE4aC02My41VjMzLjdoNjMuNXYtOC40NDloLTYzLjV2LTguNDQ1aDYzLjVWOC40NDVoLTYzLjVWMGg2My41YTguNDM2IDguNDM2IDAgMDE1LjMzNCAxLjkzOSA3LjgyMyA3LjgyMyAwIDAxMy4xMzMgNi40ODl6TTYuNTk2IDUxLjkzMnYxMC4yMjdoLTEuOFY1MS45MzJILjIyM3YtMS4yNzNoMTAuOTV2MS4yNzN6bTYuNjEgMTAuMjI3di0xMS41aDEwLjEwOHYxLjI3M2gtOC4zdjMuNjg4aDcuNzMzdjEuMjU2aC03LjczNXY0LjAwNmg4LjY5NHYxLjI3N3pNMzIuMDI0IDUxLjc2YTUuNzMxIDUuNzMxIDAgMDAtMi4wMDYuMzI3IDMuODI4IDMuODI4IDAgMDAtMi4zNjMgMi4zODIgNS41NzYgNS41NzYgMCAwMC0uMyAxLjg4NSA1LjMwOSA1LjMwOSAwIDAwLjMyNiAxLjkgNC4wOTEgNC4wOTEgMCAwMDIuNDMgMi40NDQgNS40NzIgNS40NzIgMCAwMDEuOTkuMzQzIDUuMzQ5IDUuMzQ5IDAgMDAxLjQxNy0uMTc5IDQuNDE4IDQuNDE4IDAgMDAxLjE1NC0uNDk0IDQuNDY4IDQuNDY4IDAgMDAuOTIyLS43NTUgNS41MTkgNS41MTkgMCAwMC43MTktLjk2N2wxLjQ3NS42MzZhNS44NjggNS44NjggMCAwMS0uODg5IDEuMiA1LjQxNyA1LjQxNyAwIDAxLTEuMjQzLjk2MyA2LjUxIDYuNTEgMCAwMS0xLjYxNy42NDEgOC4xIDguMSAwIDAxLTIuMDE5LjIzMiA4LjIyNiA4LjIyNiAwIDAxLTIuODMyLS40NDUgNS42NDQgNS42NDQgMCAwMS0yLjAzMy0xLjI0IDUuMDU1IDUuMDU1IDAgMDEtMS4yMzEtMS44ODkgNi44MTIgNi44MTIgMCAwMS0uNDA2LTIuMzkxIDYuNTQ0IDYuNTQ0IDAgMDEuNDMtMi40MzEgNC45NzEgNC45NzEgMCAwMTEuMjU4LTEuODQ4IDUuNjQ1IDUuNjQ1IDAgMDEyLjAzOC0xLjE3NSA4LjU1NSA4LjU1NSAwIDAxMi43NjEtLjQxMiA3Ljg2OCA3Ljg2OCAwIDAxMy41NTUuNzE4IDQuNDg2IDQuNDg2IDAgMDEyLjEgMi4xMjlsLTEuNzExLjQ4OWEzLjM2IDMuMzYgMCAwMC0uNTExLS43NzkgMy4yMjYgMy4yMjYgMCAwMC0uOC0uNjU3IDQuNDQ3IDQuNDQ3IDAgMDAtMS4xMy0uNDU3IDUuODEzIDUuODEzIDAgMDAtMS40OC0uMTcxbTE3LjA5MyAxMC40di01LjMzMmgtNy4yMDZ2NS4zMzJoLTEuODA2di0xMS41aDEuODA2djQuODYzaDcuMjA2di00Ljg2M2gxLjgwNnYxMS41em0xNC4wNjIgMGwtNy4xMy05Ljc5NXEuMDE5LjQuMDQ3Ljc5Mi4wMTkuMzM0LjAzMy43MDZ0LjAxNC42NTd2Ny42NEg1NC41NHYtMTEuNWgyLjFsNy4yIDkuODU2LS4wNTctLjhxLS4wMTktLjM0My0uMDM4LS43NDd0LS4wMTktLjc3MXYtNy41MzhoMS42MjZ2MTEuNXptMTEuMTM2LjE1OWE4LjU2NSA4LjU2NSAwIDAxLTIuODg0LS40NDUgNS43IDUuNyAwIDAxLTIuMDYyLTEuMjQgNS4xNTggNS4xNTggMCAwMS0xLjIzOC0xLjg4OSA2LjcgNi43IDAgMDEtLjQxNi0yLjM5MSA2LjUxNCA2LjUxNCAwIDAxLjQzNS0yLjQzMSA0Ljk1OCA0Ljk1OCAwIDAxMS4yNzYtMS44NDggNS43OTMgNS43OTMgMCAwMTIuMDc2LTEuMTc1IDguOTg0IDguOTg0IDAgMDEyLjgzMi0uNDEyIDguODU4IDguODU4IDAgMDEyLjgyMy40MTcgNS43NTMgNS43NTMgMCAwMTIuMDcxIDEuMTgzIDUuMDEyIDUuMDEyIDAgMDExLjI3MiAxLjg1MiA2LjQ2MiA2LjQ2MiAwIDAxLjQzNSAyLjQxNSA2LjQ1OSA2LjQ1OSAwIDAxLS40NSAyLjQ0OCA1LjIyNiA1LjIyNiAwIDAxLTEuMyAxLjg4NSA1Ljg4IDUuODggMCAwMS0yLjA4IDEuMjA3IDguNTcxIDguNTcxIDAgMDEtMi43OS40MjR6bS4wMTktMTAuNTU4YTYuMTI5IDYuMTI5IDAgMDAtMi4wODkuMzI3IDQuMDIxIDQuMDIxIDAgMDAtMS41LjkzIDMuODM3IDMuODM3IDAgMDAtLjkgMS40NTIgNS42ODkgNS42ODkgMCAwMC0uMyAxLjg4NSA1LjYyOCA1LjYyOCAwIDAwLjMwNyAxLjkgMy45ODMgMy45ODMgMCAwMDIuNCAyLjQ1NiA1LjY4OCA1LjY4OCAwIDAwMi4wNTcuMzQ3IDUuOTYgNS45NiAwIDAwMi4xNTEtLjM1MSAzLjk1MSAzLjk1MSAwIDAwMS40ODUtLjk3NiAzLjkyMiAzLjkyMiAwIDAwLjg2LTEuNDg4IDYuMTU1IDYuMTU1IDAgMDAuMjc5LTEuODg1IDUuNTI2IDUuNTI2IDAgMDAtLjMwNy0xLjg4NSAzLjk0MyAzLjk0MyAwIDAwLS45MDgtMS40NTIgNC4wMzggNC4wMzggMCAwMC0xLjQ4My0uOTMzIDUuOTY2IDUuOTY2IDAgMDAtMi4wNTItLjMyN3ptOC45OCAxMC4zOTl2LTExLjVoMS44MDZ2MTAuMjIzaDYuNzMzdjEuMjc3em0xNi4zMTIuMTU5YTguNTY5IDguNTY5IDAgMDEtMi44ODQtLjQ0NSA1LjY5MSA1LjY5MSAwIDAxLTIuMDYxLTEuMjQgNS4xNTggNS4xNTggMCAwMS0xLjIzOS0xLjg4OSA2LjcgNi43IDAgMDEtLjQxNi0yLjM5MSA2LjUxNCA2LjUxNCAwIDAxLjQzNS0yLjQzMSA0Ljk2MSA0Ljk2MSAwIDAxMS4yNzYtMS44NDggNS43OTMgNS43OTMgMCAwMTIuMDc2LTEuMTc1IDguOTg2IDguOTg2IDAgMDEyLjgzMi0uNDEyIDguODY1IDguODY1IDAgMDEyLjgyMy40MTcgNS43NTIgNS43NTIgMCAwMTIuMDcxIDEuMTgzIDUuMDEyIDUuMDEyIDAgMDExLjI3MiAxLjg1MiA2LjQ2MyA2LjQ2MyAwIDAxLjQzNSAyLjQxNSA2LjQ1OSA2LjQ1OSAwIDAxLS40NDkgMi40NDggNS4yMjkgNS4yMjkgMCAwMS0xLjMgMS44ODUgNS44NzcgNS44NzcgMCAwMS0yLjA4IDEuMjA3IDguNTc2IDguNTc2IDAgMDEtMi43OTEuNDI0em0uMDE5LTEwLjU1OGE2LjEzNSA2LjEzNSAwIDAwLTIuMDkuMzI3IDQuMDIyIDQuMDIyIDAgMDAtMS41LjkzIDMuODM3IDMuODM3IDAgMDAtLjkgMS40NTIgNS42ODkgNS42ODkgMCAwMC0uMyAxLjg4NSA1LjYxOSA1LjYxOSAwIDAwLjMwOCAxLjkgMy45ODIgMy45ODIgMCAwMDIuNCAyLjQ1NiA1LjY4OCA1LjY4OCAwIDAwMi4wNTcuMzQ3IDUuOTY0IDUuOTY0IDAgMDAyLjE1MS0uMzUxIDMuOTUyIDMuOTUyIDAgMDAxLjQ4NS0uOTc2IDMuOTI3IDMuOTI3IDAgMDAuODYtMS40ODggNi4xNTUgNi4xNTUgMCAwMC4yNzktMS44ODUgNS41MjYgNS41MjYgMCAwMC0uMzA3LTEuODg1IDMuOTQzIDMuOTQzIDAgMDAtLjkwOC0xLjQ1MiA0LjAzNyA0LjAzNyAwIDAwLTEuNDktLjkzIDUuOTU3IDUuOTU3IDAgMDAtMi4wNDUtLjMzem04LjExNCA0LjU5M2E2LjY3NiA2LjY3NiAwIDAxLjQyMS0yLjQzMSA0LjgyMiA0LjgyMiAwIDAxMS4yNTctMS44NDggNS43MTEgNS43MTEgMCAwMTIuMDc2LTEuMTc1IDkuMTE4IDkuMTE4IDAgMDEyLjg3NS0uNDEyIDEwLjk3MyAxMC45NzMgMCAwMTIuMTU2LjE4OCA2LjE4MSA2LjE4MSAwIDAxMS42MDguNTM4IDQuMjMzIDQuMjMzIDAgMDExLjE1My44NTMgNS4xMjMgNS4xMjMgMCAwMS44IDEuMTNsLTEuNzIyLjQ0MWEzLjc0NCAzLjc0NCAwIDAwLS41OTEtLjc3MSAzLjE0OCAzLjE0OCAwIDAwLS44MzMtLjU5MiA0LjcgNC43IDAgMDAtMS4xMzktLjM4IDcuMzY5IDcuMzY5IDAgMDAtMS40OC0uMTM1IDYuMTIzIDYuMTIzIDAgMDAtMi4xLjMyNyAzLjg4IDMuODggMCAwMC0xLjQ4MS45MzEgMy44MDcgMy44MDcgMCAwMC0uODc1IDEuNDUyIDUuODMzIDUuODMzIDAgMDAtLjI4OCAxLjg4NSA1LjUzMiA1LjUzMiAwIDAwLjMxMiAxLjkgNC4wNjEgNC4wNjEgMCAwMC45MjcgMS40ODUgNC4yIDQuMiAwIDAwMS41MjQuOTY4IDUuOTM3IDUuOTM3IDAgMDAyLjExNC4zNDcgOC40OTIgOC40OTIgMCAwMDEuNDQ2LS4xMTQgNy42NzUgNy42NzUgMCAwMDEuMi0uMyA1LjkxMSA1LjkxMSAwIDAwLjk0MS0uNDA4IDQuMzY2IDQuMzY2IDAgMDAuNjgxLS40NTN2LTIuMDcxaC0zLjk4MnYtMS4zMDZoNS42NDV2My45NjZhNi44MzcgNi44MzcgMCAwMS0xLjA0NS43NDYgNy45MjggNy45MjggMCAwMS0xLjM0Ny42MjUgOS43OTQgOS43OTQgMCAwMS0xLjYzNi40MjQgMTEuMSAxMS4xIDAgMDEtMS45LjE1NSA4LjgyMSA4LjgyMSAwIDAxLTIuOTQxLS40NDUgNS43ODIgNS43ODIgMCAwMS0yLjA5NS0xLjI0IDUuMDkyIDUuMDkyIDAgMDEtMS4yNi0xLjg4OSA2LjYgNi42IDAgMDEtLjQyMS0yLjM5MSIgZmlsbD0iI2MzMWUxYyIvPjxwYXRoIGQ9Ik0wIDYyLjMxOGgxNTIuMzk1VjBIMHoiIGZpbGw9Im5vbmUiLz48ZyBjbGlwLXBhdGg9InVybCgjYSkiIGZpbGw9IiNjMzFlMWMiPjxwYXRoIGQ9Ik0xMjMuNjQgNjIuMTU5aDEuODA2di0xMS41aC0xLjgwNnptNS4xODIgMHYtMTEuNWgxMC4xMDh2MS4yNzNoLTguM3YzLjY4OGg3LjczM3YxLjI1NmgtNy43MzV2NC4wMDZoOC42OTR2MS4yNzd6bTIzLjM1Ni0zLjE3N2EyLjggMi44IDAgMDEtLjMyNiAxLjMzOCAyLjkwOSAyLjkwOSAwIDAxLTEuMDA3IDEuMDU3IDUuNDY4IDUuNDY4IDAgMDEtMS43MTcuNjkzIDEwLjU4NyAxMC41ODcgMCAwMS0yLjQ1NC4yNDkgOC4yNDYgOC4yNDYgMCAwMS0zLjg3Ny0uNzUgMy40IDMuNCAwIDAxLTEuNzY4LTIuMTcybDEuNzUtLjNhMi41NTMgMi41NTMgMCAwMC40MDcuODE2IDIuMzU1IDIuMzU1IDAgMDAuNzQyLjYzMiA0LjA2NSA0LjA2NSAwIDAwMS4xNTguNDEyIDguMDY1IDguMDY1IDAgMDAxLjY1NS4xNDcgOC41MjQgOC41MjQgMCAwMDEuNDc1LS4xMTYgNC4xMyA0LjEzIDAgMDAxLjE1My0uMzYzIDEuOTkxIDEuOTkxIDAgMDAuNzUyLS42MzcgMS41ODggMS41ODggMCAwMC4yNjktLjkyNiAxLjM2NCAxLjM2NCAwIDAwLS4zLS45MTQgMi4yIDIuMiAwIDAwLS44MzYtLjU3OSA2Ljk3OSA2Ljk3OSAwIDAwLTEuMjg0LS4zODFxLS43NDctLjE1NS0xLjY1NS0uMzM0LS41NTgtLjEwNi0xLjEyMS0uMjMzYTEwLjQgMTAuNCAwIDAxLTEuMDc4LS4zIDYuODg4IDYuODg4IDAgMDEtLjk2OS0uNDEyIDMuMTYgMy4xNiAwIDAxLS43ODUtLjU2NyAyLjQ0OSAyLjQ0OSAwIDAxLS41Mi0uNzY3IDIuNTE0IDIuNTE0IDAgMDEtLjE4OS0xLjAxMSAyLjQ5NCAyLjQ5NCAwIDAxLjM4My0xLjQgMi45NDYgMi45NDYgMCAwMTEuMDY0LS45NTggNS4zIDUuMyAwIDAxMS42MDgtLjU0NyAxMS4wMTkgMTEuMDE5IDAgMDEyLS4xNzEgMTEuNTI1IDExLjUyNSAwIDAxMi4xMjEuMTY3IDUgNSAwIDAxMS40ODUuNSAyLjk2NiAyLjk2NiAwIDAxLjk2OS44MjggNC4xMTUgNC4xMTUgMCAwMS41ODIgMS4xNDZsLTEuNzc4LjI2OWEyLjQxMSAyLjQxMSAwIDAwLS4zODMtLjc0MyAyLjAzOCAyLjAzOCAwIDAwLS42NTctLjU0NiAzLjQ2NyAzLjQ2NyAwIDAwLS45ODgtLjMzNCA3LjE4IDcuMTggMCAwMC0xLjM2Ni0uMTE0IDcuMTE5IDcuMTE5IDAgMDAtMS41NTYuMTQzIDMuMTkzIDMuMTkzIDAgMDAtMS4wMDguMzg5IDEuNDc5IDEuNDc5IDAgMDAtLjU0OC41NzUgMS41NzIgMS41NzIgMCAwMC0uMTY2LjcxNCAxLjIxNSAxLjIxNSAwIDAwLjMuODQ1IDIuMjg4IDIuMjg4IDAgMDAuODA5LjU1IDYuNDYzIDYuNDYzIDAgMDAxLjE4Mi4zNjdxLjY3Mi4xNDcgMS40MjguMjk0LjYxNS4xMjIgMS4yMjUuMjQ5YTExLjk2IDExLjk2IDAgMDExLjE2OC4zIDcuNjkxIDcuNjkxIDAgMDExLjA0NS40MTIgMy4zMyAzLjMzIDAgMDEuODQ2LjU4IDIuNDc3IDIuNDc3IDAgMDEuNTYzLjgwNyAyLjcxNiAyLjcxNiAwIDAxLjIgMS4wOTQiLz48L2c+PC9zdmc+";
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const money = (n, cur) => {
    if (n == null || isNaN(n)) return "";
    try {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: cur || "EUR" }).format(n);
    } catch (_) { return (cur || "EUR") + " " + Number(n).toFixed(2); }
  };

  const list = (arr, cls) =>
    !arr || !arr.length ? "" :
    `<ul class="${cls || ""}">${arr.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

  // S3 Tech brand system (sourced from s3tech.ca): Sofia Pro + Lato,
  // red #c31e1c, navy #141e30. See header for self-hosting Sofia Pro in the PDF.
  const STYLE = `
    :root{
      --ink:#141e30; --navy:#141e30; --muted:#6c757d; --line:#dee2e6;
      --brand:#c31e1c; --brand2:#eb3e15; --bg:#f8f9fc;
    }
    *{box-sizing:border-box}
    body{margin:0;font-family:'Lato','sofia-pro',-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
      color:var(--ink);background:#fff;font-size:15px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    h1,h2,h3,.brand,.cover .for b{font-family:'sofia-pro','Lato',Segoe UI,Arial,sans-serif}
    .page{width:210mm;min-height:297mm;margin:0 auto;padding:0;position:relative}
    @page{size:A4;margin:0}
    .cover{background:linear-gradient(135deg,#141e30 0%,#243149 58%,#3a1419 100%);
      color:#fff;padding:80px 64px 64px;min-height:297mm;display:flex;flex-direction:column;justify-content:space-between;position:relative}
    .cover .rule{width:64px;height:5px;background:var(--brand);margin:26px 0 0;border-radius:3px}
    .brand{font-weight:900;letter-spacing:.22em;font-size:13px;text-transform:uppercase;color:#fff}
    .brand-lockup .logo{height:54px;display:block;filter:brightness(0) invert(1)}
    .footer .flogo{height:18px;vertical-align:middle;margin-right:8px}
    .cover h1{font-size:46px;line-height:1.12;font-weight:800;margin:22px 0 0;max-width:15ch}
    .cover .for{margin-top:auto;font-size:15px;opacity:.92}
    .cover .for b{display:block;font-size:26px;font-weight:800;opacity:1;margin-top:4px}
    .cover .meta{margin-top:28px;font-size:13px;opacity:.82;border-top:1px solid rgba(255,255,255,.22);padding-top:18px}
    .section{padding:46px 64px;border-bottom:1px solid var(--line);page-break-inside:avoid}
    .eyebrow{color:var(--brand);font-weight:800;font-size:12px;letter-spacing:.16em;text-transform:uppercase;margin:0 0 8px}
    h2{font-size:26px;font-weight:800;margin:0 0 18px;color:var(--navy)}
    h3{font-size:17px;font-weight:700;margin:0 0 6px;color:var(--navy)}
    p{margin:0 0 12px;color:var(--ink)}
    .lead{font-size:17px;color:#46535f}
    ul{margin:8px 0 0;padding-left:20px} li{margin:4px 0}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
    .card{background:var(--bg);border:1px solid var(--line);border-top:3px solid var(--brand);border-radius:12px;padding:22px}
    .card .tag{display:inline-block;background:#fdecea;color:var(--brand);font-size:11px;font-weight:800;
      padding:3px 10px;border-radius:999px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em}
    .timeline{position:relative;margin-top:8px}
    .tl{display:flex;gap:16px;padding:14px 0;border-top:1px solid var(--line)}
    .tl .dot{flex:0 0 auto;width:14px;height:14px;border-radius:50%;background:var(--brand);margin-top:6px}
    .tl .dur{color:var(--muted);font-size:13px;font-weight:700}
    table{width:100%;border-collapse:collapse;margin-top:8px;font-size:14px}
    th{text-align:left;color:var(--muted);font-weight:700;font-size:12px;text-transform:uppercase;
      letter-spacing:.06em;padding:10px 12px;border-bottom:2px solid var(--line)}
    td{padding:12px;border-bottom:1px solid var(--line)}
    td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
    tr.total td{font-weight:800;font-size:16px;border-bottom:none;border-top:2px solid var(--navy);color:var(--brand)}
    .pill{display:inline-block;background:#fdecea;color:var(--brand);border-radius:999px;padding:4px 12px;font-weight:800;font-size:12px}
    .team{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .sign{padding:46px 64px}
    .sigrow{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:32px}
    .sigbox{border-top:1.5px solid var(--navy);padding-top:8px;font-size:13px;color:var(--muted)}
    .fineprint{color:var(--muted);font-size:12px}
    .footer{padding:20px 64px;color:var(--muted);font-size:11px;display:flex;justify-content:space-between;border-top:3px solid var(--brand)}
  `;

  function render(data) {
    const o = (data && data.offer) || {};
    const c = (data && data.client) || {};
    const m = (data && data.meeting) || {};
    const cur = (o.pricing && o.pricing.currency) || "EUR";

    const scope = (o.scope || []).map((s) => `
      <div class="card">
        <span class="tag">Workstream</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.description)}</p>
        ${list(s.deliverables)}
      </div>`).join("");

    const timeline = (o.timeline || []).map((t) => `
      <div class="tl">
        <div class="dot"></div>
        <div>
          <h3>${esc(t.phase)} <span class="dur">· ${esc(t.duration)}</span></h3>
          ${list(t.milestones)}
        </div>
      </div>`).join("");

    const rows = (o.pricing && o.pricing.lineItems || []).map((li) => `
      <tr>
        <td>${esc(li.item)}</td>
        <td class="num">${li.quantity != null ? esc(li.quantity) : ""}</td>
        <td class="num">${li.unitPrice != null ? money(li.unitPrice, cur) : ""}</td>
        <td class="num">${money(li.total, cur)}</td>
      </tr>`).join("");

    const p = o.pricing || {};
    const pricingFooter = `
      ${p.subtotal != null ? `<tr><td colspan="3" class="num">Subtotal</td><td class="num">${money(p.subtotal, cur)}</td></tr>` : ""}
      ${p.tax != null ? `<tr><td colspan="3" class="num">VAT${p.taxRate != null ? " (" + Math.round(p.taxRate * 100) + "%)" : ""}</td><td class="num">${money(p.tax, cur)}</td></tr>` : ""}
      <tr class="total"><td colspan="3" class="num">Total</td><td class="num">${money(p.total, cur)}</td></tr>`;

    const team = (o.team || []).map((t) => `
      <div class="card"><span class="tag">${esc(t.role)}</span>
        <h3>${esc(t.name) || "&nbsp;"}</h3><p class="fineprint">${esc(t.bio)}</p></div>`).join("");

    // Fonts: Sofia Pro via S3's Typekit kit (works on s3tech.ca domains) + Lato.
    // For a pixel-perfect PDF anywhere, self-host Sofia Pro woff2 from your Adobe
    // license and replace the typekit <link> with an @font-face in STYLE.
    return `<!doctype html><html lang="en"><head><meta charset="utf-8">
      <link rel="stylesheet" href="https://use.typekit.net/snu0kzf.css">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
      <style>${STYLE}</style></head><body>

      <section class="cover">
        <div><div class="brand-lockup"><img class="logo" src="${LOGO_S3}" alt="S3 Technologies"></div>
          <div class="rule"></div>
          <h1>${esc(o.title) || "Service Proposal"}</h1></div>
        <div class="for">Prepared for
          <b>${esc(c.company)}</b>
          ${esc(c.contactName)}${c.industry ? " · " + esc(c.industry) : ""}
          <div class="meta">${m.date ? "Discovery call: " + esc(m.date) + " &nbsp;·&nbsp; " : ""}${p.model ? "Engagement model: " + esc(p.model) + " &nbsp;·&nbsp; " : ""}${o.validUntil ? "Valid until: " + esc(o.validUntil) : ""}</div>
        </div>
      </section>

      <section class="section">
        <p class="eyebrow">Executive summary</p>
        <h2>Where you are, where we take you</h2>
        ${(o.executiveSummary || "").split(/\n+/).map((para) => `<p class="lead">${esc(para)}</p>`).join("")}
        ${o.objectives && o.objectives.length ? `<h3 style="margin-top:18px">Objectives</h3>${list(o.objectives)}` : ""}
      </section>

      ${scope ? `<section class="section"><p class="eyebrow">Scope of work</p><h2>What we will deliver</h2><div class="grid">${scope}</div></section>` : ""}

      ${timeline ? `<section class="section"><p class="eyebrow">Timeline</p><h2>How we get there</h2><div class="timeline">${timeline}</div></section>` : ""}

      <section class="section">
        <p class="eyebrow">Investment</p>
        <h2>Pricing ${p.model ? `<span class="pill">${esc(p.model)}</span>` : ""}</h2>
        <table><thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Unit</th><th class="num">Amount</th></tr></thead>
          <tbody>${rows}${pricingFooter}</tbody></table>
      </section>

      ${team ? `<section class="section"><p class="eyebrow">Your team</p><h2>Who delivers this</h2><div class="team">${team}</div></section>` : ""}

      ${(o.assumptions && o.assumptions.length) || o.terms ? `<section class="section"><p class="eyebrow">Assumptions &amp; terms</p>
        ${o.assumptions && o.assumptions.length ? `<h3>Assumptions</h3>${list(o.assumptions)}` : ""}
        ${o.terms ? `<h3 style="margin-top:14px">Terms</h3><p class="fineprint">${esc(o.terms)}</p>` : ""}</section>` : ""}

      <section class="sign">
        <p class="eyebrow">Agreement</p>
        <h2>Ready to begin</h2>
        <p class="fineprint">By signing below, both parties accept the scope, timeline, and pricing set out in this proposal.</p>
        <div class="sigrow">
          <div class="sigbox">Signature — ${esc(c.company)}<br>Name: ${esc(c.contactName)}<br>Date:</div>
          <div class="sigbox">Signature — S3 Tech<br>Name:<br>Date:</div>
        </div>
      </section>

      <div class="footer"><span><img class="flogo" src="${LOGO_S3}" alt="">S3 Technologies · Confidential</span><span>${esc(o.title)}</span></div>
    </body></html>`;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { render, LOGO_S3 };
  else root.OfferRenderer = { render, LOGO_S3 };
})(typeof window !== "undefined" ? window : this);

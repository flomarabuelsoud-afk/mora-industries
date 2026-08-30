#!/usr/bin/env python3
"""Build dist/mora-industries-single-file.html.

Inlines every stylesheet, script, font and the favicon into one document
so it opens straight from the filesystem — useful for stakeholder review
and offline reading. There is no other build step: the source folder in
`assets/` is what gets deployed.

    python3 build.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist" / "mora-industries-single-file.html"

SCRIPTS = [
    "assets/js/core.js",
    "assets/js/components.js",
    "assets/js/pages/home.js",
    "assets/js/pages/pillars-products.js",
    "assets/js/pages/solutions-industries.js",
    "assets/js/pages/insights.js",
    "assets/js/pages/company.js",
    "assets/js/pages/contact.js",
    "assets/js/prism3d.js",
    "assets/js/router.js",
]


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def data_uri(rel, mime):
    return "data:%s;base64,%s" % (
        mime,
        base64.b64encode((ROOT / rel).read_bytes()).decode("ascii"),
    )


def main():
    html = read("index.html")

    # Fonts: rewrite each @font-face src to an embedded woff2.
    fonts = read("assets/css/fonts.css")
    fonts = re.sub(
        r"url\('\.\./fonts/([^']+)'\)",
        lambda m: "url('%s')" % data_uri("assets/fonts/" + m.group(1), "font/woff2"),
        fonts,
    )
    styles = read("assets/css/styles.css")

    # Replace the two stylesheet links with one inline style block.
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/fonts.css">\n'
        '<link rel="stylesheet" href="assets/css/styles.css">',
        "<style>\n%s\n%s\n</style>" % (fonts, styles),
    )

    # Preload hints point at files that no longer exist in this build.
    html = re.sub(r'\n<link rel="preload"[^>]*>', "", html)

    # Favicon as a data URI so the tab icon survives the copy.
    html = html.replace(
        '<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">',
        '<link rel="icon" href="%s" type="image/svg+xml">'
        % data_uri("assets/img/favicon.svg", "image/svg+xml"),
    )

    # Scripts, in the load order index.html declares.
    bundle = "\n\n".join(
        "/* ---------- %s ---------- */\n%s" % (s, read(s)) for s in SCRIPTS
    )
    first = '<script src="%s"></script>' % SCRIPTS[0]
    start = html.index(first)
    end = html.index("</script>", html.index('<script src="%s"' % SCRIPTS[-1])) + len(
        "</script>"
    )
    html = html[:start] + "<script>\n%s\n</script>" % bundle + html[end:]

    html = html.replace(
        "<!-- Load order matters: helpers and shared builders precede the pages,\n"
        "     and the router runs last. There is no build step. -->",
        "<!-- Single-file build produced by build.py. Edit the sources in\n"
        "     assets/, not this file. -->",
    )

    DIST.parent.mkdir(exist_ok=True)
    DIST.write_text(html, encoding="utf-8")
    print("wrote %s (%.0f KB)" % (DIST, DIST.stat().st_size / 1024))


if __name__ == "__main__":
    main()

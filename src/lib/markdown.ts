// Minimal, dependency-free Markdown -> HTML for blog post bodies. Bodies are
// author-only content (written through the authenticated dashboard, never
// user-submitted), but this still escapes all raw text before applying any
// markdown transform and only emits the specific tags below — so the result
// is safe to render with dangerouslySetInnerHTML regardless.
//
// Supports: # headings, --- rules, > blockquotes, - / * unordered lists,
// paragraphs, and inline **bold**, *italic*, `code`, [text](http(s) url).
// That covers what a personal blog post actually uses; anything fancier
// (tables, nested lists, images-in-body) is out of scope on purpose.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return out;
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraphBuf: string[] = [];
  let i = 0;

  const flushParagraph = () => {
    if (paragraphBuf.length) html.push(`<p>${renderInline(paragraphBuf.join(" "))}</p>`);
    paragraphBuf = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    if (/^\s*---\s*$/.test(line)) {
      flushParagraph();
      html.push("<hr />");
      i++;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      html.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      i++;
      continue;
    }

    paragraphBuf.push(line.trim());
    i++;
  }

  flushParagraph();
  return html.join("\n");
}

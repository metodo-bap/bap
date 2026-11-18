"""Protect meaningful text from being replaced by decorative icons."""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class ReadableText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hidden_depth = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            return
        if self.hidden_depth:
            self.hidden_depth += 1
        elif tag in ("script", "style") or dict(attrs).get("aria-hidden") == "true":
            self.hidden_depth = 1

    def handle_endtag(self, tag):
        if self.hidden_depth:
            self.hidden_depth -= 1

    def handle_data(self, data):
        if not self.hidden_depth:
            self.parts.append(data)


def readable_text(filename):
    parser = ReadableText()
    parser.feed((ROOT / filename).read_text())
    return " ".join(" ".join(parser.parts).split())


class ContentAccessibilityTests(unittest.TestCase):
    def test_drum_dimensions_remain_readable_text(self):
        self.assertIn("Caixa 14 × 5,5", readable_text("sobre-o-autor.html"))

    def test_reader_instructions_name_the_navigation_keys(self):
        self.assertIn("Use as setas esquerda e direita para navegar", readable_text("livro.html"))


if __name__ == "__main__":
    unittest.main()

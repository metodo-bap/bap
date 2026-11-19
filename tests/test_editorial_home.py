from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class Nodes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nodes = []
    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))

class EditorialHomeTests(unittest.TestCase):
    def setUp(self):
        self.parser = Nodes()
        self.parser.feed((ROOT / 'index.html').read_text())
    def test_native_pillars_work_without_javascript(self):
        details = [a for tag, a in self.parser.nodes if tag == 'details' and a.get('class') == 'be-pillar']
        self.assertEqual(len(details), 4)
    def test_gallery_has_keyboard_region_and_real_images(self):
        galleries = [a for _, a in self.parser.nodes if a.get('aria-label') == 'Prévia do Livro Método BAP']
        self.assertEqual(len(galleries), 1)
        self.assertEqual(galleries[0].get('tabindex'), '0')
        slides = [a for tag, a in self.parser.nodes if tag == 'figure' and a.get('class') == 'be-slide']
        self.assertEqual(len(slides), 4)
        for tag, a in self.parser.nodes:
            if tag == 'img' and a.get('src', '').startswith('assets/'):
                self.assertTrue((ROOT / a['src']).exists(), a['src'])
    def test_ctas_preserved(self):
        links = [a.get('href') for tag, a in self.parser.nodes if tag == 'a']
        for path in ['metodo.html', 'livro.html', 'livro.html#amostras']:
            self.assertIn(path, links)

if __name__ == '__main__':
    unittest.main()

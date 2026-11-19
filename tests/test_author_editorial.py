"""Protect the author's content and progressively enhanced interactions."""
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

class AuthorEditorialTests(unittest.TestCase):
    def setUp(self):
        self.html = (ROOT / 'sobre-o-autor.html').read_text()
        self.parser = Nodes()
        self.parser.feed(self.html)
    def test_all_archive_photos_and_original_fallback_links_remain(self):
        photos = [a for tag,a in self.parser.nodes if tag == 'a' and a.get('class') == 'author-archive-photo']
        self.assertEqual(len(photos), 17)
        self.assertEqual(len({p['href'] for p in photos}), 17)
        self.assertTrue(all(p['href'].startswith('https://static.wixstatic.com/') for p in photos))
    def test_formation_is_native_disclosure_and_viewer_is_dialog(self):
        self.assertEqual(len([a for tag,a in self.parser.nodes if tag == 'details' and a.get('class') == 'ae-credential']),4)
        self.assertEqual(len([a for tag,a in self.parser.nodes if tag == 'dialog' and a.get('id') == 'ae-photo-dialog']),1)
    def test_chapter_navigation_has_existing_targets(self):
        navs = [a for tag,a in self.parser.nodes if tag == 'nav' and a.get('aria-label') == 'Capítulos da trajetória de Tiago']
        self.assertEqual(len(navs),1)
        ids = {a['id'] for _,a in self.parser.nodes if 'id' in a}
        for tag,a in self.parser.nodes:
            if tag == 'a' and a.get('href','').startswith('#'):
                self.assertIn(a['href'][1:], ids)
    def test_readable_biography_setup_and_media_remain(self):
        for text in ['Holmes Place Sporting Clube','MBA em Gestão de Empresas','Café de Jesus','Caixa 14 × 5,5','Terra Prima','Batera &amp; Percussão','f9IXMtRj9kE','pE66UtC6XB0']:
            self.assertIn(text,self.html)

if __name__ == '__main__':
    unittest.main()

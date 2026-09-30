import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Blog from './Blog';
import BlogPost from './BlogPost';
import { posts } from '../data/posts';
import type { Language } from '../i18n/LanguageContext';
import { renderWithProviders } from '../test-utils';

const renderBlog = (lang: Language = 'tr') =>
  renderWithProviders(
    <Routes>
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>,
    { lang, route: '/blog' }
  );

describe('Blog Page', () => {
  it('sayfa başlığını ve alt başlığını göstermelidir', () => {
    renderBlog();

    const heading = screen.getByRole('heading', { level: 1, name: /blog/i });
    const subtitle = screen.getByText(/mutfağımızdan haberler, tarifler ve hikâyeler/i);

    expect(heading).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('her yazı için bir kart listelemelidir', () => {
    renderBlog();

    const articles = screen.getAllByRole('article');

    expect(articles).toHaveLength(posts.length);
  });

  it('yazıları yeniden eskiye doğru sıralamalıdır', () => {
    const expectedTitles = [...posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post) => post.content.tr.title);
    renderBlog();

    const titles = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(titles).toEqual(expectedTitles);
  });

  it('her yazının başlığını yazı sayfasına giden bir link olarak göstermelidir', () => {
    renderBlog();

    posts.forEach((post) => {
      const titleLink = screen.getByRole('link', { name: post.content.tr.title });

      expect(titleLink).toHaveAttribute('href', `/blog/${post.slug}`);
    });
  });

  it('yazının özetini göstermelidir', () => {
    renderBlog();

    const excerpt = screen.getByText(/şefimiz, en çok sorulan yemeğimizin püf noktalarını anlatıyor/i);

    expect(excerpt).toBeInTheDocument();
  });

  it('yazının tarihini ve okuma süresini göstermelidir', () => {
    renderBlog();

    const date = screen.getByText('20 Şubat 2026');
    const readingTime = screen.getByText(/4 dk okuma/i);

    expect(date).toHaveAttribute('datetime', '2026-02-20');
    expect(readingTime).toBeInTheDocument();
  });

  it('her kartta yazıya giden bir "Devamını oku" linki olmalıdır', () => {
    renderBlog();

    const readMoreLinks = screen.getAllByRole('link', { name: /devamını oku/i });

    expect(readMoreLinks).toHaveLength(posts.length);
    readMoreLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/blog/${posts[index].slug}`);
    });
  });

  it('kapak görselini erişilebilirlik ağacından gizlemelidir', () => {
    renderBlog();

    const firstArticle = screen.getAllByRole('article')[0];
    const links = within(firstArticle).getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(within(firstArticle).queryByRole('img')).not.toBeInTheDocument();
  });

  it('yazı başlığına tıklandığında yazı sayfasını açmalıdır', async () => {
    const user = userEvent.setup();
    renderBlog();

    await user.click(screen.getByRole('link', { name: /mükemmel adana kebabın sırrı/i }));

    expect(screen.getByRole('heading', { level: 1, name: /mükemmel adana kebabın sırrı/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tüm yazılar/i })).toBeInTheDocument();
  });

  it('"Devamını oku" linkine tıklandığında ilgili yazı sayfasını açmalıdır', async () => {
    const user = userEvent.setup();
    renderBlog();
    const firstArticle = screen.getAllByRole('article')[0];

    await user.click(within(firstArticle).getByRole('link', { name: /devamını oku/i }));

    expect(screen.getByRole('heading', { level: 1, name: /teras sezonu açıldı/i })).toBeInTheDocument();
  });

  describe('English', () => {
    it('sayfa metinlerini İngilizce göstermelidir', () => {
      renderBlog('en');

      const subtitle = screen.getByText(/news, recipes and stories from our kitchen/i);
      const titleLink = screen.getByRole('link', { name: /the secret of the perfect adana kebab/i });
      const readMoreLinks = screen.getAllByRole('link', { name: /read more/i });

      expect(subtitle).toBeInTheDocument();
      expect(titleLink).toHaveAttribute('href', '/blog/adana-kebabin-sirri');
      expect(readMoreLinks).toHaveLength(posts.length);
    });

    it('tarihi ve okuma süresini İngilizce biçimde göstermelidir', () => {
      renderBlog('en');

      const date = screen.getByText('February 20, 2026');
      const readingTime = screen.getByText(/4 min read/i);

      expect(date).toHaveAttribute('datetime', '2026-02-20');
      expect(readingTime).toBeInTheDocument();
    });

    it('Türkçe metinleri göstermemelidir', () => {
      renderBlog('en');

      const turkishTitle = screen.queryByRole('link', { name: /mükemmel adana kebabın sırrı/i });

      expect(turkishTitle).not.toBeInTheDocument();
    });
  });
});

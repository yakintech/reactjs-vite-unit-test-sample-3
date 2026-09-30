import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { bgPhoto, img } from '../images'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate } from '../i18n/formatDate'

export default function Blog() {
  const { lang, t } = useLanguage()

  return (
    <>
      <section className="page-hero" style={bgPhoto('1551218808-94e220e084d2')}>
        <div className="container">
          <h1>{t.blog.title}</h1>
          <p>{t.blog.subtitle}</p>
        </div>
      </section>

      <section className="section container">
        <div className="posts">
          {posts.map((post) => {
            const content = post.content[lang]
            return (
              <article className="card post-card" key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="card-img" tabIndex={-1} aria-hidden="true">
                  <img src={img(post.photo, 800)} alt="" loading="lazy" />
                </Link>
                <div className="card-body">
                  <p className="post-meta">
                    <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {t.blog.readingTime(post.readingMinutes)}
                  </p>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{content.title}</Link>
                  </h2>
                  <p>{content.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="link">
                    {t.blog.readMore}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

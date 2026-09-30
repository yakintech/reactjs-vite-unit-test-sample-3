import { Link, useParams } from 'react-router-dom'
import { findPost } from '../data/posts'
import { bgPhoto } from '../images'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate } from '../i18n/formatDate'

export default function BlogPost() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const post = findPost(slug)

  if (!post) {
    return (
      <section className="page-hero not-found" style={bgPhoto('1551218808-94e220e084d2')}>
        <div className="container">
          <h1>{t.blog.notFoundTitle}</h1>
          <p>{t.blog.notFoundText}</p>
          <Link to="/blog" className="btn">
            {t.blog.back}
          </Link>
        </div>
      </section>
    )
  }

  const content = post.content[lang]

  return (
    <>
      <section className="page-hero" style={bgPhoto(post.photo)}>
        <div className="container">
          <p className="post-meta light">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {t.blog.readingTime(post.readingMinutes)}
          </p>
          <h1>{content.title}</h1>
        </div>
      </section>

      <article className="section container post">
        <p className="post-lead">{content.excerpt}</p>
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link to="/blog" className="link">
          {t.blog.back}
        </Link>
      </article>
    </>
  )
}

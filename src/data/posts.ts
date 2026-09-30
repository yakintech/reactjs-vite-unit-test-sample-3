import type { Language } from '../i18n/LanguageContext'

type PostContent = {
  title: string
  excerpt: string
  body: string[]
}

export type Post = {
  slug: string
  date: string
  readingMinutes: number
  photo: string
  content: Record<Language, PostContent>
}

// Yeniden eskiye sıralı
export const posts: Post[] = [
  {
    slug: 'teras-sezonu-acildi',
    date: '2026-06-01',
    readingMinutes: 2,
    photo: '1559339352-11d035aa65de',
    content: {
      tr: {
        title: 'Teras sezonu açıldı',
        excerpt: 'Deniz manzaralı terasımız yaz boyunca akşam yemeklerinize eşlik etmeye hazır.',
        body: [
          'Havaların ısınmasıyla birlikte deniz manzaralı terasımızı yeniden misafirlerimize açtık. Gün batımını izlerken yemeğinizi yiyebileceğiniz 40 kişilik alanımız, yaz akşamlarının en sevilen köşesi.',
          'Teras için hafta sonları yoğunluk olabildiğinden önceden rezervasyon yapmanızı öneriyoruz. Rezervasyon sırasında teras tercihinizi belirtmeniz yeterli.',
          'Yaz menümüzde hafif mezeler, ızgara balıklar ve ev yapımı limonatamız sizi bekliyor.',
        ],
      },
      en: {
        title: 'Terrace season is open',
        excerpt: 'Our sea-view terrace is ready to host your dinners all summer long.',
        body: [
          'As the weather warms up, we have reopened our sea-view terrace to our guests. With room for 40 people, it is the favorite spot for summer evenings, where you can dine while watching the sunset.',
          'Since the terrace can get busy on weekends, we recommend booking in advance. Just mention that you would like a terrace table when you make your reservation.',
          'Our summer menu features light mezes, grilled fish and our homemade lemonade.',
        ],
      },
    },
  },
  {
    slug: 'yerel-ureticilerle-calisiyoruz',
    date: '2026-04-15',
    readingMinutes: 3,
    photo: '1551218808-94e220e084d2',
    content: {
      tr: {
        title: 'Neden yerel üreticilerle çalışıyoruz?',
        excerpt: 'Taze malzeme, lezzetin yarısıdır. Mutfağımıza giren ürünlerin hikâyesi.',
        body: [
          'Mutfağımıza giren sebze, meyve ve etlerin büyük bölümünü şehrin çevresindeki küçük üreticilerden alıyoruz. Her sabah gelen ürünler, o günün menüsünü belirliyor.',
          'Bu sayede malzemeler tarladan tabağa çok kısa sürede ulaşıyor. Hem daha lezzetli hem de daha az yol kat ettiği için çevreye daha az yük getiriyor.',
          'Üreticilerimizle yıllara dayanan bir güven ilişkimiz var. Mevsiminde olmayan ürünü menüye koymuyor, her mevsimi kendi lezzetleriyle karşılıyoruz.',
        ],
      },
      en: {
        title: 'Why we work with local producers',
        excerpt: 'Fresh ingredients are half the flavor. The story behind what comes into our kitchen.',
        body: [
          'Most of the vegetables, fruit and meat that come into our kitchen are sourced from small producers around the city. What arrives each morning shapes that day’s menu.',
          'This way, ingredients travel from farm to plate in a very short time. They taste better and, because they travel less, they are kinder to the environment.',
          'We have built years of trust with our producers. We never put out-of-season produce on the menu; we welcome each season with its own flavors.',
        ],
      },
    },
  },
  {
    slug: 'adana-kebabin-sirri',
    date: '2026-02-20',
    readingMinutes: 4,
    photo: '1599487488170-d11ec9c172f0',
    content: {
      tr: {
        title: 'Mükemmel Adana kebabın sırrı',
        excerpt: 'Şefimiz, en çok sorulan yemeğimizin püf noktalarını anlatıyor.',
        body: [
          'İyi bir Adana kebabın ilk şartı doğru et. Kuzu etini kuyruk yağıyla, zırh denilen geniş bıçakla elde kıyıyoruz. Makinede çekilen et hem dokusunu hem de suyunu kaybediyor.',
          'İkinci sır, sabır. Kıyma pul biber ve tuzla yoğrulduktan sonra en az bir gece dinlendiriliyor. Böylece şişe daha iyi tutunuyor ve lezzet oturuyor.',
          'Son olarak ateş: Meşe kömürünün közü tam kıvamına geldiğinde pişirmeye başlıyoruz. Kebap, dışı hafif kıtır, içi sulu olacak şekilde birkaç dakikada pişiyor.',
        ],
      },
      en: {
        title: 'The secret of the perfect Adana kebab',
        excerpt: 'Our chef shares the tips behind our most asked-about dish.',
        body: [
          'The first rule of a good Adana kebab is the right meat. We hand-mince lamb with tail fat using a wide blade called a zırh. Machine-ground meat loses both its texture and its juices.',
          'The second secret is patience. After the mince is kneaded with chili flakes and salt, it rests for at least one night. This helps it hold on the skewer and lets the flavors settle.',
          'Finally, the fire: we start cooking only when the oak charcoal embers are just right. The kebab cooks in a few minutes, slightly crisp outside and juicy inside.',
        ],
      },
    },
  },
]

export const findPost = (slug: string | undefined) => posts.find((p) => p.slug === slug)

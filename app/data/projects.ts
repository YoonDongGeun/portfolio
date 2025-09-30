export const projectsData = [
  {
    id: 'personal-blog',
    title: '개인 블로그',
    category: '개인 프로젝트',
    thumbnail: 'projects/personal/yooncarrot/thumbnail.png',
    description: 'SSR에 최적화된 커스텀 에디터를 탑재한 개인 블로그',
    longDescription: `Next.js 15와 Spring Boot 3을 활용한 풀스택 개인 블로그 프로젝트입니다.

프론트엔드는 Next.js 15, React 19, Tailwind v4를 사용하여 구축했으며, Tiptap 기반의 커스텀 에디터를 개발하여 다양한 플러그인을 지원합니다.

백엔드는 Spring Boot 3, Spring Security 6, JPA를 사용하여 RESTful API를 구현했고, Redis와 MySQL을 활용한 캐싱과 데이터 관리를 구현했습니다.

사용자 경험을 위해 Critical CSS 적용, Layout Shift 최적화, 스크립트를 통한 FOUC 최소화, Webpack 코드 스플릿, ISR 기반 캐싱 등 다양한 성능 최적화 기법을 적용했습니다.`,
    period: '2025.01 - 현재 진행 중',
    team: '개인 프로젝트',
    role: '풀스택',
    technologies: [
      'Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'Tiptap', 'Motion',
      'Spring Boot 3', 'Spring Security 6', 'JPA', 'Redis', 'MySQL',
      'Docker', 'Nginx', 'AWS S3', 'EC2', 'Vercel'
    ],
    achievements: [
      '직접 구현한 커스텀 Tiptap 기반 텍스트 에디터로 다양한 플러그인 지원 (코드 블록, 이미지, YouTube, CodePen 등)',
      'Critical CSS 적용으로 첫 렌더링 시 사용자 경험 개선 및 FCP 최적화',
      '랜딩시 출력 이미지 prerendering 적용으로 홈 화면 LCP 최적화',
      '컴포넌트 CSS로 CLS 유발 요소 최소화',
      'ISR 기반 캐싱과 페이지네이션으로 빠른 게시글 로딩',
      'SEO 최적화를 위한 메타 데이터, robot.txt, Sitemap 추가',
      'ZAP 웹 취약성 검사 및 HTTP Header 보안성 테스트를 통한 보안 강화'
    ],
    challenges: [
      '에디터의 Viewer 출력 방식을 JSON 파싱에서 HTML 파싱 방식으로 변경하여 ISR 성능 개선',
      "번들 분석을 통한 코드 스플링팅과 레이지 임포트 방식으로 네트워크 요청 수와 사이즈 최적화",
      'Tiptap(ProseMirror) 라이브러리의 방대한 문서 때문에 러닝커브가 높았지만, 점진적 학습으로 극복 및 커스텀 Extension 구현',
    ],
    links: {
      demo: 'https://yooncarrot.com',
      github: 'https://github.com/YoonDongGeun'
    },
    architecture: [
      '/projects/personal/yooncarrot/architecture.png',
      '/projects/personal/yooncarrot/mfa.png'
    ],
    features: [
      {
        title: '커스텀 에디터와 Viewer 출력 최적화',
        description: `보통 에디터 데이터는 JSON으로 저장 후 파싱하여 출력합니다. 하지만 코드 출력 시에는 별도의 코드 하이라이터가 필요해 번들이 무거워지는 문제가 있습니다.

이를 해결하기 위해 코드 하이라이팅 정보까지 포함된 HTML을 생성하고, 이를 Viewer와 Editor 데이터로 함께 활용할 수 있는 Custom Extension을 개발했습니다.

그 결과 JSON 대신 HTML 데이터만 저장하면 되며, 데이터 크기는 기존 대비 2배 이상 축소되었습니다. 실제로 14만자 분량의 게시글을 기준으로 ISR 시간 약 30ms 단축, 게시글 50개를 SSG할 경우 빌드 시간 약 11% 단축 효과를 얻을 수 있었습니다.`,
        images: [
          '/projects/personal/yooncarrot/editor.png',
          '/projects/personal/yooncarrot/json-build.png',
          '/projects/personal/yooncarrot/html-build-time.png',
          '/projects/personal/yooncarrot/json-build-time.png',
           
        ],
        codeSnippets: [{
          title: '에디터 데이터로 그대로 사용될 수 있는 html 문서',
          language: 'typescript',
          description: '보통 syntax highliting은 따로 처리하지만, 해당 정보까지 저장될 수 있는 html 문서',
          code: `// 1. json 데이터 사용 시(최적화 전, JSON => HTML 변환 필요)
export default async function Page({params}: PageProps) {
  const articleId = (await params).articleId;
  const article = await getArticle(articleId);
  if (!article) notFound();
  const numericArticleId = parseInt(articleId);
  const parsedArticleJson = JSON.parse(article.json);
  const contentJson = parsedArticleJson.content;
  const content = await getHtmlWithJson(contentJson); // JSON => Html String 변환, code 출력 시 highligter 라이브러리 필요.
  return (
    <>
      <Article article={article}>
        <ServerTextViewer content={content} />
      </Article>
      <CommentList articleId={numericArticleId} />
      {/* LightBox 이미지 Viewer */}
      <LightBox />
    </>
  );

// 2. html 그대로 사용 시(최적화 후, HTML 그대로 사용하지만, Editor에 삽입 시 수정 데이터 그대로 출력)
export default async function Page({params}: PageProps) {
  const articleId = (await params).articleId;
  const article = await getArticle(articleId);
  if (!article) notFound();
  const numericArticleId = parseInt(articleId);
  return (
    <>
      <Article article={article}>
        <ServerTextViewer content={article.content} /> // article.content가 html string을 바로 받음.
      </Article>
      <CommentList articleId={numericArticleId} />
      {/* LightBox 이미지 Viewer */}
      <LightBox />
    </>
);}`
}]},
  {
    title: '크로스 탭 디자인 시스템',
    description: `브라우저 탭간 상태 공유가 되는 Custom Theme 적용이 가능한 디자인 시스템입니다.\n커스텀 테마 설정에 따라 블로그 색상이 변하고 저장/되돌리기/삭제를 하면 모든 브라우저 탭에 적용됩니다.
테마 설정의 탭간 공유를 위해서 localStorage와 리액트 상태가 공유되고, 이 상태 변경은 BroadCastChannel을 통해 탭으로 전파됩니다.`,
    images: [
      '/projects/personal/yooncarrot/image9.png',
      '/projects/personal/yooncarrot/image10.png',
    ],
    codeSnippets: [{
      title: '크로스 탭 디자인 시스템',
      language: 'typescript',
      description: '크로스 탭 상태 공유의 핵심 - BroadcastChannel과 LocalStorage 연동을 위한 useSyncLocalStrage 훅 제작',
      code: `type MessageData<T> = {
  value: T;
};
/**
 * 로컬 스토리지와 브로드캐스트 채널을 사용하여 탭 간 상태 동기화를 제공하는 훅
 *
 * @param key - 로컬 스토리지 키
 * @param onChange - 값이 변경될 때 실행될 콜백 함수
 *
 * @example
 * const {value, setValue} = useSyncLocalStorage("theme", (newTheme) => {
 *   console.log("테마가 변경됨:", newTheme);
 * });
 * setValue("dark"); // 값 설정
 */
export const useSyncLocalStorage = <K extends string, V extends string>(
  key: K,
  onChange?: (value: V) => void,
) => {
  // 브로드캐스트 채널 참조 (탭 간 통신용)
  const channelRef = useRef<BroadcastChannel>(null);
  // 외부 스토어 구독자에게 변경 알림을 보내는 함수 참조
  const notifySubscriber = useRef<() => void>(null);

  // 1. useSyncExternalStore의 구독 함수. SRP 예외, 책임 분리하면 더 이해하기 어렵고 더 디벨롭할 가능성이 적음.
  const storeSubscriber = useCallback((notifyOnChange: () => void) => {
    notifySubscriber.current = notifyOnChange;
    if (!channelRef.current) {
      const newChannel = new BroadcastChannel(key);
      newChannel.onmessage = event => {
        const {value}: MessageData<V> = event.data;
        localStorage.setItem(key, value);
        onChange?.(value);
        notifyOnChange();
      };
      channelRef.current = newChannel;
    }
    const channel = channelRef.current;
    return () => {
      notifySubscriber.current = null;
      channel!.close();
    };
  }, []);

  // 2. 클라이언트 상태 읽는 함수
  const clientState = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  // 3. 서버 초기 상태 읽는 함수 (SSR 초기값 사용)
  const serverInitialState = useCallback(() => undefined, []);

  // 1,2,3을 사용하여 외부 스토어와 동기화
  const value = useSyncExternalStore(
    storeSubscriber,
    clientState,
    serverInitialState,
  );

  // 값을 설정하는 함수. SRP 예외, 원자적으로 함께 일어나는 로직으로 분리하면 더 이해하기 어렵고 더 디벨롭할 가능성이 적음.
  const setValue = useCallback(
    (value: V) => {
      const channel = channelRef.current;
      if (!channel) return;
      localStorage.setItem(key, value);
      channel.postMessage({value} as MessageData<V>);
      onChange?.(value); // 상태 변화시 콜백 실행
      notifySubscriber.current?.(); //변화 감지로 리렌더링 유발
    },
    [key],
  );
  return {value, setValue} as {value: V | null; setValue: (value: V) => void};
};`
        }]
      },
      {
        title: 'SEO 최적화',
        description: 'Next.js ISR을 활용한 페이지 캐싱과 메타 데이터, robot.txt, Sitemap을 사용하여 SEO를 했습니다.',
        images: [
          '/projects/personal/yooncarrot/image14.png',
          '/projects/personal/yooncarrot/image13.png',
        ],
        codeSnippets: [{
          title: 'ISR 기반 캐싱',
          language: 'typescript',
          description: 'Next.js의 ISR과 MetaData를 활용한 SEO',
          code: `// SEO 메타데이터 설정
export async function generateMetadata(
  {params}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {

  const articleId = (await params).articleId;
  const article = await getArticle(articleId);
  if (!article) notFound();

  const categories = article.category.path.split(" > ");

  // 키워드: 라벨 + 카테고리
  const keywords = [...article.labels, categories];

  // 설명 250자 자르고 "..." 붙이기
  const trimmedDesc = article.preview.slice(0, 250) + "...";

  return {
    title: article.title,
    description: trimmedDesc,
    keywords: keywords,
    openGraph: {
      title: article.title,
      description: trimmedDesc,
      images: article.thumbnail,
      type: "article",
      authors: article.author.name,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      tags: categories,
      url: \`\${HOST_SERVER_URL}/article/\${articleId}\`,
    },
    category: article.category.id,
  };
}

// 빌드시 SSG 대상 articleId 목록
export async function generateStaticParams() {
  const articleIds = await getArticleIds();
  return articleIds.map(id => ({articleId: String(id)}));
}`},
{
          title: 'Site Map 생성',
          language: 'typescript',
          description: 'Bot이 모든 페이지 탐색할 수 있도록 Site Map 동적 생성',
          code: `export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Category Sitemap
  const categories  = await getCategories({ revalidate: 3600 });
  const categoryEntries = parseCategory(categories);

  // Article Sitemap
  const articleIds = await getArticleIds({revalidate:3600});
  const articleEntries = parseArticles(articleIds);

  // Static Pages
  const staticEntries = getStaticEntries();

  return [...staticEntries, ...categoryEntries, ...articleEntries];
}`}]
      },
      {
        title: '안전한 HTTP 헤더',
        description: `보안을 위해서 CSP, X-Frame-Options, HttpOnly Cookie같은 설정을 적용했습니다. 그리고 이러한 설정으로 사용하지 않는 형태의 자원 활용이 원천 차단되어 사용자는 브라우저를 통해 더 안전하게 사이트를 이용할 수 있습니다.`,
        images: [
          '/projects/personal/yooncarrot/image19.png',
          '/projects/personal/yooncarrot/image18.png',
          '/projects/personal/yooncarrot/image17.png',
          '/projects/personal/yooncarrot/image16.png',
        ],
        codeSnippets: [{
          title: '보안',
          language: 'typescript',
          description: '보안을 위한 헤더 설정',
          code: `// csp 헤더 코드
const cspHeader = \`
  default-src 'self' blob: gap: data: content: https://accounts.google.com \${BACK_SERVER_URL} https://www.google-analytics.com https://fastly.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com https://api.tiptap.dev/v1/convert/export https://*.googletagmanager.com;
  script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval' https://accounts.google.com https://cdn.ampproject.org https://www.google-analytics.com\${IS_PROD_ENV ? "" : " 'unsafe-eval'"} https://*.googletagmanager.com;
  script-src-elem 'self' 'unsafe-inline' https://*.googletagmanager.com https://accounts.google.com https://cdn.ampproject.org https://www.google-analytics.com;
  style-src 'self' https://accounts.google.com 'unsafe-inline' https://www.googletagmanager.com;
  frame-src 'self' https://accounts.google.com https://www.youtube.com https://youtube.com https://youtu.be https://codepen.io \${BACK_SERVER_URL};
  frame-ancestors 'none';
  form-action 'self' \${BACK_SERVER_URL};
\`;
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: HOST_SERVER_URL || "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\\n/g, ""),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              'picture-in-picture=(self "https://youtube.com" "https://youtu.be" "https://codepen.io"), autoplay=(self), fullscreen=(self "https://youtube.com" "https://youtu.be" "https://codepen.io")',
          },
          {
            key: "Referrer-Policy",
            value: "origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          ...
        ],
      },
      ...
    ];
  }
}`
}]
},
      {
        title: '성능 최적화',
        description: `Critical CSS 적용, Layout Shift 최적화, ISR 기반 캐싱, Lazy Load, Next.js Dynamic Import, Webpack 코드 스플리팅 등 다양한 성능 최적화를 진행했습니다.
Code Split과 Lazy Import를 통해 첫 진입 번들 사이즈를 9%, 공통 번들을 40% 줄였으며, 홈 화면 라우팅 시 필요한 JS 사이즈는 327KB → 145KB(약 55% 감소)로 최적화했습니다.

또한 네트워크 요청 체인 개선과 Critical CSS 적용으로 FCP 성능을 향상시켰고, 랜딩 이미지에는 eager loading을 적용하여 LCP를 1.1초 → 0.8초로 단축했습니다.

동적 테마 디자인 시스템에서 발생하는 FOUC 문제는 성능 측정 도구로는 드러나지 않기 때문에 별도로 신경 썼습니다. 이를 해결하기 위해 React와 Next.js의 일반적인 라이프사이클을 벗어난 방식을 도입해 안정적인 화면 렌더링을 구현했습니다.`,
        images: [
          '/projects/personal/yooncarrot/perf-after.png',
          '/projects/personal/yooncarrot/bundle-before.png',
          '/projects/personal/yooncarrot/bundle-after.png',
          '/projects/personal/yooncarrot/tree-before.png',
          '/projects/personal/yooncarrot/tree-after.png',
          '/projects/personal/yooncarrot/critical.png',
        ],
        codeSnippets: [{
          title: 'Webpack 코드 스플릿',
          language: 'typescript',
          description: 'bundle-analyzer와 Lighthouse 트리맵을 이용하여 자주 함께 사용되는 코드들 중 스플릿이 가능한 경우 묶어서 네트워크 요청과 번들 크기를 최소화 했습니다.',
          code: `// next 설정 예시
webpack: (config, {isServer, webpack}) => {
  if (!isServer) {
    // client가 안쓸 기능 제거
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
  }
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        utils: {
          test: /[\\/]node_modules[\\/](axios|dayjs)[\\/]/,
          name: "utils-vendor",
          chunks: "all",
          priority: 35,
          reuseExistingChunk: true,
        },
        recharts: {
          test: /[\\/]node_modules[\\/](recharts|d3-scale|d3-array|d3-time|d3-shape)[\\/]/,
          name: "recharts-vendor",
          chunks: "async",
          priority: 35,
          enforce: true,
        },
        sentry: {
          test: /[\\/]node_modules[\\/]@sentry[\\/]/,
          name: "sentry-vendor",
          chunks: "all",
          priority: 35,
          enforce: true,
          reuseExistingChunk: true,
        },
      }
    }
  }
  return confing
}`
},{
  title: 'FCP, LCP, FOUC 개선을 위한 코드들',
  language: 'typescript',
  description: 'NextJS는 하이드레이션 과정을 필요로 하기 때문에, FOUC 방지를 위해 React 라이프사이클에서 벗어난 코드를 작성했습니다. 또한 critical CSS및 이미지 컨텐츠의 Priority 설정을 했습니다.',
  code: `// LCP 요소를 고려한 컴포넌트
export const HomeArticleCardList = ({articles}: {articles: TArticle[]}) => {
  return (
    <Carousel
      items={articles}
      itemClassName={"basis-11/12 md:basis-3/7 xl:basis-1/3"}
      noTouchMedia={"(min-width: 1280px)"}
      isFocus={false}
      renderItem={({item: article}) => ( // items attribute 타입에 자동으로 맞춰지는 제네릭 타입 
        <ArticleCard
          key={\`article-\${article.id}\`}
          as="div"     // 접근성을 위한 polymorphic 속성
          article={article}
          isLCP={true} // LCP에 영향을 주는 요소(첫 렌더링 화면에 항상 보이는 요소)를 위한 설정값
        />
      )}
    />
  );
};

// FOUC 개선을 위해 React Lift Cycle에 벗어난 코드들 
export default function HTMLRegistry() {
    return (
      <>
        {/* SSR 하이드레이션 전, Custom Theme의 FOUC 방지용 스크립트와 스타일 */}
        <style
          id="custom-foundation"
          dangerouslySetInnerHTML={{__html: ""}}
          suppressHydrationWarning
        />
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: \`const theme = localStorage.getItem("theme"); const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"; document.documentElement.className=theme || systemTheme; document.getElementById("custom-foundation").innerHTML = localStorage.getItem("foundation") ?? "";\`,
          }}
          suppressHydrationWarning
        />
      </>
    )
  }

// FCP를 위한 크리티컬 CSS 설정, 기존에 수동으로 적용했던 것을 최근에 생긴 inlineCss 속성 활용
const nextConfig = {
  experimental: {
    inlineCss: true,
  }
}

 `
        }]
      },
      {
        title: 'Cursor Paging 댓글',
        description: `기존 페이지네이션 방식은 실시간으로 댓글이 생성되면 새로운 댓글이 추가되어 페이지가 밀리는 현상이 발생합니다. 이를 해결하기 위해 Cursor Paging 방식을 도입하여, 사용자가 마지막으로 본 댓글 이후의 댓글을 불러오는 방식을 구현했습니다. 이로 인해 새로운 댓글이 추가되더라도 사용자의 위치가 유지되어 더 나은 사용자 경험을 제공합니다.`,
        images: [
           '/projects/personal/yooncarrot/image15.png',
        ],
        codeSnippets: [{
          title: 'Cursor Paging 댓글 api',
          language: 'typescript',
          description: 'Cursor 방식으로 댓글 페이징 처리',
          code: `export async function getArticleComments(
  articleId: number,
  cursor: number = 0,
  limit: number = 6,
) {
  const idDescending = encodeURIComponent("-id");
  const res = await apiFetch<Comment[]>(
    \`/articles/\${articleId}/comments?sort=\${idDescending}&cursor=\${cursor}&limit=\${limit}\`,
    {
      method: "get",
    },
  );

  return res;
}`
        }]
      }
    ],
    images: [
      '/projects/personal/yooncarrot/thumbnail.png',

    ],
    codeSnippets: [
     
    ]
  },
  {
    id: 'focus',
    title: 'FOCUS (TMAX)',
    category: '회사 프로젝트',
    thumbnail: '/projects/company/focus/thumbnail.jpeg',
    description: 'CRM, E-Commerce, BI 플랫폼을 한번에 제공하는 프로젝트',
    longDescription: `사내 메인 프로젝트로, 약 60명의 팀원이 참여했습니다.
고객에게 CRM, E-Commerce, BI 플랫폼을 한번에 제공하는 것이 목표였습니다. 주된 차별점은 고객이 비즈니스 로직을 커스텀할 수 있으며, 모든 상품 종류를 팔 수 있게 제공해줄 수 있고, 매우 쉽게 서비스를 구축할 수 있게 해주는 것이였습니다.
`,
    period: '2023.07 - 2024.12',
    team: '약 60명 (FE, BE, 인프라, 기획자, 디자이너, QA 등)',
    role: '프론트엔드',
    technologies: [
      'React', 'TypeScript', 'TanStack Query', 'MobX', 'Emotion', 'mui', 'react-hook-form'
    ],
    achievements: [
      '상품의 "단일/복합/결합" 여부와 가격정책 "일반/구독/렌탈/좌석" 종류와 옵션 입력값에 따른 등록 Form 구현',
      'Form의 입력과 사용자 상호작용에 따른 동적인 Input 생성과 상태관리 구현',
      'MobX를 활용한 개별 상품 Row를 객체화 하여 관리가 용이하도록 구현',
      '대용량 데이터 성능을 위한 Table 가상화, EventListener의 위임 구현',
      '복사 붙여넣기, 드래그, 우클릭 메뉴 등이 사용 가능한 대용량 상품 등록 및 관리 기능 구현',
      '블록 코딩같이 생긴 Rule Engine 적용 화면 설계 및 구현'
    ],
    challenges: [
      '엑셀 형태의 대용량 상품 수정 화면에서 성능 이슈를 Table 가상화와 이벤트 위임으로 해결',
      '다양한 Form 입력과 상호작용에 따른 동적 Input 생성의 복잡한 상태 관리를 MobX로 효율화',
      'Rule Engine 작동 방식에 맞게 고객이 쇼핑몰 설정할 수 있는 화면 기획 및 설계의 어려움을 단계적 접근으로 해결'
    ],
    features: [
      {
        title: '대용량 상품 데이터 화면 처리',
        description: `Table 가상화와 이벤트 위임을 통해 대용량 상품 데이터를 효율적으로 처리하고, 복사/붙여넣기, 드래그 등의 사용자 경험을 제공합니다.
500줄 이상의 테이블의 경우 Table 가상화를 통해 렌더링 시간을 90% 이상 절약할 수 있었습니다. 다만 스크롤을 내릴때마다 렌더링을 계쏙 다시 하기 때문에 사용성에는 악영향이 있었습니다. 
그리고 화면 구성과 기능이 복잡하여 MobX 스토어를 활용해 객체 지향적으로 기능을 나눠설계했습니다.`,
        images: ['/projects/company/focus/item.png'],
        codeSnippets: [{
          title: '대용량 상품 관리 Interface (기억을 간략히 재구성)',
          language: 'typescript',
          description: '대용량 상품을 관리하는데 엑셀처럼 관리할 수 있는 화면 구현이 목표이며, ERP의 제품을 상품으로 등록할 수 있으며, 복사 붙여넣기도 가능하다.',
          code: `
// Item
class Item {
  values: Record<string, ItemValue> = {}; // Item 속성이 매우 다채롭고, 고객이 커스텀 가능. (fix할 속성이 정해지면 field로 선언)
  // 제품의 상태 : new | modifed | deleted | unchanged | null
  state: ItemState;
  // 테이블 저장 등의 작업 시 입력값 부족한 상품은 에러 표시용
  errors: Record<string, boolean> = {};

  constructor(values: Record<string, ItemValue>, state: ItemState = null) {
    this.values = values;
    this.state = state;
    makeAutoObservable(this);
  }
  setter, getter, 검증 메서드 등등... 
}

// Item들을 관리하는 Store
class ItemManagementStore {
  this.filter: Filter; // 필터 위임 객체
  constructor(categories: TCategory[]) {
    this.categorySelects = makeCategorySelects(categories);
    makeAutoObservable(this);
  }
  setter, getter, 상품 검색, 상품 필터링, 필터 초기화 등..
}

// 개별 엑셀의 Cell
class SelectCell(카테고리 셀렉트용), class ChevronCell(복합/결합 상품 접고펼치기 셀), class ButtonCell(모달로 정보 입력할 수 있는 Cell) 등 기타 Excel 관련 셀

// 엑셀
<ItemGrid
    handleCellsChanged={handleCellsChanged} // Cell단위 EventListener를 사용하지 않고 Grid에서 통합 관리.
    virtualized // 가상화
    items={items}
/>
`
}]
      },
      {
        title: '상품 종류와 가격 정책에 따른 동적 Form',
        description: `React Hook Form과 MobX를 활용하여 사용자 상호작용에 따라 동적으로 Input이 생성되는 복잡한 상품 등록 폼을 구현했습니다. 예를 들어, 단일/복합/결합 상태와, 일반/구독/좌석/렌탈 가격 정책에 따라 Form이 동적으로 변합니다.
또한 입력한 옵션에 따라서 여러 상품을 옵션별로 생성하며 Form이 변하기도 합니다.`,
        images: ['/projects/company/focus/thumbnail.jpeg']
      },
      {
        title: 'Rule Engine',
        description: `블록 코딩 형태의 직관적인 화면으로 비즈니스 로직을 설정할 수 있는 기능.
예를 들면 야구에서 한화가 1등를 하면 [item.category == "야구 용품" && user.membership == "실버"]일때 [item.discount = 0.1]을 수행할 수 있도록 블록 코딩형태로 만들어 주는 기능이다.`,
        images: ['/projects/company/focus/scratch.png']
      }
    ],
    links: {},
    images: [
      '/projects/company/focus/thumbnail.jpeg',
    ],
    codeSnippets: [
    ]
  },
  {
    id: 'ims',
    title: '농어촌공사 민원 IMS (TMAX)',
    category: '회사 프로젝트',
    thumbnail: '/projects/company/krc/thumbnail.jpeg',
    description: '농어촌공사의 레거시 민원 시스템에 효화된 새로운 민원 관리 시스템',
    longDescription: `한국농어촌공사에서 진행한 정부기관 프로젝트로, 기존 레거시 시스템을 개선한 새로운 민원 관리 시스템입니다.

TypeScript, TanStack Query, MobX, Emotion을 활용하여 모던한 웹 애플리케이션으로 구축했습니다.

칸반 보드 형식을 적용하여 레거시보다 사용성이 더 높은 서비스를 제공하기 위한 프로젝트였습니다.

컴포넌트 기능에 적당한 방식의 공통 컴포넌트 제작과 드래그&드랍 순서 변경, 유형 변경이 가능한 민원 유형 관리 화면을 구현했습니다.`,
    period: '2024.03 - 2024.12',
    team: 'FE 5명, BE 5명, 디자이너 2명, 기획자 2명, QA 2명, +타사 인원',
    role: '프론트엔드',
    technologies: [
      'TypeScript', 'TanStack Query', 'MobX', 'Emotion', 'cypress', 'mui', 'react-hook-form', 'react-dnd', 'react-quill', 'xlsx'
    ],
    achievements: [
      'Render Props 방식의 Select, Headless 방식의 Popover 컴포넌트 구현',
      'React-dnd를 활용한 민원 유형 순서 조정 기능 구현',
      '유형별 Form에 따라 민원을 생성하는 화면 구현',
      '민원 통계 화면 구현',
      '조직도를 통합으로 관리할 수 있는 모듈 구현'
    ],
    challenges: [
      '기획된 디자인에 적합한 방식의 공통 컴포넌트 제작',
      '민원 통계 데이터 타입 공통화 및 파싱 함수 구현',
    ],
    features: [
      {
        title: '디자인 시스템 - 공통 컴포넌트',
        description: 'Render Props 방식의 Select, Headless 방식의 Popover 등 다양한 상황에 맞는 공통 컴포넌트를 제작하여 재사용성과 유지보수성을 높였습니다.',
        images: ['/projects/company/krc/thumbnail.jpeg']
      },
      {
        title: '민원 유형 관리, 민원 생성',
        description: 'React DnD를 활용한 민원 유형 순서 변경과 유형별 담당자 관리 기능, 민원 종류에 맞는 Form을 제공하는 민원 생성 화면을 구현했습니다.',
        images: ['/projects/company/krc/thumbnail.jpeg']
      },
      {
        title: '통합 조직도 관리 모듈',
        description: `타사와의 협엽으로 DB연동이 힘들었습니다. 그래서 조직도를 한번에 받아와서 사용하는 방식을 써야했습니다. 그래서 조직도에서 원하는 정보를 효율적으로 찾아서 사용할 수 있어야했습니다. 그래서 조직도 관리와 출력을 위한 모듈을 만들어 개발 편의성을 높였습니다.`,
        images: ['/projects/company/krc/thumbnail.jpeg']
      },
      {
        title: '민원 통계',
        description: `그리드 형태의 다양한 통계 형식을 출력하기 위한 데이터 타입과 파싱 함수를 구현했습니다. 엑셀로도 다운로드할 수 있어야 하기 때문에
데이터 셀과 헤더 셀을 확실히 분리하고, Table 태그를 활용하였습니다.`,
        images: ['/projects/company/krc/thumbnail.jpeg']
      }
    ],
    links: {},
    images: [
      '/projects/company/krc/thumbnail.jpeg',
    ]
  },
  {
    id: 'chit-a-chat',
    title: 'Chit a Chat',
    category: '사이드 프로젝트',
    thumbnail: '/projects/side/chitAChat/thumbnail.png',
    description: '커뮤니티 기능이 추가된 글로벌 데이팅 어플리케이션 (중단)',
    longDescription: `커뮤니티 기능이 추가된 글로벌 데이팅 어플리케이션 프로젝트입니다.

React, ReactQuery, Zustand, Emotion, i18n, WebSocket을 활용하여 실시간 채팅과 다국어 지원이 가능한 웹 애플리케이션을 개발했습니다.

프론트엔드 전체와 스크럼 마스터 역할을 담당하며 프로젝트를 이끌었습니다.

FSD 아키텍처를 적용하여 체계적인 프로젝트 구조를 설계했고, 기획서를 트리구조 I.A. 그림으로 관리하여 문서 관리 효율화를 달성했습니다.`,
    period: '2024.06 - 2025.02',
    team: 'FE 2명, BE 3명, 디자이너 1명',
    role: '프론트엔드, 스크럼 마스터',
    technologies: [
      'React', 'ReactQuery', 'Zustand', 'Emotion', 'i18n', 'WebSocket', 'msw'
    ],
    achievements: [
      'Git 브랜치 전략 및 컨벤션 설정을 통한 체계적인 프로젝트 관리',
      '기획서를 상세 메뉴를 보여주는 트리구조 I.A.로 작성하여 문서 관리 효율화',
      'FSD 아키텍처 기반 프론트엔드 구조 설계',
      '디자인 시스템 구축',
      'msw를 활용한 MockApi 개발도구 추가',
    ],
    challenges: [
      '기획서를 트리구조 I.A. 그림으로 관리하여 기획자 없이 문서 관리 효율화 달성',
      'FSD 아키텍처 기반 프론트엔드 구조 설계로 유지보수성 향상',
      'Git 메시지 템플릿과 Git hook으로 GIT 커밋 메시지 일관화',
      '디자이너와 협업하여 다국어 지원 디자인 시스템 구축 및 체계화',
    ],
    links: {
      github: 'https://github.com/chit-a-chat/FE'
    },
    architecture: [
      '/projects/side/chitAChat/architecture.png',
    ],
    features: [
      {
        title: '바닥부터 만드는 공통 컴포넌트',
        description: `React 외의 라이브러리를 사용하지 않고, 바닥부터 만드는 공통 컴포넌트로 디자인 시스템을 구축했습니다.
솔직히 ShadCn 같은 라이브러리가 더 잘 만들어져 있겠지만, 직접 만들어보는 경험이 중요하다고 생각했습니다.
직접 만들면서 Portal을 활용한 Select같은 컴포넌트의 리스트 포지셔닝, 접근성, UX 문제를 고민하고 해결 및 개선할 수 있었습니다.`,
        images: [
          '/projects/side/chitAChat/Components.png',
          '/projects/side/chitAChat/image33.png',
          '/projects/side/chitAChat/image34.png',

        ],
        codeSnippets: [{
          title: 'Portal의 AutoPosition을 위한 컴포넌트',
          language: 'typescript',
          description: '코드가 조잡해 보일 수 있지만, Portal을 이용하여 맨 위에 띄우는 컴포넌트들에서 발생하는 문제를 해결할 수 있었습니다.',
          code: `export const AutoPosition = ({
  children,
  anchorEl,
  container,
  position,
  isAutoPosition,
}: AutoPositionProps) => {
  const displayElRef = useRef<HTMLDivElement>(null);
  const initialScrollRef = useRef({
    x: container.scrollLeft ?? 0,
    y: container.scrollTop ?? 0,
  });
  const [style, setStyle] = useState<CSSProperties>();

  // 위치 계산 및 설정
  const updatePosition = useCallback(() => {
    const displayEl = displayElRef.current;
    if (!displayEl) return;

    setStyle(
      getPositionCss({
        position,
        anchorEl,
        container,
        displayEl,
        isAutoPosition,
      })
    );
  }, [position, anchorEl, container, isAutoPosition]);

  // 스크롤 보정
  const handleScroll = useCallback(() => {
    const { x: initialX, y: initialY } = initialScrollRef.current;
    const currentScrollX = container.scrollLeft ?? 0;
    const currentScrollY = container.scrollTop ?? 0;

    flushSync(() => {
      setStyle(prev => ({
        ...prev,
        transform: \`translate(\${initialX - currentScrollX}px, \${initialY - currentScrollY}px)\`,
      }));
    });
  }, [container]);

  const throttledScroll = useMemo(() => useThrottle(handleScroll, 10), [handleScroll]);
  const throttledResize = useMemo(() => useThrottle(updatePosition, 10), [updatePosition]);

  useLayoutEffect(() => {
    if (!displayElRef.current) {
      throw new Error('displayElRef가 HTML 요소에 연결되지 않았습니다.');
    }

    updatePosition();

    container?.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', throttledResize);

    return () => {
      container?.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledResize);
    };
  }, [updatePosition, throttledScroll, throttledResize, container]);

  return (
    <div ref={displayElRef} style={style}>
      {children}
    </div>
  );
};`,
}]
      },
      {
        title: '다국어 지원 (i18n)',
        description: `i18next를 활용하여 한국어, 영어(영국)를 지원하고 개발자 친화적으로 다국어를 관리할 수 있도록 했습니다.
또한 언어 설정에 따라서 다른 font-family와 그 폰트에 맞는 디자인 시스템 토큰이 적용되도록 했습니다.`,
        images: ['/projects/side/chitAChat/thumbnail.png'],
        codeSnippets: [{
          title: '언어별 다국어 관리 타입',
          language: 'typescript',
          description: 'i18n의 타입 정의로 자동 완성과 정적 타입검사까지 할 수 있도록 커스텀하게 추가한 코드입니다.',
          code: `import { TCountryName } from "@shared/ui";
import { en } from "./en/en.translation";
import { ko } from "./ko/ko.translation";

type TResources = typeof en & typeof ko;
declare module "i18next" {
    interface CustomTypeOptions {
        /** 자동완성을 위한 정의 */
        resources: TResources;
    }
    interface i18n {
        language: TCountryName;
        changeLanguage(lng: TCountryName): Promise<void>;
    }
}
    
// 예시 1-1) 'home' 키에 대한 자동완성 및 정적 타입 검사 가능
const { t } = useTranslation("home");
// 예시 1-2) 'home' 네임스페이스의 'LoginTitle' 키에 대한 자동완성 및 정적 타입 검사 가능
console.log(t("LoginTitle"))`,
         
        },
        {
          title: '언어 설정별 동적 Typography 디자인 토큰 변경',
          language: 'typescript',
          description: 'i18n의 언어 설정에 따라서 다른 font-family와 그 폰트에 맞는 디자인 시스템 토큰을 사용하기 위해 정의한 토큰 목록입니다.',
          code: `// 한글 Typo 토큰과 CSS
const typoKo: Record<
    TTypoVariant,
   TTypoCSSValue
> = {    
    "h1/bold": {
        fontSize: "34.2px",
        lineHeight: "52px",
        letterSpacing: "0px",
        fontWeight: 700,
    },
    "h2/medium": {
        fontSize: "28px",
        lineHeight: "42px",
        letterSpacing: "0px",
        fontWeight: 500,
    },
    ...
}
// 영어 Typo 토큰과 CSS
const typoEn:Record<
    TTypoVariant,
   TTypoCSSValue
> = {
    "h1/bold": {
        fontSize: "38px",
        lineHeight: "57px",
        letterSpacing: "1px",
        fontWeight: 700,
    },
    "h2/medium": {
        fontSize: "28px",
        lineHeight: "40px",
        letterSpacing: "1px",
        fontWeight: 500,
    },
    ...
}`,
         
        }]
      },
      {
        title: 'FSD 아키텍처',
        description: `Feature-Sliced Design 아키텍처를 적용하여 체계적이고 확장 가능한 프론트엔드 구조를 설계했습니다.
아키텍처에 따라 폴더와 파일을 구성하다보면, 자연스럽게 도메인별로 관심사 분리가 되고, 유지보수성과 확장성이 향상되는 효과가 있습니다. 물론 레이어의 구성과 들어갈 요소의 기준은 구성원간의 합의가 선행되어야 하며, 숙련도가 필요했습니다.
이 당시에는 FSD 아키텍처를 쓰는 다른 프로젝트를 열심히 참고하여 사용했습니다. 하지만 최근 리팩터링, 디자인 패턴 등을 다시 공부하며 책에 적혀진 방법들을 알기 전에 스스로 설계하고 판단할 수 있는 능력이 우선되어야 함을 깨달았습니다.\n
그래서 FSD 아키텍처를 정해진 틀로 사용하기 보다는 알아서 생각하고 응용할 수 있는 능력을 갖췄다고 생각합니다.
`,
        images: ['/projects/side/chitAChat/FSD.png'],
        codeSnippets: [{
          title: 'FSD 아키텍처 구조',
          language: 'typescript',
          description: 'FSD 아키텍처 구조와 각 레이어의 역할입니다.',
          code: `// 6개의 레이어로 구성된 FSD 아키텍처 사용.
src
 ├─ app      // 페이지 라우팅과 글로벌 설정
 ├─ pages    // 페이지 단위 라우팅 하위 Layer들의 조합.
 ├─ widgets  // 여러 features, entities, shared를 조합한 복합 컴포넌트
 ├─ features // 특정 기능 단위 컴포넌트 (Create, Update, Delete 등)
 ├─ entities // 도메인 단위 컴포넌트, 기능
 └─ shared   // Button, Text같은 공통 컴포넌트, 유틸, 스타일 등`
        }],
      }
    ],
    images: [
      '/projects/side/chitAChat/image26.png',
     '/projects/side/chitAChat/image31.png',
      '/projects/side/chitAChat/image27.png',
      '/projects/side/chitAChat/image22.png',
    ],
    codeSnippets: []
  },
  {
    id: 'luck-quiz',
    title: 'Luck Quiz',
    category: '사이드 프로젝트',
    thumbnail: '/projects/side/luckQuiz/thumbnail.gif',
    description: '실시간 랭킹 서비스와 실시간 케이운 어플리케이션',
    longDescription: `퀴즈 제작 및 실시간 퀴즈 게임 진행을 위한 어플리케이션 프로젝트입니다.

Spring Boot, JPA, Kafka, Stomp, Redis, MySQL을 활용하여 백엔드를 구축했고, 실시간 통신과 대용량 처리가 가능한 시스템을 설계했습니다.

퀴즈게임 WebSocket API 구현, Redis Z-set으로 실시간 랭킹 구현, Kafka 기능 활용한 채점 서버 구축 등 다양한 백엔드 기술을 경험했습니다.

특히 대용량 트래픽에서 다수 가능한 채점 서버 구축과 실시간 랭킹 서비스, 실시간 퀴즈 게임 서비스를 성공적으로 구현했습니다.`,
    period: '2023.04 - 2023.05',
    team: 'FE 3명, BE 3명',
    role: '백엔드',
    technologies: [
      'Spring Boot', 'JPA', 'Kafka', 'Stomp', 'Redis', 'MySQL'
    ],
    achievements: [
      '퀴즈게임 WebSocket API 구현',
      'Redis Z-set으로 실시간 랭킹 구현',
      'Kafka 기능 활용한 채점 서버 구축',
      '대용량 트래픽에서 다수 가능한 채점 서버 구축',
      '실시간 랭킹 서비스 구현',
      '실시간 퀴즈 게임 서비스 구현'
    ],
    challenges: [
      '대용량 트래픽 상황에서의 실시간 처리 성능 최적화',
      'WebSocket을 활용한 실시간 통신 구현의 복잡성 해결',
      'Kafka를 활용한 분산 처리 시스템 설계 및 구현'
    ],
    links: {},
    architecture: [
      '/projects/side/luckQuiz/architecture.png'
    ],
    features: [
      {
        title: '실시간 랭킹 시스템',
        description: 'Redis Z-set을 활용하여 대용량 트래픽에서도 실시간으로 업데이트되는 랭킹 시스템을 구현했습니다.',
        images: [ '/projects/side/luckQuiz/image48.jpeg',
      '/projects/side/luckQuiz/image49.jpeg',]
      },
      {
        title: 'Kafka 분산 채점',
        description: 'Kafka Producer/Consumer와 Batch Consume을 활용하여 짧은 시간에 대규모 트랜잭션을 일으킬 수 있는 정답 제출을 분산 처리하는 채점 서버를 구축했습니다. 특히 얼굴 인식과 같은 무거운 작업도 여러 서버에 분산하여 처리하여 안정적으로 서비스를 제공할 수 있었습니다.',
        images: ['/projects/side/luckQuiz/face.gif']
      },
      {
        title: 'WebSocket을 사용한 퀴즈 게임',
        description: 'Stomp 프로토콜을 활용한 실시간 퀴즈 게임으로 다수의 사용자가 동시에 참여할 수 있는 시스템을 구현했습니다. 유저와 서버 사이의 통신이 복잡해지면서 시퀀스 다이어그램을 그려서 설계했습니다.',
        images: ['/projects/side/luckQuiz/sequenceDiagram.png']
      }
    ],
    images: [
      '/projects/side/luckQuiz/image37.png',
      '/projects/side/luckQuiz/game1.gif',
      '/projects/side/luckQuiz/image40.jpeg',
      '/projects/side/luckQuiz/image41.jpeg',

      '/projects/side/luckQuiz/image51.jpeg',
    ],
    codeSnippets: [
    ]
  },
  {
    id: 'constelink',
    title: 'Constelink',
    category: '사이드 프로젝트',
    thumbnail: '/projects/side/constelink/thumbnail.png',
    description: '블록체인 기반의 무료한 기부와 치료 일지 제공 프로젝트',
    longDescription: `기부 내역을 블록체인으로 기록하며, 치료 일지까지 공유하는 서비스입니다.

React, Redux, web3.js를 활용한 프론트엔드와 Spring Boot, JPA, MySQL, gRPC를 활용한 백엔드를 모두 경험한 풀스택 프로젝트였습니다.

Web3 암호화폐 지갑 기능과 컴포넌트 UI 개발을 담당했으며, 환자 등록과 치료 일지 DB설계, 환자 등록/기부 목록/치료 일지 Api 구축, gRPC를 통한 MSA 아키텍처 서버간 통신 등 백엔드 업무도 함께 수행했습니다.`,
    period: '2023.02 - 2023.04',
    team: 'FE 2명, BE 3명, 풀스택 1명',
    role: '풀스택',
    technologies: [
      'React', 'Redux', 'web3.js', 'Spring Boot', 'JPA', 'MySQL', 'gRPC'
    ],
    achievements: [
      'Web3 암호화폐 지갑 기능 개발',
      '컴포넌트 UI 개발',
      '환자 등록과 치료 일지 DB설계',
      '환자 등록/기부 목록/치료 일지 Api구축',
      'gRPC를 통한 MSA 아키텍처 서버간 통신 구현',
      '환자 등록 및 치료 일지 서비스 구축',
      '기부 목록 화면 구현',
      'Web3 메타마스크 지갑 연동'
    ],
    challenges: [
      'Web3와 블록체인 기술의 학습 및 적용',
      'MSA 아키텍처에서의 서비스간 통신 구현',
      '암호화폐 지갑 연동의 보안성 고려'
    ],
    links: {},
    architecture: [
      '/projects/side/constelink/architecture.png'
    ],
    images: [
      '/projects/side/constelink/thumbnail.png',
    ]
  },
  {
    id: 'mpti',
    title: 'MPTI',
    category: '사이드 프로젝트',
    thumbnail: '/projects/side/mpti/thumbnail.png',
    description: '온라인 화상 채팅으로 PT를 받을 수 있는 웹사이트',
    longDescription: `온라인 PT 제공 서비스인 MPTI는 화상 채팅을 통해 개인 트레이닝을 받을 수 있는 웹 애플리케이션입니다.

React와 WebRTC, StompJS를 활용하여 실시간 화상 통신이 가능한 PT 서비스를 구현했습니다.

관리자 화면, 트레이너 상담 채팅, WebRTC 화상채팅 PT, 고객 운동 기록 등의 다양한 기능을 프론트엔드에서 담당했습니다.

개인 맞춤형 운동 서비스를 온라인으로 제공하여 시공간의 제약 없이 전문적인 PT를 받을 수 있도록 하는 혁신적인 서비스였습니다.`,
    period: '2023.01 - 2023.02',
    team: 'FE 3명, BE 3명',
    role: '프론트엔드',
    technologies: [
      'React', 'WebRTC', 'StompJS', 'JavaScript', 'CSS'
    ],
    achievements: [
      '관리자 화면 UI 구현',
      '트레이너 상담 채팅 UI 개발',
      'WebRTC 화상채팅 PT UI 구현',
      '고객 운동 기록 UI 구축',
      '실시간 화상 통신 기능 구현',
      '온라인 PT 예약 및 관리 시스템 구현'
    ],
    challenges: [
      'WebRTC 기술을 활용한 안정적인 화상 통신 구현',
      '실시간 채팅과 화상 통화의 동시 처리',
      '사용자 친화적인 PT 관리 인터페이스 설계'
    ],
    links: {},
    architecture: [
      '/projects/side/mpti/architecture.png'
    ],
    images: [
      '/projects/side/mpti/thumbnail.png',
    ]
  }
];
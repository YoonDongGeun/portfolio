import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/* ==================================================================
   도표 / 아이콘 레지스트리
   원본 픽셀 크기는 세로 공간 배분과 next/image 최적화에 모두 쓰인다.
================================================================== */

export const DECK_IMAGES = {
  "realteeth-scan-list": { w: 1160, h: 825 },
  "realteeth-collision": { w: 763, h: 782 },
  "realteeth-inner-value": { w: 1353, h: 965 },
  "blog-architecture": { w: 1115, h: 921 },
  "blog-store": { w: 1207, h: 616 },
  "blog-editor": { w: 1370, h: 560 },
  "blog-sync-hook": { w: 2408, h: 808 },
  "blog-rsc": { w: 2192, h: 294 },
  "mockly-store": { w: 1366, h: 716 },
  "mockly-splash": { w: 330, h: 690 },
  "mockly-home": { w: 336, h: 690 },
  "mockly-nearby": { w: 330, h: 688 },
  "mockly-interview": { w: 318, h: 688 },
  "mockly-monorepo": { w: 868, h: 664 },
  "mockly-auth": { w: 1302, h: 1070 },
  "mockly-design-system": { w: 1759, h: 1282 },
} as const;

export type DeckImage = keyof typeof DECK_IMAGES;

export type DeckIcon =
  | "realteeth"
  | "blog"
  | "mockly"
  | "etc"
  | "tmax"
  | "ssafy";

/* ==================================================================
   헤더
================================================================== */

/** 프로젝트 개요 슬라이드 머리. 아이콘 · 이름 · 구분선 · 설명. */
export function ProjectHead({
  icon,
  name,
  desc,
}: {
  icon: DeckIcon;
  name: string;
  desc: ReactNode[];
}) {
  return (
    <header className="phead">
      <Image
        className="phead-ic"
        src={`/deck/icon-${icon}.png`}
        alt=""
        width={256}
        height={256}
        aria-hidden
      />
      <h2 className="phead-name">{name}</h2>
      <span className="phead-div" />
      <div className="phead-desc">
        {desc.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </header>
  );
}

/** 사례 슬라이드 머리. 소속 맥락 · 제목 · 태그 칩. */
export function CaseHead({
  context,
  title,
  tags,
}: {
  context: string;
  title: ReactNode;
  tags: string[];
}) {
  return (
    <header className="chead">
      <div className="chead-ctx">{context}</div>
      <h2 className="chead-title">{title}</h2>
      <div className="tags">
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </header>
  );
}

/** 아이콘 없는 일반 슬라이드 머리. */
export function PlainHead({
  context,
  title,
  sub,
}: {
  context?: string;
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <header className="chead">
      {context && <div className="chead-ctx">{context}</div>}
      <h2 className="chead-title">{title}</h2>
      {sub && <div className="chead-sub">{sub}</div>}
    </header>
  );
}

/* ==================================================================
   문제 → 판단 → 해결 → 결과
================================================================== */

const PB_TONE = {
  문제: "problem",
  판단: "judge",
  해결: "solve",
  결과: "result",
  회고: "note",
  배움: "note",
} as const;

export function PB({
  label,
  children,
}: {
  label: keyof typeof PB_TONE;
  children: ReactNode;
}) {
  return (
    <div className="pb" data-tone={PB_TONE[label]}>
      <span className="pb-l">{label}</span>
      <div className="pb-t">{children}</div>
    </div>
  );
}

export function PBlocks({ children }: { children: ReactNode }) {
  return <div className="pbs">{children}</div>;
}

/** 성과가 여러 줄일 때. 원본 PPT 의 결과 블록이 이 형태다. */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="pb-ul">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

/* ==================================================================
   메타 행 / 개발 환경 / 핵심 성과
================================================================== */

export function Meta({ children }: { children: ReactNode }) {
  return <dl className="meta">{children}</dl>;
}

export function M({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="m">
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/** 서비스 주소 한 줄. 라벨 + 링크. */
export function Service({
  href,
  children,
  note,
}: {
  href?: string;
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="svc">
      <span className="svc-k">서비스</span>
      {href ? (
        <a className="svc-v" href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <span className="svc-v">{children}</span>
      )}
      {note && <span className="svc-n">{note}</span>}
    </div>
  );
}

/** 회색 카드에 담긴 개발 환경 표. */
export function Env({ children }: { children: ReactNode }) {
  return (
    <div className="env">
      <div className="env-h">개발 환경</div>
      <dl className="env-l">{children}</dl>
    </div>
  );
}

export function E({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="e">
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/** 핵심 성과 — 파란 칩 묶음. */
export function Wins({ items }: { items: string[] }) {
  return (
    <div className="wins">
      <div className="wins-h">핵심 성과</div>
      <div className="wins-l">
        {items.map((w) => (
          <span key={w} className="win">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 외부 링크 한 줄. */
export function LinkOut({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="linkout" href={href} target="_blank" rel="noreferrer">
      {children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}

/* ==================================================================
   디자인 토큰 레이어
================================================================== */

export type TokenLayer = {
  name: string;
  token: string;
  /** 팔레트(LAYER 0)처럼 색 그 자체인 레이어. */
  swatch?: string;
};

/**
 * 단방향 참조 토큰 레이어.
 *
 * 각 단계는 바로 다음 단계만 참조한다는 것을 세로 연결선으로 보인다.
 */
export function TokenLayers({
  title,
  layers,
}: {
  title: string;
  layers: TokenLayer[];
}) {
  return (
    <div className="tok">
      <div className="tok-h">{title}</div>
      <ol className="tok-l">
        {layers.map((l, i) => (
          <li key={l.name} className="tok-row">
            <span className="tok-no">LAYER {i}</span>
            <span className="tok-name">{l.name}</span>
            <code
              className="tok-v"
              style={
                l.swatch
                  ? ({
                      background: l.swatch,
                      color: "#fff",
                      borderColor: l.swatch,
                    } as CSSProperties)
                  : undefined
              }
            >
              {l.token}
            </code>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ==================================================================
   도표
================================================================== */

export type FigureItem = {
  /** 배열이면 같은 높이로 가로로 나란히 놓는다. */
  img: DeckImage | DeckImage[];
  alt: string;
  caption?: ReactNode;
  priority?: boolean;
};

/** 같은 높이로 늘어놓았을 때의 전체 가로세로비. */
function ratioOf(img: DeckImage | DeckImage[]) {
  const list = Array.isArray(img) ? img : [img];
  return list.reduce((s, k) => s + DECK_IMAGES[k].w / DECK_IMAGES[k].h, 0);
}

/**
 * 도표 묶음.
 *
 * 각 도표에 `1 / 가로세로비`를 정규화한 flex-grow 를 주어, 여러 장을 쌓아도
 * 자연스러운 높이 비율로 남은 공간을 정확히 나눠 갖는다. 이미지는 max-width /
 * max-height 로만 제한해 항상 원본 비율을 유지한다.
 */
export function Figures({
  items,
  grid2,
  tight,
}: {
  items: FigureItem[];
  grid2?: boolean;
  /** 남은 세로 공간을 채우지 않고 원본 비율 그대로 놓는다(하단 배너 등). */
  tight?: boolean;
}) {
  const ratios = items.map((f) => ratioOf(f.img));
  const weights = ratios.map((r) => 1 / r);
  const total = weights.reduce((s, x) => s + x, 0) || 1;
  const cls = ["figs", grid2 && "grid2", tight && "tight"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {items.map((f, i) => {
        const list = Array.isArray(f.img) ? f.img : [f.img];
        return (
          <figure
            key={list.join("+")}
            className="fig"
            style={
              {
                flexGrow: weights[i] / total,
                "--ratio": `${ratios[i]}`,
              } as CSSProperties
            }
          >
            <div
              className={list.length > 1 ? "fig-box multi" : "fig-box"}
              role={list.length > 1 ? "img" : undefined}
              aria-label={list.length > 1 ? f.alt : undefined}
            >
              {list.map((k) => {
                const { w, h } = DECK_IMAGES[k];
                return (
                  <Image
                    key={k}
                    className="fig-img"
                    src={`/deck/${k}.png`}
                    alt={list.length > 1 ? "" : f.alt}
                    aria-hidden={list.length > 1 || undefined}
                    width={w}
                    height={h}
                    sizes="(max-width: 900px) 92vw, 50vw"
                    priority={f.priority}
                  />
                );
              })}
            </div>
            {f.caption && <figcaption className="fig-cap">{f.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}

/* ==================================================================
   카드
================================================================== */

export function Cards({
  cols,
  children,
}: {
  cols: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return <div className={`cards c${cols}`}>{children}</div>;
}

export function Card({
  no,
  title,
  tag,
  result,
  children,
}: {
  no?: string;
  title: ReactNode;
  tag?: ReactNode;
  result?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-head">
        {no && <span className="card-no">{no}</span>}
        <span className="card-h">{title}</span>
      </div>
      {tag && <div className="card-tag">{tag}</div>}
      {children && <div className="card-b">{children}</div>}
      {result && <div className="card-res">{result}</div>}
    </div>
  );
}

/** 경력 카드. 아이콘 · 기관명 · 역할/기간 · 구분선 · 내용. */
export function ExpCard({
  icon,
  org,
  role,
  children,
}: {
  icon: DeckIcon;
  org: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="exp">
      <div className="exp-head">
        <Image
          className="exp-ic"
          src={`/deck/icon-${icon}.png`}
          alt=""
          width={256}
          height={256}
          aria-hidden
        />
        <div>
          <div className="exp-org">{org}</div>
          <div className="exp-role">{role}</div>
        </div>
      </div>
      <div className="exp-b">{children}</div>
    </div>
  );
}

/** 경력 카드 안의 소제목 + 불릿 묶음. */
export function Work({ name, items }: { name: string; items: ReactNode[] }) {
  return (
    <div className="work">
      <div className="work-n">{name}</div>
      <ul className="ul">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

/** 슬라이드 하단에 붙는 한 줄 요약 띠. */
export function Strip({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="strip">
      <span className="sk">{k}</span>
      <span className="sv">{children}</span>
    </div>
  );
}

/* ==================================================================
   표지 — 핵심 스킬 / 성장 타임라인
================================================================== */

export function Skills({ groups }: { groups: [string, string][] }) {
  return (
    <div className="skills">
      <div className="skills-h">핵심 스킬</div>
      <dl className="skills-l">
        {groups.map(([k, v]) => (
          <div key={k} className="sk-row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export type TimelineNode = {
  /** 레일 위 위치(%). 실제 시간 간격에 비례하게 둔다. */
  at: number;
  align?: "start" | "center" | "end";
  /** 주요 노드일 때 레일 위에 올라가는 정보. */
  title?: string;
  sub?: string;
  date?: string;
  /** 레일 아래에 붙는 산출물. */
  work: string;
  /** 현재 진행 중인 노드. */
  now?: boolean;
};

/**
 * 성장 타임라인.
 *
 * 레일 위에 노드를 퍼센트로 절대 배치한다. `title` 이 있는 노드는 기관 정보를
 * 레일 위쪽에, 없는 노드는 산출물만 아래쪽에 두어 라벨이 서로 겹치지 않는다.
 */
export function Timeline({
  nodes,
  progress = 100,
}: {
  nodes: TimelineNode[];
  /** 레일이 파랗게 채워지는 지점(%). */
  progress?: number;
}) {
  return (
    <div className="tl">
      <div className="tl-h">성장 타임라인</div>
      <div className="tl-rail">
        <div className="tl-track" />
        <div className="tl-fill" style={{ width: `${progress}%` }} />
        {nodes.map((n) => (
          <div
            key={n.work}
            className={n.title ? "tn major" : "tn"}
            data-align={n.align ?? "center"}
            data-now={n.now ? "true" : undefined}
            /* 좁은 화면에서 세로 배치로 바꿀 때 인라인 left 와 싸우지 않도록
               위치는 커스텀 속성으로만 넘긴다. */
            style={{ "--at": `${n.at}%` } as CSSProperties}
          >
            {n.title && (
              <div className="tn-top">
                <div className="tn-title">{n.title}</div>
                {n.sub && <div className="tn-sub">{n.sub}</div>}
                {n.date && <div className="tn-date">{n.date}</div>}
              </div>
            )}
            <span className="tn-dot" />
            <div className="tn-bot">{n.work}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================================
   레이아웃
================================================================== */

export function Split({
  variant,
  children,
}: {
  variant?: "wide-left" | "wide-right" | "even";
  children: ReactNode;
}) {
  return <div className={variant ? `split ${variant}` : "split"}>{children}</div>;
}

export function Col({
  center,
  children,
}: {
  center?: boolean;
  children: ReactNode;
}) {
  return <div className={center ? "col center" : "col"}>{children}</div>;
}

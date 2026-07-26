import type { ReactNode } from "react";
import {
  Bullets,
  Card,
  Cards,
  CaseHead,
  Col,
  E,
  Env,
  ExpCard,
  Figures,
  LinkOut,
  M,
  Meta,
  PB,
  PBlocks,
  PlainHead,
  ProjectHead,
  Service,
  Skills,
  Split,
  Strip,
  Timeline,
  TokenLayers,
  Wins,
  Work,
} from "@/app/components/deck-ui";

export const SECTIONS = [
  { id: "intro", label: "자기소개" },
  { id: "projects", label: "개발 프로젝트" },
  { id: "etc", label: "기타 프로젝트" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export type Slide = {
  id: string;
  section: SectionId;
  caption: string;
  content: ReactNode;
};

/* ------------------------------------------------------------------ */

const RT_CTX = "리얼티쓰 · Web 3D AI Dental CAD";
const BLOG_CTX = "개인 블로그 · yooncarrot.com";
const MK_CTX = "Mockly · AI 모의 면접 앱";

const BLOG_APP_URL =
  "https://play.google.com/store/apps/details?id=com.carrotMobileApp&hl=ko";
const STORYBOOK_URL =
  "https://69324aeddcbd1324310464e9-giibikyaod.chromatic.com/?path=/story/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C--%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C";

/* ------------------------------------------------------------------ */

export const SLIDES: Slide[] = [
  /* 01 — 표지 --------------------------------------------------- */
  {
    id: "cover",
    section: "intro",
    caption: "프론트엔드 개발자 윤동근 · 포트폴리오",
    content: (
      <div className="cover">
        <div className="cover-main">
          <div className="cover-l">
            <div className="cover-eyebrow">PORTFOLIO</div>
            <h1 className="cover-name">
              윤동근 <span>프론트엔드 개발자</span>
            </h1>
            <div className="cover-links">
              <span>
                <b>블로그</b> :{" "}
                <a href="https://yooncarrot.com" target="_blank" rel="noreferrer">
                  yooncarrot.com
                </a>
              </span>
              <span>
                <b>GIT</b> :{" "}
                <a
                  href="https://github.com/YoonDongGeun"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/YoonDongGeun
                </a>
              </span>
              <span>
                <b>MAIL</b> :{" "}
                <a href="mailto:ehdrmsdl9999@naver.com">ehdrmsdl9999@naver.com</a>
              </span>
            </div>

            <p className="tagline">
              본질에 집중하고 즐겁게 개발하며 성장하고 싶은 개발자
            </p>

            <div className="certs">
              <div className="certs-h">자격증</div>
              <div className="certs-v">
                정보처리기사 (2024) · 화공기사 (2021) · 한국사능력검정 1급 (2020)
              </div>
            </div>
          </div>

          <Skills
            groups={[
              ["언어", "TypeScript · JavaScript · Java · Python · C++"],
              [
                "Frontend",
                "React · React Native · Next.js · TanStack Query · Zustand · Jotai · Tailwind CSS · Storybook · VTK · Tiptap",
              ],
              [
                "Backend · Infra",
                "Spring Boot · MySQL · Redis · AWS(EC2·S3) · Nginx · Docker · Jenkins",
              ],
              [
                "품질 · 협업",
                "Vitest · Sentry · Lighthouse · OWASP ZAP · Turborepo · pnpm · Figma · Claude Code · Oh-my-openagent · Jira · Notion",
              ],
            ]}
          />
        </div>

        <Timeline
          progress={98}
          nodes={[
            {
              at: 2,
              align: "start",
              title: "SSAFY 8기",
              sub: "부트캠프 · 1,600h",
              date: "2022.07 – 2023.06",
              work: "Luck Quiz · Constelink · MPTI",
            },
            {
              at: 50,
              title: "티맥스 비아이",
              sub: "프론트엔드 연구원",
              date: "2023.07 – 2024.12",
              work: "FOCUS CRM · 농어촌공사 IMS",
            },
            { at: 69, work: "블로그 2025.01" },
            { at: 84, work: "Mockly 앱 2025.11" },
            {
              at: 98,
              align: "end",
              title: "리얼티쓰",
              sub: "프론트엔드 개발자",
              date: "2026.02 – 재직 중",
              work: "AI 보철물 솔루션",
              now: true,
            },
          ]}
        />
      </div>
    ),
  },

  /* 02 — 리얼티쓰 개요 ------------------------------------------ */
  {
    id: "realteeth-overview",
    section: "projects",
    caption: "리얼티쓰 — Web 3D AI Dental CAD 개요",
    content: (
      <>
        <ProjectHead
          icon="realteeth"
          name="리얼티쓰"
          desc={["Web 3D AI Dental CAD", "AI 치아 보철물 생성 · 편집 솔루션"]}
        />
        <Split>
          <Col>
            <Service href="https://app.realteeth.ai">app.realteeth.ai</Service>
            <Meta>
              <M k="개발 기간">2026.02 ~ 재직 중</M>
              <M k="플랫폼">Web</M>
              <M k="개발 인원">7명 (FE 2 · BE 1 · 디자이너 1 · AI 3)</M>
              <M k="담당 역할">
                기획 · 설계 · 개발
                <br />
                크레딧 · PG 결제 심사 통과까지 전담
              </M>
            </Meta>
            <Env>
              <E k="언어">TypeScript</E>
              <E k="프레임워크">React · TanStack Query · Jotai · Zod</E>
              <E k="3D · 렌더링">VTK · 웹워커 · BVH / BVVT</E>
              <E k="품질">Vitest · 테스트 자동화</E>
            </Env>
            <Wins
              items={[
                "의료 3D LRU 암호화 캐싱",
                "충돌 감지 렌더링 최적화",
                "테스트 기반 기능 개선",
              ]}
            />
          </Col>
          <Col>
            <Figures
              items={[
                {
                  img: "realteeth-inner-value",
                  alt: "보철물 내면값 설정 화면",
                  caption: "보철물 내면값 설정 — 파라미터 조정과 3D 프리뷰",
                  priority: true,
                },
                {
                  img: "realteeth-scan-list",
                  alt: "스캔 모델 조회 화면",
                  caption: "스캔 모델 조회 — 상악 · 하악 · 지대치 · 크라운 관리",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 03 — 의료 3D 스캔 데이터 로컬 LRU 캐싱 ---------------------- */
  {
    id: "case-cache",
    section: "projects",
    caption: "통신 리소스 75%↓ · 모델 로드 30% 단축한 로컬 캐싱 설계",
    content: (
      <>
        <CaseHead
          context={RT_CTX}
          title="의료 3D 스캔 데이터 로컬 LRU 캐싱"
          tags={["상태관리", "IndexedDB 캐싱", "암호화"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                용량이 큰 의료 3D 스캔 파일을 조회할 때마다 서버에서 다시
                내려받아 통신 비용과 서버 자원 소모가 컸습니다.
              </PB>
              <PB label="판단">
                의료 데이터는 민감한 정보이기 때문에, <b>성능과 보안을 신경
                써야</b> 합니다. 또한 기공사가 하루에 처리하는 프로젝트 수를
                고려하여 적절한 크기로 데이터를 캐싱해서 사용자의 자원을
                효율적으로 써야 합니다.
              </PB>
              <PB label="해결">
                스캔 데이터를 <b>암호화해 IndexedDB에 저장</b>하고 <b>LRU
                정책</b>으로 캐시 용량을 관리하도록 설계했으며, 업로드 · 프리뷰
                유저 플로우와 상태 관리까지 함께 설계했습니다.
              </PB>
              <PB label="결과">
                <Bullets
                  items={[
                    <>
                      통신하는 파일 리소스 <mark>75% 이상 감소</mark>(평균 약
                      20MB 감소)
                    </>,
                    <>
                      모델 로드 시간 <mark>30% 단축</mark>
                    </>,
                    "OS 파일시스템을 통한 모델 파일 열람 차단",
                  ]}
                />
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "realteeth-scan-list",
                  alt: "스캔 모델 조회 화면",
                  caption: "스캔 모델 조회 — 상악 · 하악 · 지대치 · 크라운 관리",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 04 — CAD 에디터 성능 최적화 --------------------------------- */
  {
    id: "case-collision",
    section: "projects",
    caption: "워커풀 병렬 연산으로 실시간 충돌 시각화 3배 개선",
    content: (
      <>
        <CaseHead
          context={RT_CTX}
          title="CAD 에디터 성능 최적화 — 충돌 감지 렌더링"
          tags={["웹워커", "웹 쓰레드 워커풀", "병렬 연산"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                3D 메시 변형 이벤트가 초당 수십 번 발생하는데, 매 이벤트마다
                충돌 감지 같은 무거운 연산을 수행하면 에디터 성능이 저하됐습니다.
              </PB>
              <PB label="판단">
                ① 연산 경량화(알고리즘) ② 메인 스레드 분리(웹워커) ③ 불필요 연산
                제거(요청 큐)로 최적화하고, 웹워커 분산 시 <b>여러 스레드 결과를
                하나의 화면으로 병합하는 문제</b>까지 풀어야 한다고 판단했습니다.
              </PB>
              <PB label="해결">
                <b>BVH · BVVT</b>로 충돌 감지 연산을 최적화하고 무거운 연산을
                웹워커에 분산, 각 스레드 결과를 병합해 렌더링했습니다. 연산 중 새
                이벤트는 <b>최신 요청만 큐에 유지</b>하고 이전 요청은 폐기해 중간
                연산을 제거했습니다.
              </PB>
              <PB label="결과">
                <Bullets
                  items={[
                    "메인 스레드 차단으로 인한 성능 저하 제거",
                    <>
                      병렬 연산으로 실시간 충돌 시각화 성능 개선 (
                      <mark>3배 속도 개선</mark>)
                    </>,
                  ]}
                />
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "realteeth-collision",
                  alt: "모델 간 충돌 감지 히트맵 시각화",
                  caption: "모델 간 충돌 감지 히트맵 시각화",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 05 — 정답이 없는 기능의 출시 기준 --------------------------- */
  {
    id: "case-release-criteria",
    section: "projects",
    caption: "정답이 없는 기능에 목표 → 자동 측정 → 출시 판단 체계를 만들다",
    content: (
      <>
        <CaseHead
          context={RT_CTX}
          title="정답이 없는 기능의 출시 기준 정의 — 보철물 내면값 설정"
          tags={["품질 기준 설계", "테스트 자동화", "성과 측정"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                보철물 내면값 기능 개발이 잘 되었는지에 대한 평가 기준/방법이
                없어서 개선을 해도 개선 여부를 판단할 수 없었습니다. 이는 기능
                구현이 끝나는 기준이 없어 일정 관리를 하는데 있어서도 문제를
                야기했습니다.
              </PB>
              <PB label="판단">
                내면값 기능 개발 진행률과 품질에 대한 <b>기준이 필요하다</b>고
                생각했으며, 이를 기반으로 진척률을 공유하고 기능을 개선하기로
                했습니다.
              </PB>
              <PB label="해결">
                출시 기준을 <b>수치화해 테스트 코드로</b> 만들었습니다. 안정성 ·
                품질 관련 평가 및 기준을 코드로 만들고, 조건과 케이스별 테스트를
                자동화하여 개선 정도를 측정했습니다.
              </PB>
              <PB label="결과">
                <Bullets
                  items={[
                    "내면값 기능 성능 측정 기준 수립 및 수치에 의한 객관적인 성과 공유",
                    <>
                      극한값 적용 시 메시 스파이크 생성률 <mark>97% 개선</mark>
                    </>,
                    <>
                      극한값 적용 시 메시 품질 <mark>20% 개선</mark>
                    </>,
                  ]}
                />
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "realteeth-inner-value",
                  alt: "보철물 내면값 설정 화면",
                  caption:
                    "보철물 내면값 설정 — 최소 두께 · 시멘트 높이 · 밀링 툴 반지름 등 파라미터 조정",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 06 — 리얼티쓰 그 외 ----------------------------------------- */
  {
    id: "realteeth-etc",
    section: "projects",
    caption: "제작 프로세스 기획 · 자동 매핑 · 테스트 유틸 · i18n 자동화",
    content: (
      <>
        <PlainHead
          context={RT_CTX}
          title="그 외 문제 해결"
          sub="기획 · UX · 팀 생산성 영역에서 함께 풀어낸 문제들"
        />
        <Cards cols={2}>
          <Card
            title="다중 보철물 제작 프로세스 기획"
            tag="기획 · 도메인 추상화 · undo/redo 설계"
            result="단일 → 다중 보철물 생성을 구현까지 완료, 이후 설계가 다중 구조를 전제로 일관되게 이어질 기반 마련"
          >
            <b>다중 구조가 전제되지 않으면 이후 설계 전체가 구조적 부채가 된다</b>고
            판단해, undo/redo의 설계·개념화부터 직접 기획하고 어려운 도메인 개념을
            팀 공용어로 추상화했습니다.
          </Card>
          <Card
            title="치아번호 × 스캔 파일 자동 매핑"
            tag="3D 좌표 분석 · UX 개선 · 직접 제안"
            result="수동 매핑 단계를 제거해 반복 작업과 실수 가능성을 없애고 UX를 크게 개선"
          >
            <b>3D 스캔 파일에 이미 담긴 상대 좌표</b>를 분석하면 사용자가 하던
            매핑을 시스템이 대신할 수 있다고 판단해, 자동 매핑 방식을 직접 제안하고
            구현했습니다.
          </Card>
          <Card
            title="통합 테스트 유틸 구축"
            tag="Vitest · 팀 생산성 · 진입 장벽"
            result="통합 테스트 작성의 진입 장벽을 낮추고 팀 테스트 코드의 일관성을 확보"
          >
            <b>테스트가 안 쓰이는 원인은 의지가 아니라 세팅 비용</b>이라고 보고,
            Provider를 한 번에 감싸 제공하되 상황에 따라 선택해 쓸 수 있는 유틸을
            Vitest 기반으로 구축했습니다.
          </Card>
          <Card
            title="i18n 반영 자동화"
            tag="Source of Truth · 협업 자동화"
            result="수작업 반영과 반복 확인 요청이 줄어 소통 비용을 절감하고 반영 누락을 방지"
          >
            <b>원본을 하나로 정하고 나머지 반영은 자동화</b>해야 누락이 구조적으로
            사라진다고 판단해, 엑셀로 일원화하고 Google Cloud로 피그마·코드 반영을
            반자동화했습니다.
          </Card>
        </Cards>
        <Strip k="그 외 성과">
          크레딧 기획 개선 · PG 환금성 상품 결제 연동(결제 심사 통과까지 전담) ·
          에러 핸들링 계층 · DTO·Entity 분리로 팀 멘탈 모델 일치화 · 파일명 유사도
          기반 스캔 파일 분류 및 슬롯 기반 D&amp;D 개발
        </Strip>
      </>
    ),
  },

  /* 07 — 블로그 개요 -------------------------------------------- */
  {
    id: "blog-overview",
    section: "projects",
    caption: "개인 블로그 — 1인 풀스택 개발 · 운영 개요",
    content: (
      <>
        <ProjectHead
          icon="blog"
          name="개인 블로그"
          desc={["Next.js + Spring Boot 기반", "커스텀 에디터 블로그"]}
        />
        <Split>
          <Col>
            <Service
              href="https://yooncarrot.com"
              note={
                <a href={BLOG_APP_URL} target="_blank" rel="noreferrer">
                  안드로이드 앱(YoonCarrot)
                </a>
              }
            >
              yooncarrot.com
            </Service>
            <Meta>
              <M k="개발 기간">2025.01 ~ 운영 중</M>
              <M k="플랫폼">Web + WebView 안드로이드 앱 (YoonCarrot)</M>
              <M k="개발 인원">1인 풀스택</M>
              <M k="담당 역할">설계 · 개발 · 인프라 운영 · CI/CD</M>
            </Meta>
            <Env>
              <E k="프론트">Next.js 16 · React · Turborepo · pnpm</E>
              <E k="백엔드">Spring Boot · MySQL · Redis</E>
              <E k="인프라">AWS(EC2 · S3) · Docker · Nginx · Vercel</E>
              <E k="CI / CD">GitHub · Jenkins · GPG</E>
              <E k="에디터">Tiptap · ProseMirror</E>
              <E k="품질">Lighthouse · OWASP ZAP · Sentry · GA4</E>
            </Env>
            <Wins
              items={[
                "크로스탭 상태관리 훅",
                "Tiptap HTML 단일 저장",
                "ISR→PPR 캐싱 전환",
              ]}
            />
          </Col>
          <Col>
            <Figures
              items={[
                {
                  img: "blog-architecture",
                  alt: "서비스 아키텍처",
                  caption:
                    "서비스 아키텍처 — Vercel · Next.js / EC2 · Docker(Nginx · Spring · Redis · MySQL) / GitHub → Jenkins CI · CD",
                  priority: true,
                },
                {
                  img: "blog-store",
                  alt: "Google Play 에 등록한 YoonCarrot 앱",
                  caption: "Google Play 등록 — YoonCarrot (WebView 안드로이드 앱)",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 08 — 크로스 탭 상태 관리 훅 --------------------------------- */
  {
    id: "case-cross-tab",
    section: "projects",
    caption: "BroadcastChannel · useSyncExternalStore · localStorage를 한 훅으로",
    content: (
      <>
        <CaseHead
          context={BLOG_CTX}
          title="크로스 탭 상태 관리 훅 — useSyncLocalStorage"
          tags={["상태관리", "React 외부 스토어 연동", "BroadcastChannel"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                SSR에서 첫 렌더링에 사용자 설정에 맞는 디자인을 보여주지 못하고
                FOUC를 일으켜, script 태그와 localStorage를 통해 사용자 설정과
                일치하는 화면을 보여주도록 변경했습니다. 하지만 구현한 커스텀
                팔레트가 <b>해당 탭에만 반영되고 다른 탭에는 반영되지 않아</b>{" "}
                상태가 꼬이는 경우가 발생했습니다.
              </PB>
              <PB label="판단">
                React의 라이프사이클에서 벗어나 사용자 설정에 맞는 디자인을 먼저
                그려 FOUC를 막으면서, 하이드레이션 시에 React 상태 관리와 사용자
                설정이 <b>서로 동기화</b>되도록 해야 했습니다.
              </PB>
              <PB label="해결">
                BroadcastChannel · useSyncExternalStore · localStorage를 결합한{" "}
                <b>useSyncLocalStorage 공통 훅</b>을 구현하고, 현재 탭과 다른 탭의
                업데이트 경로를 분리하면서 하나의 인터페이스로 쓸 수 있게
                설계했습니다.
              </PB>
              <PB label="결과">
                SSR 환경에서 여러 탭이 열려 있어도 React 렌더링 사이클에 반영되는
                재사용 가능한 훅을 만들었습니다.
              </PB>
              <PB label="회고">
                이후 Jotai atomWithStorage의 storage.subscribe 옵션이 외부
                스토리지 변경 구독을 지원한다는 것을 알게 됐습니다. 다만 storage
                이벤트는 localStorage 전용이고 변경을 일으킨 탭에서는 발생하지
                않아, BroadcastChannel 기반 직접 구현은 저장소와 무관한 메시지
                전파와 콜백 타이밍 제어가 가능하다는 차이를 이해하게 됐습니다. 이
                경험으로 직접 구현 전에 라이브러리의 기본 제공 기능을 먼저
                검토한다는 기준을 세웠습니다.
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "blog-sync-hook",
                  alt: "useSyncLocalStorage 구현 코드",
                  caption:
                    "구현 코드 — useSyncExternalStore 구독 함수(좌) / 탭 간 상태 전파 setValue(우)",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 09 — Tiptap 커스텀 에디터 ----------------------------------- */
  {
    id: "case-editor",
    section: "projects",
    caption: "ProseMirror 스키마를 재정의해 JSON 중복 저장을 제거",
    content: (
      <>
        <CaseHead
          context={BLOG_CTX}
          title="Tiptap 커스텀 에디터 — HTML 단일 저장 구조"
          tags={["에디터 구조", "ProseMirror 스키마 재정의", "SSR 성능"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                Tiptap 기본 Code Block은 JSON 문서로 저장해야 원하는 UI의 HTML로
                렌더링할 수 있었습니다. 따라서 <b>SSR 시 파서가 필요해 성능에
                불리</b>했습니다.
              </PB>
              <PB label="판단">
                HTML을 그대로 저장 · 렌더링하려면 Tiptap이 아니라 엔진인{" "}
                <b>ProseMirror의 HTML ↔ 상태 변환 방식</b>을 이해해, HTML 주입
                시에도 내부 상태가 일치하도록 만들어야 한다고 판단했습니다.
              </PB>
              <PB label="해결">
                ProseMirror 변환 방식을 분석해 에디터 <b>스키마를 재정의</b>하고,
                HTML 단일 저장으로도 재로드 시 동일 상태를 유지하는 커스텀 Code
                Block 플러그인을 구현했습니다 (Shiki 구문 분석 · 행 넘버링 · 에러
                표시 · 형광펜 지원).
              </PB>
              <PB label="결과">
                JSON 중복 저장을 제거한 <b>HTML 단일 저장 구조</b>로 DB 저장
                효율과 SSR 렌더링 성능을 개선했습니다. (ISR 환경에서 페이지 생성
                속도 <mark>30% 개선</mark>)
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "blog-editor",
                  alt: "커스텀 코드블럭 에디터",
                  caption: "커스텀 코드블럭 에디터",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 10 — ISR → PPR 캐싱 전환 ------------------------------------ */
  {
    id: "case-ppr",
    section: "projects",
    caption: "라우팅 전환 RSC 27.9 kB → 0.4 kB, 리스크를 통제한 점진 전환",
    content: (
      <>
        <CaseHead
          context={BLOG_CTX}
          title="Next.js ISR → PPR 캐싱 전환"
          tags={["캐싱 전략", "성능 최적화", "리스크 관리"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                ISR은 페이지 전체를 캐싱합니다. 따라서 렌더링은 빠르지만 전체
                페이지를 다시 받아오기 때문에 용량이 큽니다. 이에 따라 화면 전환
                시에 <b>렉 걸리는 듯한 느낌</b>을 받는 경우가 종종 생겼습니다.
              </PB>
              <PB label="판단">
                화면 전환 시에 잠깐 멈칫하는 것을 해결하는 방법은 크게 2가지라
                생각했습니다. 페이지를 prefetching 하거나, 페이지 로드 시간을
                줄이는 것입니다. 현재 ISR 방식은 페이지 전환 시마다 전체를
                hydrate 하고 렌더링하는 것이 <b>성능 병목</b>이라 판단했습니다.
              </PB>
              <PB label="해결">
                Layout은 캐싱 · 재사용하고 Page는 스트리밍할 수 있도록 ISR에서
                PPR로 전환하였습니다. Cache Component가 Dynamic Routing에서
                동작하지 않는 버그는 <b>해당 구간만 unstable_cache로 우회</b>해
                리스크를 통제했습니다.
              </PB>
              <PB label="결과">
                <Bullets
                  items={[
                    <>
                      라우팅 전환 시 RSC 크기 <mark>98% 개선</mark>(27.9 kB → 0.4
                      kB)
                    </>,
                    "Lighthouse나 성능 측정 도구로 감지하기 힘든 멈칫하는 UX를 개선했습니다.",
                  ]}
                />
              </PB>
              <PB label="배움">
                최신 기능은 릴리즈 노트뿐 아니라 GitHub Issue · Discussion으로
                실사용 안정성을 먼저 검증해야 한다는 기준을 세웠습니다. 캐싱
                전략처럼 코드 전반에 영향이 퍼지는 마이그레이션은 점진적으로
                전환해야 리스크를 통제할 수 있음을 배웠습니다.
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "blog-rsc",
                  alt: "ISR → PPR 전환 전후 RSC 크기 비교",
                  caption: "ISR → PPR 전환 시 RSC 크기 변화",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 11 — 커스텀 테마 · 디자인 토큰 레이어 ----------------------- */
  {
    id: "case-theme-tokens",
    section: "projects",
    caption: "팔레트 하나만 바꿔도 전체 테마가 일관되게 바뀌는 토큰 구조",
    content: (
      <>
        <CaseHead
          context={BLOG_CTX}
          title="커스텀 테마 — 디자인 토큰 레이어 설계"
          tags={["디자인 시스템", "디자인 토큰", "테마 아키텍처"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                다크/라이트 모드와 퍼스널 팔레트를 저장 · 적용하는 커스텀 테마를
                지원하려면 팔레트 변경만으로 전체 색상이 일관 · 조화롭게 바뀌어야
                하는데, <b>색을 하드코딩하면</b> 테마를 추가 · 수정할 때마다
                광범위한 수정이 필요했습니다.
              </PB>
              <PB label="판단">
                팔레트 하나로 전체가 일관되게 반영되려면 명확한 기준으로 추상화된
                토큰과 레이어 구조가 필요하다고 봤습니다. 코드에서도 일관 관리하려면
                low-semantic 토큰을 넘어 <b>컴포넌트 단위까지 확장된 토큰</b>이
                필요하지만, 너무 추상적이면 오히려 쓰기 불편하고 너무 구체적이면
                재사용이 어렵기 때문에 그 사이의 균형이 중요하다고 봤습니다.
              </PB>
              <PB label="해결">
                각 레이어가 <b>&ldquo;바로 다음 레이어&rdquo;만 참조하는 단방향
                6단계 토큰 구조</b>를 설계했습니다 — 커스텀 팔레트 → 파운데이션 →
                역할 → 컴포넌트 요소 → 컴포넌트 클래스 → 리액트 컴포넌트.
              </PB>
              <PB label="결과">
                <Bullets
                  items={[
                    "팔레트(LAYER 0)만 교체하면 전체 테마가 일관되게 바뀌는 설계",
                    "크리스마스 같은 시즌 테마도 최소 커뮤니케이션 · 코드 변경으로 대응 가능",
                    "단, 토큰 구조가 복잡해 관리 주체가 없으면 유지보수 부담이 커짐",
                  ]}
                />
              </PB>
            </PBlocks>
          </Col>
          <Col>
            <TokenLayers
              title="토큰 레이어 · 단방향 참조 (예: primary 계열)"
              layers={[
                { name: "커스텀 팔레트", token: "#EB752C", swatch: "#EB752C" },
                { name: "파운데이션 토큰", token: "primary-300" },
                { name: "역할(semantic) 토큰", token: "bg-color-primary" },
                { name: "컴포넌트 요소 토큰", token: "button-bg-primary" },
                { name: "컴포넌트 클래스", token: ".button-primary" },
                { name: "리액트 컴포넌트", token: "<Button primary/>" },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 12 — 블로그 그 외 ------------------------------------------- */
  {
    id: "blog-etc",
    section: "projects",
    caption: "SSR FOUC · 실사용자 기준 성능 · 보안 진단",
    content: (
      <>
        <PlainHead
          context={BLOG_CTX}
          title="그 외 문제 해결"
          sub="렌더링 · 성능 · 보안에서 기준을 다시 세운 작업들"
        />
        <Cards cols={3}>
          <Card
            title="SSR FOUC 방지 — 렌더링 시점 제어"
            tag="prerendered HTML · 실행 시점 가로채기"
            result="Hydration 에러와 FOUC 없이 사용자 설정과 일치하는 초기 화면을 제공"
          >
            React 라이프사이클은 hydration 이후라 SSR에서 prerendered HTML이 먼저
            그려집니다. <b>클라이언트가 최초로 보는 HTML을 제어하는 방법은 서버
            분기 또는 실행 시점 가로채기 둘뿐</b>이라 판단해 후자를 선택,
            localStorage + script + suppressHydrationWarning으로 초기 렌더 이전에
            화면을 선조작했습니다.
          </Card>
          <Card
            title="실사용자 기준 성능 · 접근성 · SEO"
            tag="Sentry Web Vitals · Bundle Analyzer"
            result="번들 사이즈와 JS 파일 요청 수를 각각 약 10% 감소 · 목표와 측정 기준을 먼저 세우고 실제 지표로 검증하는 체계를 학습"
          >
            로컬 Lighthouse는 4개 지표 모두 100점에 가까웠지만 Sentry로 확인한
            실사용자 Web Vitals는 전혀 달랐습니다. <b>성능의 기준은 개발자 환경이
            아니라 실사용자 환경</b>이어야 한다고 판단해 지역별 · 디바이스별로 나눠
            측정하고, critical CSS · lazy import · 이미지 최적화로 FCP · LCP를,
            optimizePackageImports로 트리 셰이킹을 개선했습니다.
          </Card>
          <Card
            title="OWASP ZAP 보안 진단 · CSP 설계"
            tag="취약점 개별 판단 · 기능 유지"
            result="기능을 유지하면서 클라이언트에 더 안전한 브라우저 환경을 제공"
          >
            취약점이 라이브러리 의존적이라 설정만 바꿀 수 없었습니다(Shiki는
            wasm-unsafe-eval 필수). <b>양자택일 대신 ① 기능이 정말 필요한가 ②
            악의적 주입이 실제로 가능한 구조인가 ③ 성능 비용은 어떤가</b>로 개별
            판단해, Shiki는 JS 엔진으로 교체하고 inline-script는 주입 통로가 없다고
            판단해 허용하는 등 실제 필요한 영역만 제한하도록 CSP를 설계했습니다.
          </Card>
        </Cards>
      </>
    ),
  },

  /* 13 — Mockly 개요 -------------------------------------------- */
  {
    id: "mockly-overview",
    section: "projects",
    caption: "Mockly — AI 모의 면접 앱 개요",
    content: (
      <>
        <ProjectHead icon="mockly" name="Mockly" desc={["AI 모의 면접 앱"]} />
        <Split>
          <Col>
            <Meta>
              <M k="개발 기간">2025.11 ~ 개발 중</M>
              <M k="플랫폼">App (React Native)</M>
              <M k="개발 인원">2명 (FE 1 · BE 1)</M>
              <M k="담당 역할">기획 · 디자인 · 프론트엔드</M>
            </Meta>
            <Env>
              <E k="프레임워크">React Native 0.82 · Turborepo · pnpm</E>
              <E k="상태 · 검증">TanStack Query · Zod</E>
              <E k="디자인">Storybook · Chromatic</E>
              <E k="결제 · 인증">포트원 (Bill Key 구독) · PKCE</E>
              <E k="도구">Claude Code</E>
            </Env>
            <Wins
              items={[
                "모노레포 설계",
                "PKCE 인증 · 세션 유지",
                "웹 공유형 RN 디자인 시스템",
              ]}
            />
            <Strip k="그 외 성과">
              포트원 라이브러리로 Bill Key 기반 구독형 상품 결제 연동 ·
              다크/라이트 모드 스플래시 화면을 Java 네이티브로 구현하고 React
              브릿지로 RN에서 제어
            </Strip>
          </Col>
          <Col>
            <Figures
              items={[
                {
                  img: "mockly-store",
                  alt: "Google Play 에 등록한 mockly 앱",
                  caption: "Google Play 등록 — mockly · AI 면접 코치",
                  priority: true,
                },
                {
                  img: [
                    "mockly-splash",
                    "mockly-home",
                    "mockly-nearby",
                    "mockly-interview",
                  ],
                  alt: "Mockly 앱 화면 — 스플래시 / 홈 / 동네면접 / 면접 진행",
                  caption: "앱 화면 — 스플래시 / 홈 / 동네면접 / 면접 진행",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 14 — 모노레포 구조 설계 ------------------------------------- */
  {
    id: "case-monorepo",
    section: "projects",
    caption: "Web 확장을 전제로 도메인·API를 독립 패키지로 분리",
    content: (
      <>
        <CaseHead
          context={MK_CTX}
          title="모노레포 구조 설계"
          tags={["패키지 구조화", "클린 아키텍처"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                이전엔 useQuery를 커스텀 훅으로 감싸 DTO와 도메인 개념이
                뒤섞였고, App 레이어가 Backend DTO에 직접 의존해 <b>API 스펙
                변경 시 프론트 전반을 수정</b>해야 했습니다.
              </PB>
              <PB label="판단">
                Web 확장 가능성이 높아 플랫폼과 무관한 Domain · API는 독립
                패키지로 분리해야 하고, 디자인 시스템은 통째로 공유하면 제약이
                커지므로 <b>Foundation · Palette 등 핵심만 core로 분리</b>하기로
                했습니다.
              </PB>
              <PB label="해결">
                Monorepo 구조를 활용하였고, Adapter 패턴처럼 API 레이어에서{" "}
                <b>DTO → Domain Entity 변환 책임</b>을 분리하며 App은 Domain
                Entity만 바라보게 규칙화, Turborepo + pnpm으로 domain / api /
                design-system-core / utils를 독립 패키지로 분리했습니다.
              </PB>
              <PB label="결과">
                Backend DTO 의존성이 API 레이어로 한정돼 유지보수성 · 구조적
                일관성이 개선됐고, Web 확장에도 재사용 가능한 구조를
                확보했습니다.
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "mockly-monorepo",
                  alt: "모노레포 패키지 구조",
                  caption:
                    "모노레포 구조 — Apps(App · Storybook) / Packages(api · domain · design-system · utils · tsconfig)",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 15 — PKCE 인증과 세션 유지 ---------------------------------- */
  {
    id: "case-auth",
    section: "projects",
    caption: "토큰 갱신을 최초 401 하나로 고정해 경쟁 상태를 제거",
    content: (
      <>
        <CaseHead
          context={MK_CTX}
          title="PKCE 인증과 세션 유지"
          tags={["인증 설계", "동시성 제어"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                인증 데이터 관리가 웹 · 앱에서 다르고 Provider마다 플로우가
                상이했으며, 여러 요청이 동시에 401을 반환하면 각자 토큰 갱신을
                시도해 <b>중복 갱신 · 경쟁 상태</b>가 발생할 수 있었습니다.
              </PB>
              <PB label="판단">
                디바이스 의존성은 웹 localStorage 인터페이스 기준으로 추상화해
                플랫폼 차이를 캡슐화하고, 토큰 갱신은 <b>&ldquo;누가
                갱신하는가&rdquo;를 최초 401 하나로 고정</b>해야 경쟁 상태가
                구조적으로 사라진다고 판단했습니다.
              </PB>
              <PB label="해결">
                앱에선 MMKV · KeyChain을 쓰되 외부에는 동일한 localStorage
                인터페이스로 접근하도록 캡슐화하고 Provider 차이는{" "}
                <b>BaseAuthService</b>로 해결, 토큰 갱신은 최초 401에만 트리거하고
                갱신 중 요청은 <b>Promise Queue</b>에 보관 후 일괄 재요청하도록
                설계했습니다.
              </PB>
              <PB label="결과">
                새 Auth Provider가 추가돼도 기존 Auth 코드 수정 없이 확장되고,
                토큰 갱신 중에도 요청 유실 없이 끊김 없는 세션을 유지했습니다.
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <Figures
              items={[
                {
                  img: "mockly-auth",
                  alt: "PKCE 인증 시퀀스 다이어그램",
                  caption: "PKCE 인증 · 토큰 갱신 시퀀스",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 16 — 웹에서도 확인 가능한 RN 디자인 시스템 ------------------ */
  {
    id: "case-design-system",
    section: "projects",
    caption: "확인 환경 자체를 웹으로 옮겨 공유 문제를 해결",
    content: (
      <>
        <CaseHead
          context={MK_CTX}
          title="웹에서도 확인 가능한 RN 디자인 시스템"
          tags={["디자인 시스템", "협업 공유"]}
        />
        <Split>
          <Col>
            <PBlocks>
              <PB label="문제">
                React Native 앱은 기기나 에뮬레이터 없이는 디자인을 확인하기
                어려워 공유가 번거로웠고, 컴포넌트를 체계 없이 만들면 화면이
                늘어날수록 <b>재사용 · 일관성 유지가 어려웠</b>습니다.
              </PB>
              <PB label="판단">
                파운데이션(컬러 · 타이포그래피)부터 애니메이션까지 단계적으로
                컴포넌트화해야 재사용 · 조합이 가능하고, <b>확인 환경 자체를
                웹으로 옮겨야</b> 공유 문제가 근본적으로 해결된다고 판단했습니다.
              </PB>
              <PB label="해결">
                단계적 컴포넌트화로 디자인 시스템을 구축하고 Storybook으로
                문서화, <b>react-native-web</b>으로 앱 환경 없이 웹 브라우저만으로
                모바일 디자인을 그대로 확인할 수 있게 만들어 Chromatic으로
                배포했습니다.
              </PB>
              <PB label="결과">
                웹 링크 하나로 디자인 시스템과 앱 화면을 공유 · 확인할 수 있게
                됐고, 컴포넌트 재사용 · 조합으로 화면 개발의 일관성과 속도를
                확보했습니다.
              </PB>
            </PBlocks>
          </Col>
          <Col center>
            <LinkOut href={STORYBOOK_URL}>스토리북 보러가기</LinkOut>
            <Figures
              items={[
                {
                  img: "mockly-design-system",
                  alt: "Storybook으로 배포한 RN 디자인 시스템",
                  caption:
                    "Storybook · Chromatic 배포 — 웹에서 확인하는 RN 디자인 시스템",
                },
              ]}
            />
          </Col>
        </Split>
      </>
    ),
  },

  /* 17 — 기타 프로젝트 ------------------------------------------ */
  {
    id: "career-etc",
    section: "etc",
    caption: "티맥스 비아이 · SSAFY · 학력 및 자격증",
    content: (
      <>
        <ProjectHead icon="etc" name="기타 프로젝트" desc={["그 외 경력 · 교육"]} />
        <Split variant="even">
          <ExpCard
            icon="tmax"
            org="티맥스 비아이"
            role="프론트엔드 연구원  ·  2023.07 ~ 2024.12"
          >
            <Work
              name="FOCUS E-Commerce / CRM"
              items={[
                "설계 단계부터 참여해 상품 · 제품 도메인 담당 — 가격 정책 설계 및 구현",
                "상품 유형과 입력값에 따라 동적으로 생성되는 Form 상태 필드 관리 기능 설계 · 구현",
                "비즈니스 로직을 반영한 엑셀 UI 기반 대용량 상품 관리 및 공통 컴포넌트 구현",
              ]}
            />
            <Work
              name="농어촌공사 민원 IMS"
              items={[
                "로직과 UI를 분리하는 Headless · RenderProps 패턴으로 디자인 시스템 공통 컴포넌트 설계",
                "드래그 앤 드롭 기반 민원 유형 순서 편집, 민원 종류별 Form · 공통 Validator · Formatter 구현",
                "데이터 시각화를 위한 민원 통계 API 공통 형식 설계 및 데이터 전처리",
              ]}
            />
          </ExpCard>

          <ExpCard
            icon="ssafy"
            org="SSAFY 8기"
            role="삼성 청년 SW 아카데미  ·  2022.07 ~ 2023.06"
          >
            <Work
              name="총 1,600시간 · 6인 팀 프로젝트 3건"
              items={[
                <>
                  <b>Luck Quiz (BE)</b> — WebSocket · Redis · Kafka로 실시간 퀴즈의
                  대용량 트랜잭션 · 점수 · 랭킹 · 세션 관리, EC2 3대 분리 운영
                </>,
                <>
                  <b>Constelink (풀스택)</b> — Web3 · MetaMask · 이더리움 스마트
                  컨트랙트 생성 및 지갑 연동, Spring Boot 백엔드 학습 · 적용
                </>,
                <>
                  <b>MPTI (FE)</b> — WebRTC 기반 트레이너 매칭 · 화상 PT 서비스
                  프론트엔드 개발
                </>,
              ]}
            />
          </ExpCard>
        </Split>
        <Strip k="학력 · 자격증">
          성균관대학교 화학공학과 (2015.03 ~ 2019.02) · 의무경찰 병장 만기 전역
          (2019.08 ~ 2021.03) · 정보처리기사(2024) · 화공기사(2021) ·
          한국사능력검정 1급(2020)
        </Strip>
      </>
    ),
  },
];

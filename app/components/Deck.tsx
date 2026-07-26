"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { SECTIONS, SLIDES } from "@/app/data/slides";

const ChevronLeft = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Deck() {
  const [idx, setIdx] = useState(0);
  const last = SLIDES.length - 1;

  const go = useCallback(
    (next: number) => setIdx(Math.max(0, Math.min(last, next))),
    [last],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          setIdx((i) => Math.min(last, i + 1));
          break;
        case "ArrowLeft":
        case "PageUp":
          setIdx((i) => Math.max(0, i - 1));
          break;
        case "Home":
          setIdx(0);
          break;
        case "End":
          setIdx(last);
          break;
        default:
          return;
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  const slide = SLIDES[idx];

  return (
    <div className="stage">
      <div className="deck">
        <div className="slide">
          <nav className="topnav" aria-label="섹션">
            {SECTIONS.map((s) => {
              const target = SLIDES.findIndex((sl) => sl.section === s.id);
              const on = slide.section === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={on ? "tab on" : "tab"}
                  aria-current={on ? "true" : undefined}
                  onClick={() => go(target)}
                >
                  {s.label}
                  <span className="bar" />
                </button>
              );
            })}
          </nav>

          <div className="body">
            <section key={slide.id} className="panel" aria-label={slide.caption}>
              {slide.content}
            </section>
          </div>

          <div className="foot">
            <span className="foot-cap">{slide.caption}</span>
            <div className="nav-btns">
              <button
                type="button"
                className="ctrl"
                onClick={() => go(idx - 1)}
                disabled={idx === 0}
                aria-label="이전 슬라이드"
              >
                {ChevronLeft}
              </button>
              <span className="count">
                {idx + 1} / {SLIDES.length}
              </span>
              <button
                type="button"
                className="ctrl"
                onClick={() => go(idx + 1)}
                disabled={idx === last}
                aria-label="다음 슬라이드"
              >
                {ChevronRight}
              </button>
            </div>
          </div>
        </div>

        <div className="dots" role="tablist" aria-label="슬라이드">
          {SLIDES.map((s, i) => (
            <Fragment key={s.id}>
              {/* 섹션이 바뀌는 자리에 여백을 둔다. */}
              {i > 0 && s.section !== SLIDES[i - 1].section && (
                <span className="dot-gap" aria-hidden />
              )}
              <button
                type="button"
                role="tab"
                className={i === idx ? "dot on" : "dot"}
                aria-selected={i === idx}
                aria-label={`${i + 1}. ${s.caption}`}
                title={`${i + 1}. ${s.caption}`}
                onClick={() => go(i)}
              />
            </Fragment>
          ))}
        </div>

        <p className="hint">
          <kbd>←</kbd> <kbd>→</kbd> 방향키 또는 아래 점으로 슬라이드를 넘길 수
          있습니다.
        </p>
      </div>
    </div>
  );
}

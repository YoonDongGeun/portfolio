'use client';

import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description?: string;
}

interface Feature {
  title: string;
  description: string;
  images: string[];
  codeSnippets?: CodeSnippet[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    description: string;
    longDescription: string;
    period: string;
    team: string;
    role: string;
    technologies: string[];
    achievements: string[];
    challenges: string[];
    links: {
      demo?: string;
      github?: string;
    };
    architecture?: string[];
    features?: Feature[];
    images?: (string)[];
    codeSnippets?: CodeSnippet[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedArchitectureIndex, setSelectedArchitectureIndex] = useState(0);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(typeof project?.features?.length === 'number'?0:null);
  const [selectedFeatureImageIndex, setSelectedFeatureImageIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [enlargedImageContext, setEnlargedImageContext] = useState<{
    type: 'architecture' | 'project' | 'feature';
    images: string[];
    currentIndex: number;
  } | null>(null);
  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';

    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // 이미지가 변경될 때 스케일과 위치 초기화
  useEffect(() => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  }, [enlargedImage]);

  // 다음/이전 이미지로 이동하는 함수
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!enlargedImageContext) return;

    const { type, images, currentIndex } = enlargedImageContext;
    let newIndex: number;

    if (direction === 'next') {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    }

    // 이미지 업데이트
    setEnlargedImage(images[newIndex]);
    setEnlargedImageContext({
      ...enlargedImageContext,
      currentIndex: newIndex
    });

    // 해당하는 섹션의 인덱스도 업데이트
    if (type === 'architecture') {
      setSelectedArchitectureIndex(newIndex);
    } else if (type === 'project') {
      setSelectedImageIndex(newIndex);
    } else if (type === 'feature') {
      setSelectedFeatureImageIndex(newIndex);
    }
  };

  // 스와이프 감지
  const handleSwipe = (startX: number, endX: number) => {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 -> 다음 이미지
        navigateImage('next');
      } else {
        // 오른쪽으로 스와이프 -> 이전 이미지
        navigateImage('prev');
      }
    }
  };

  if (!isOpen || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <style jsx>{`
          .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
          }
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 3px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.7);
          }
        `}</style>
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-6 z-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-white/70 mb-2">{project.description}</p>
              <p className="text-blue-400 text-sm font-medium">{project.period}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 기능별 바로가기 버튼 */}
          {project.features && project.features.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white/60 text-sm mr-2">바쁘면 기능 바로 보기&nbsp;&nbsp; =&gt;</span>
              {project.features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const featuresSection = document.getElementById('features-section');
                    const scrollContainer = featuresSection?.closest('.overflow-y-auto');
                    if (featuresSection && scrollContainer) {
                      const sectionTop = featuresSection.offsetTop;
                      const headerHeight = 120; // sticky header 높이
                      const targetPosition = sectionTop - headerHeight;

                      scrollContainer.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                      setSelectedFeatureIndex(index);
                      setSelectedFeatureImageIndex(0);
                    }
                  }}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs transition-colors"
                >
                  {feature.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-y-auto custom-scroll max-h-[calc(90vh-120px)] pb-4">
          <div className="p-6 space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">프로젝트 개요</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">기간</h4>
                <p className="text-white/80">{project.period}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">팀 구성</h4>
                <p className="text-white/80">{project.team}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">담당 역할</h4>
              <p className="text-white/80">{project.role}</p>
            </div>
            </section>
            {/* 아키텍처 */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">아키텍처</h3>
            {project.architecture && project.architecture.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="w-full min-h-[400px] flex items-center justify-center">
                    <img
                      src={project.architecture[selectedArchitectureIndex]}
                      alt={`${project.title} 아키텍처 ${selectedArchitectureIndex + 1}`}
                      className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        setEnlargedImage(project.architecture![selectedArchitectureIndex]);
                        setEnlargedImageContext({
                          type: 'architecture',
                          images: project.architecture!,
                          currentIndex: selectedArchitectureIndex
                        });
                      }}
                    />
                  </div>
                </div>
                {project.architecture.length > 1 && (
                  <div className="flex gap-2 justify-center flex-wrap">
                    {project.architecture.map((architecture, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedArchitectureIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedArchitectureIndex === index
                            ? 'border-blue-400 scale-105'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={architecture}
                          alt={`아키텍처 썸네일 ${index + 1}`}
                          className="w-full h-full object-cover bg-white"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-8 border-2 border-dashed border-white/20 text-center">
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-white/70 text-sm">
                    비밀유지서약서로 인해<br />
                    아키텍처 정보를 공개할 수 없습니다
                  </p>
                </div>
              </div>
            )}
          </section>

          {project.images && project.images.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">프로젝트 이미지</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-full min-h-[400px] flex items-center justify-center">
                    <img
                      src={project.images[selectedImageIndex]}
                      alt={`${project.title} 스크린샷 ${selectedImageIndex + 1}`}
                      className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        setEnlargedImage(project.images![selectedImageIndex]);
                        setEnlargedImageContext({
                          type: 'project',
                          images: project.images!,
                          currentIndex: selectedImageIndex
                        });
                      }}
                    />
                  </div>
                </div>
                {project.images.length > 1 && (
                  <div className="flex gap-2 justify-center flex-wrap">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-blue-400 scale-105'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`썸네일 ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading='lazy'
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
            )}
            
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">상세 설명</h3>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/80 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">사용 기술</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.achievements.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">주요 성과</h3>
              <div className="bg-white/5 rounded-lg p-6">
                <ul className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="text-white/80 flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {project.challenges.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">기술적 도전과 해결</h3>
              <div className="bg-white/5 rounded-lg p-6">
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-white/80 flex items-start gap-3">
                      <span className="text-orange-400 mt-1">⚡</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}


          {project.features && project.features.length > 0 && (
            <section id="features-section" className='pb-8'>
              <h3 className="text-xl font-semibold text-white mb-4">주요 기능</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedFeatureIndex(selectedFeatureIndex === index ? null : index)
                        setSelectedFeatureImageIndex(0) // 기능 변경 시 이미지 인덱스 초기화
                      }}
                      className={`p-4 rounded-lg text-left transition-all ${
                        selectedFeatureIndex === index
                          ? 'bg-blue-600/30 border border-blue-400'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                      <p className="text-white/70 text-sm line-clamp-2">{feature.description}</p>
                    </button>
                  ))}
                </div>

                {selectedFeatureIndex !== null && (
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-6">
                    <div className={`grid gap-6 ${project.features[selectedFeatureIndex].images && project.features[selectedFeatureIndex].images.length > 0 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-3">
                          {project.features[selectedFeatureIndex].title}
                        </h4>
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                          {project.features[selectedFeatureIndex].description}
                        </p>
                      </div>
                      {project.features[selectedFeatureIndex].images && project.features[selectedFeatureIndex].images.length > 0 && (
                        <div className="space-y-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="w-full h-48 flex items-center justify-center">
                              <img
                                src={project.features[selectedFeatureIndex].images[selectedFeatureImageIndex]}
                                alt={`${project.features[selectedFeatureIndex].title} 스크린샷 ${selectedFeatureImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => {
                                  setEnlargedImage(project.features![selectedFeatureIndex!].images[selectedFeatureImageIndex]);
                                  setEnlargedImageContext({
                                    type: 'feature',
                                    images: project.features![selectedFeatureIndex!].images,
                                    currentIndex: selectedFeatureImageIndex
                                  });
                                }}
                              />
                            </div>
                          </div>
                          {project.features[selectedFeatureIndex].images.length > 1 && (
                            <div className="flex gap-2 justify-center flex-wrap">
                              {project.features[selectedFeatureIndex].images.map((image, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSelectedFeatureImageIndex(index)}
                                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedFeatureImageIndex === index
                                      ? 'border-blue-400 scale-105'
                                      : 'border-white/20 hover:border-white/40'
                                  }`}
                                >
                                  <img
                                    src={image}
                                    alt={`썸네일 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {project.features[selectedFeatureIndex].codeSnippets && project.features[selectedFeatureIndex].codeSnippets!.length > 0 && (
                      <div className="space-y-6">
                        {project.features[selectedFeatureIndex].codeSnippets!.map((codeSnippet, codeIndex) => (
                          <div key={codeIndex} className="bg-white/10 rounded-lg overflow-hidden">
                            <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                              <h5 className="text-white font-medium">{codeSnippet.title}</h5>
                              {codeSnippet.description && (
                                <p className="text-white/70 text-sm mt-1">{codeSnippet.description}</p>
                              )}
                            </div>
                            <div className="relative">
                              <SyntaxHighlighter
                                language={codeSnippet.language}
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  background: 'transparent',
                                  fontSize: '14px',
                                }}
                                showLineNumbers
                              >
                                {codeSnippet.code}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {project.codeSnippets && project.codeSnippets.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">주요 코드</h3>
              <div className="space-y-6">
                {project.codeSnippets.map((snippet, index) => (
                  <div key={index} className="bg-white/5 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                      <h4 className="text-white font-medium">{snippet.title}</h4>
                      {snippet.description && (
                        <p className="text-white/70 text-sm mt-1">{snippet.description}</p>
                      )}
                    </div>
                    <div className="relative">
                      <SyntaxHighlighter
                        language={snippet.language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          background: 'transparent',
                          fontSize: '14px',
                        }}
                        showLineNumbers
                      >
                        {snippet.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* {(project.links.demo || project.links.github) && (
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">링크</h3>
              <div className="flex gap-4">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    데모 보기
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/30 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </section>
          )} */}
          </div>

          {/* 스크롤 그라데이션 인디케이터 */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/95 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => {
            setEnlargedImage(null);
            setEnlargedImageContext(null);
            setImageScale(1);
            setImagePosition({ x: 0, y: 0 });
          }}
        >
          <div
            className="relative flex items-center justify-center bg-white rounded-lg p-4 overflow-hidden transition-all duration-200"
            style={{
              width: `${Math.min(50 + (imageScale - 1) * 30, 95)}vw`,
              height: `${Math.min(50 + (imageScale - 1) * 30, 95)}vh`,
              maxWidth: '95vw',
              maxHeight: '95vh'
            }}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              const newScale = Math.min(Math.max(imageScale + delta, 0.5), 3);
              setImageScale(newScale);

              // 스케일이 1.0 이하가 되면 위치 초기화
              if (newScale <= 1.0) {
                setImagePosition({ x: 0, y: 0 });
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center w-full h-full relative overflow-hidden"
              onMouseDown={(e) => {
                if (imageScale > 1) {
                  setIsDragging(true);
                  setDragStart({
                    x: e.clientX - imagePosition.x,
                    y: e.clientY - imagePosition.y
                  });
                } else {
                  setSwipeStart({ x: e.clientX, y: e.clientY });
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && imageScale > 1) {
                  setImagePosition({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                  });
                }
              }}
              onMouseUp={(e) => {
                if (isDragging) {
                  setIsDragging(false);
                } else if (swipeStart && imageScale <= 1) {
                  handleSwipe(swipeStart.x, e.clientX);
                  setSwipeStart(null);
                }
              }}
              onMouseLeave={() => {
                setIsDragging(false);
                setSwipeStart(null);
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                if (imageScale > 1) {
                  setIsDragging(true);
                  setDragStart({
                    x: touch.clientX - imagePosition.x,
                    y: touch.clientY - imagePosition.y
                  });
                } else {
                  setSwipeStart({ x: touch.clientX, y: touch.clientY });
                }
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (isDragging && imageScale > 1) {
                  setImagePosition({
                    x: touch.clientX - dragStart.x,
                    y: touch.clientY - dragStart.y
                  });
                }
              }}
              onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                if (isDragging) {
                  setIsDragging(false);
                } else if (swipeStart && imageScale <= 1) {
                  handleSwipe(swipeStart.x, touch.clientX);
                  setSwipeStart(null);
                }
              }}
            >
              {/* 이전 이미지 미리보기 */}
              {enlargedImageContext && enlargedImageContext.images.length > 1 && imageScale <= 1 && (
                <div className="absolute left-0 top-0 h-full w-32 flex items-center justify-start pl-4 opacity-60 pointer-events-none z-0">
                  <img
                    src={enlargedImageContext.images[
                      enlargedImageContext.currentIndex > 0
                        ? enlargedImageContext.currentIndex - 1
                        : enlargedImageContext.images.length - 1
                    ]}
                    alt="이전 이미지"
                    className="max-h-[80%] max-w-full object-contain rounded-lg shadow-lg filter brightness-75"
                  />
                </div>
              )}

              {/* 메인 이미지 */}
              <img
                src={enlargedImage}
                alt="확대된 이미지"
                className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl z-20 relative ${
                  !isDragging ? 'transition-transform duration-200' : ''
                } ${
                  imageScale > 1 ? 'cursor-grab' : 'cursor-default'
                } ${isDragging ? 'cursor-grabbing' : ''}`}
                style={{
                  transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                  transformOrigin: 'center'
                }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />

              {/* 다음 이미지 미리보기 */}
              {enlargedImageContext && enlargedImageContext.images.length > 1 && imageScale <= 1 && (
                <div className="absolute right-0 top-0 h-full w-32 flex items-center justify-end pr-4 opacity-60 pointer-events-none z-0">
                  <img
                    src={enlargedImageContext.images[
                      enlargedImageContext.currentIndex < enlargedImageContext.images.length - 1
                        ? enlargedImageContext.currentIndex + 1
                        : 0
                    ]}
                    alt="다음 이미지"
                    className="max-h-[80%] max-w-full object-contain rounded-lg shadow-lg filter brightness-75"
                  />
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setEnlargedImage(null);
                setEnlargedImageContext(null);
                setImageScale(1);
                setImagePosition({ x: 0, y: 0 });
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 이미지 카운터 */}
            {enlargedImageContext && enlargedImageContext.images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                {enlargedImageContext.currentIndex + 1} / {enlargedImageContext.images.length}
              </div>
            )}

            {/* 네비게이션 버튼 */}
            {enlargedImageContext && enlargedImageContext.images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              스크롤로 확대/축소 {imageScale > 1 && '• 드래그로 이동'} {enlargedImageContext && enlargedImageContext.images.length > 1 && imageScale <= 1 && '• 스와이프로 이동'} ({Math.round(imageScale * 100)}%)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
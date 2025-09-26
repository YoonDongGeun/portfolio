'use client';

import { useState } from 'react';
import ProjectModal from './components/ProjectModal';
import TechStackItem from './components/TechStackItem';
import { projectsData } from './data/projects';
import { skillsData } from './data/skills';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState('Frontend');
  const [activeProjectTab, setActiveProjectTab] = useState('개인 프로젝트');

  const openModal = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // 최근 1년 내 프로젝트인지 확인하는 함수 (끝난 날짜 기준)
  const isRecentProject = (period: string) => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

    // "현재 진행 중"인 경우 최근 프로젝트로 간주
    if (period.includes('현재 진행 중')) {
      return true;
    }

    // "YYYY.MM - YYYY.MM" 형태에서 끝난 날짜 추출
    const endDateMatch = period.match(/- (\d{4})\.(\d{2})/);
    if (!endDateMatch) return false;

    const endYear = parseInt(endDateMatch[1]);
    const endMonth = parseInt(endDateMatch[2]);
    const endDate = new Date(endYear, endMonth - 1, 1);

    return endDate >= oneYearAgo;
  };

  // 현재 운영/서비스 중인지 확인하는 함수
  const isLiveProject = (period: string) => {
    return period.includes('현재 진행 중');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">윤동근 포트폴리오</h1>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-white/80 hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="min-h-screen flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              안녕하세요.
              <br />
              개발자&nbsp;
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                윤동근
              </span>
              입니다
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              코드와 설계에 대해 함께 이야기하고 배우며<br/>
              개발자들과 사용자 모두에게 좋은 경험을 주고싶은 개발자입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                프로젝트 보기
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
              >
                연락하기
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">저는 누구인가요?</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  1년 6개월간 CRM, 이커머스 플랫폼을 개발했었습니다.
                  <br/>
                  현재는 개인 블로그를 제작 및 운영하며 경험을 쌓고 있습니다.
                </p>
                <p className="text-white/80 leading-relaxed">
                  저는 문제를 해결해내고 많은 보람을 느낍니다.
                  <br/>그래서 문제 해결 여부를 빠르게 확인할 수 있는 코딩을 시작했습니다.
                </p>
                 <br/>
                <p className="text-white/80 leading-relaxed">
                  서로에게 배우고 협력하여 더 나은 결과를 만들어갈 수 있으면 좋겠습니다.
                  <br/> 언제나 더 좋은 동료가 되기위해 노력하겠습니다.
                </p> 
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">경력</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 티맥스 비아이 (2023.07 - 2024.12)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">자격증</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 정보처리기사 (2024.06)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">교육</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• SSAFY 8기 수료 (2022.07 - 2023.06)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills</h2>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
              {skillsData.map((skillCategory) => (
                <button
                  key={skillCategory.category}
                  onClick={() => setActiveSkillTab(skillCategory.category)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all text-sm sm:text-base ${
                    activeSkillTab === skillCategory.category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {skillCategory.category === 'Frontend' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {skillCategory.category === 'Backend' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  )}
                  {skillCategory.category === 'Other' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {skillCategory.category}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 min-h-[200px]">
              {skillsData
                .filter((skillCategory) => skillCategory.category === activeSkillTab)
                .map((skillCategory) => (
                  <div key={skillCategory.category} className="flex flex-wrap gap-4 justify-center">
                    {skillCategory.skills.map((skill, index) => (
                      <TechStackItem
                        key={index}
                        iconSrc={skill.iconSrc}
                        alt={skill.alt}
                        name={skill.name}
                        bgColor={skill.bgColor || skillCategory.bgColor}
                        svgIcon={skill.svgIcon}
                      />
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-6 ">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Projects</h2>

            {/* 프로젝트 카테고리 탭 */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/20">
                {['개인 프로젝트', '회사 프로젝트', '사이드 프로젝트'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProjectTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeProjectTab === tab
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 프로젝트 목록 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData
                .filter((project) => project.category === activeProjectTab)
                .map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-colors cursor-pointer relative"
                  onClick={() => openModal(project)}
                >
                  {/* 프로젝트 배지들 */}
                  <div className="absolute top-4 right-4 z-10">
                    {isLiveProject(project.period) ? (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        LIVE
                      </span>
                    ) : isRecentProject(project.period) ? (
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        RECENT
                      </span>
                    ) : null}
                  </div>

                  {/* 썸네일 이미지 */}
                  {project.thumbnail && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} 썸네일`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <div className="mb-3 space-y-1">
                      <p className="text-blue-400 text-sm font-medium">{project.period}</p>
                      <p className="text-green-400 text-sm">{project.role}</p>
                    </div>
                    <p className="text-white/70 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => {
                        const colorClasses = [
                          'bg-blue-600/30 text-blue-300',
                          'bg-green-600/30 text-green-300',
                          'bg-purple-600/30 text-purple-300',
                          'bg-red-600/30 text-red-300',
                          'bg-yellow-600/30 text-yellow-300',
                          'bg-indigo-600/30 text-indigo-300'
                        ];
                        const colorClass = colorClasses[index % colorClasses.length];

                        return (
                          <span key={index} className={`px-3 py-1 ${colorClass} rounded-full text-sm`}>
                            {tech}
                          </span>
                        );
                      })}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-600/30 text-gray-300 rounded-full text-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-400 hover:text-blue-300 transition-colors">자세히 보기</span>
                      {project.id === 'personal-blog' && project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                        >
                          블로그 보러가기
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.id === 'chit-a-chat' && project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1"
                        >
                          GitHub 보기
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        <section id="contact" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Contact</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-white/70 mb-4">프로젝트 문의나 협업 제안을 환영합니다</p>
                <a
                  href="mailto:ehdrmsdi9999@naver.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  ehdrmsdi9999@naver.com
                </a>
              </div>

              {/* Location */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                <p className="text-white/70 mb-4">위치</p>
                <p className="text-green-400">서울, 대한민국</p>
              </div>

              {/* Connect with me */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Links</h3>
                <p className="text-white/70 mb-4">GitHub과 개인 블로그</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/YoonDongGeun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://yooncarrot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">함께 멋진 프로젝트를 만들어보시겠어요?</h3>
              <p className="text-white/70 mb-6">새로운 아이디어, 협업 제안, 또는 단순한 안녕 인사도 환영합니다!</p>
              <a
                href="mailto:ehdrmsdi9999@naver.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                이메일 보내기
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-white/60 border-t border-white/10">
        <p>&copy; 2025 윤동근(Yoon DongGeun). All rights reserved.</p>
      </footer>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        key={selectedProject?.id}
      />
    </div>
  );
}
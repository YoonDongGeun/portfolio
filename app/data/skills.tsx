export interface TechStack {
  iconSrc?: string;
  alt: string;
  name: string;
  bgColor?: string;
  svgIcon?: React.ReactNode;
}

export interface SkillCategory {
  category: string;
  bgColor: string;
  skills: TechStack[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    bgColor: 'bg-blue-600/30 text-blue-300',
    skills: [
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
        name: 'JavaScript'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        alt: 'TypeScript',
        name: 'TypeScript'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        alt: 'React',
        name: 'React'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        alt: 'Next.js',
        name: 'Next.js'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        alt: 'HTML5',
        name: 'HTML'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        alt: 'CSS3',
        name: 'CSS'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        alt: 'Tailwind CSS',
        name: 'Tailwind CSS'
      },
      {
        iconSrc: 'https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png',
        alt: 'Emotion',
        name: 'Emotion'
      },
      {
        iconSrc: 'https://raw.githubusercontent.com/pmndrs/zustand/refs/heads/main/examples/demo/public/logo192.png',
        alt: 'Zustand',
        name: 'Zustand'
      },
      {
        iconSrc: 'https://raw.githubusercontent.com/mobxjs/mobx/main/docs/assets/mobx.png',
        alt: 'MobX',
        name: 'MobX'
      },
      {
        iconSrc: 'https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg',
        alt: 'TanStack Query',
        name: 'TanStack Query'
      },
      {
        iconSrc: '/icon/motion.png',
        alt: 'Motion',
        name: 'Motion'
      }
    ]
  },
  {
    category: 'Backend',
    bgColor: 'bg-blue-600/30 text-blue-300',
    skills: [
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        alt: 'Java',
        name: 'Java'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
        alt: 'Spring Boot',
        name: 'Spring Boot'
      },
       {
        iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/springsecurity.svg',
        alt: 'Spring Security',
        name: 'Spring Security'
      },
      {
        iconSrc: 'https://www.svgrepo.com/show/303251/mysql-logo.svg',
        alt: 'MySQL',
        name: 'MySQL'
      },
           {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        alt: 'Redis',
        name: 'Redis'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
        alt: 'Nginx',
        name: 'Nginx'
      },
      {
        alt: 'JPA',
        name: 'JPA',
        svgIcon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        )
      },
      {
        alt: 'RESTful API',
        name: 'RESTful API',
        svgIcon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        )
      }
    ]
  },
  {
    category: 'Other',
    bgColor: 'bg-blue-600/30 text-blue-300',
    skills: [
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        alt: 'Git',
        name: 'Git'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        alt: 'Docker',
        name: 'Docker'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
        alt: 'Jenkins',
        name: 'Jenkins'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        alt: 'AWS',
        name: 'AWS'
      },
      {
        iconSrc: 'https://cursor.com/assets/images/logo.svg',
        alt: 'Cursor',
        name: 'Cursor'
      },
      {
        iconSrc: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        alt: 'Postman',
        name: 'Postman'
      },
      {
        iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        alt: 'Figma',
        name: 'Figma'
      }
    ]
  }
];
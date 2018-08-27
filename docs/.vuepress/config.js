module.exports = {
  title: 'Frontend-V',
  description: '前端面试集锦',
  base: '/interview/',
  dest: 'interview',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  serviceWorker: true,
  themeConfig: {
    // repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    nav: [
      {
        text: 'JavaScript',
        link: '/javascript/',
      },
      {
        text: 'CSS',
        link: '/css/'
      },
      {
        text: 'React',
        link: '/react/'
      },
      {
        text: '综合',
        link: '/comprehensive/'
      },
      {
        text: '工程化',
        link: '/engineer/'
      },
      {
        text: '算法',
        link: '/algorithms/'
      }
    ],
    sidebar: {
      '/engineer/': genSidebarConfig('前端工程化', ['webpack']),
      '/comprehensive/': genSidebarConfig('前端工程化', ['http', 'design-patterns']),
    }
  }
}

function genSidebarConfig (title, children) {
  return [
    {
      title,
      // collapsable: false,
      children: [
        '',
        ...children
      ]
    }
  ]
}

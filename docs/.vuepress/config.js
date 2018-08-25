module.exports = {
  title: 'Frontend-V',
  description: '前端面试集锦',
  // dest: 'vuepress',
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
      }
    ],
    sidebar: {
      // '/javascript': genSidebarConfig('JavaScript')
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

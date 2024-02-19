import defaultSettings from '@/settings'

const title = defaultSettings.title || '米娜小屋后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

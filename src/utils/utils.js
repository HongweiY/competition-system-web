export default {
  FormatDate(time, rule) {
    const date = new Date(time)
    let format = rule || 'YYYY-MM-DD HH:mm:ss'
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, date.getFullYear())
    }

    const option = {
      'M+': date.getMonth() + 1,
      'D+': date.getDay(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }

    Object.keys(option).forEach(k => {
      if (new RegExp(`(${k})`).test(format)) {
        const val = `${option[k]}`
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? val : `00${val}`.substring(val.length))
      }
    })
    return format
  },
  generateRoute(menuList) {
    const routes = []
    const deepList = list => {
      while (list.length) {
        const item = list.pop()
        if (item.action) {
          routes.push({
            name: item.component,
            path: item.path,
            meta: {
              title: item.menuName,
            },
            component: item.component,
          })
        }
        if (item.children && !item.action) {
          deepList(item.children)
        }
      }
    }
    deepList(menuList)
    return routes
  },
  fontSize(){
    let rootValue

    let agent = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(agent) {
      rootValue = 37.5
    } else {
      rootValue = 16
    }
    return rootValue
  }
}

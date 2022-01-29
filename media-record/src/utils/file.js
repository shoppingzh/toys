
/**
 * 下载文件
 * @param {String} url 文件地址
 * @param {String} filename 文件名
 */
export function download(url, filename) {
  const el = document.createElement('a')
  el.download = filename
  el.href = url
  el.style.display = 'none'
  el.click()
}

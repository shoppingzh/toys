import service from '@/service'

export function getSessionCode(token, params = {}) {
  return service({
    url: `/face/v1/faceliveness/sessioncode?access_token=${token}`,
    method: 'post',
    params
  })
}

export function verify(token, params = {}) {
  const fd = new FormData()
  Object.keys(params).forEach(name => {
    fd.append(name, params[name])
  })
  return service({
    url: `/face/v1/faceliveness/verify?access_token=${token}`,
    method: 'post',
    data: fd
  })
}
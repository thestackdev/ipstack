export async function getIpDetails(ip) {
  let url = 'https://ipapi.co/json'
  if (ip) url = `https://ipapi.co/${ip}/json`
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error === true) {
        throw { message: data.reason }
      }
      return { response: data }
    })
}

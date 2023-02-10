export async function getIpDetails(ip) {
  return fetch(`http://ip-api.com/json/${ip}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'fail') {
        throw { message: 'The IP Adress entered is not valid' }
      }
      return { response: data }
    })
}

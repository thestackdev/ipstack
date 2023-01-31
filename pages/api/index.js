import axios from 'axios'

export default async function handler(req, res) {
  try {
    let requestIp =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (req.query?.ip && req.query.ip?.length > 0) requestIp = req.query?.ip
    const response = await axios.get('http://ip-api.com/json/' + requestIp)
    if (response.data.status === 'fail') {
      res.status(400).send({ message: 'The IP Adress entered is not valid' })
      return
    }
    res.send(response.data)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(error?.response?.data?.message ?? 'Something went wrong')
  }
}

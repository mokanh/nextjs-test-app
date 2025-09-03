import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const jsonData = fs.readFileSync(filePath, 'utf8')
    const products = JSON.parse(jsonData)

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    console.error('Error reading products file:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
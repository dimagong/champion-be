import { adminStorage } from '../../util/admin'
import { getDownloadURL } from 'firebase-admin/storage'
import { Request, Response, NextFunction } from 'express'

const { BUCKET_VIDEO } = process.env

export const imgBestMoments = async (req: Request, res: Response) => {
    const imgFiles = await adminStorage
        .bucket(BUCKET_VIDEO)
        .getFiles({ prefix: 'img/', autoPaginate: false })
        .then(([files]) => files)

    const imgFilesPNG = imgFiles.filter(
        (file) => file.metadata.contentType === 'image/png'
    )

    const imgUrls = await Promise.all(
        imgFilesPNG.map(async (file) => {
            return {
                url: await getDownloadURL(file),
                name: file.name,
            }
        })
    )

    return res.status(200).json(imgUrls)
}

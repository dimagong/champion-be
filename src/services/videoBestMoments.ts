import { adminStorage } from '../util/admin.js'
import { getDownloadURL } from 'firebase-admin/storage'
import { Request, Response, NextFunction } from 'express'

const { BUCKET_VIDEO } = process.env

export const videoBestMoments = async (req: Request, res: Response) => {
    const videoFiles = await adminStorage
        .bucket(BUCKET_VIDEO)
        .getFiles({ prefix: 'video/', autoPaginate: false })
        .then(([files]) => files)

    const videoFilesMP4 = videoFiles.filter(
        (file) => file.metadata.contentType === 'video/mp4'
    )

    const videoUrls = await Promise.all(
        videoFilesMP4.map(async (file) => {
            return {
                url: await getDownloadURL(file),
                name: file.name,
            }
        })
    )

    return res.status(200).json(videoUrls)
}

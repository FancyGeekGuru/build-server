import { S3Model } from './S3Model'
import { S3Type } from './types'

export class S3AssetPack extends S3Model {
  constructor(id: string) {
    super(id, S3Type.ASSET_PACK)
  }

  getThumbnailFilename() {
    return `${this.id}.png`
  }

  getFolder(): string {
    return this.type
  }
}

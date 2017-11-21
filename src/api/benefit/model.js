import mongoose, { Schema } from 'mongoose'

const benefitSchema = new Schema({
  description: {
    type: String
  },
  title: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

benefitSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      description: this.description,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Benefit', benefitSchema)

export const schema = model.schema
export default model

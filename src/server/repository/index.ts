import { Document, Model } from 'mongoose'

export class Repository<T> {
  model: Model<T & Document>

  constructor(schemaModel: () => Model<T & Document>) {
    this.model = schemaModel()
  }

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }

  async edit(id: string, data: Partial<T>): Promise<T> {
    const dataToEdit = await this.model.findById(id)
    if (!dataToEdit) {
      throw new Error('Data not found')
    }
    Object.assign(dataToEdit, data)
    return dataToEdit.save()
  }

  async delete(id: string): Promise<T> {
    const dataToDelete = await this.model.findById(id)
    if (!dataToDelete) {
      throw new Error('Data not found')
    }
    return dataToDelete.remove()
  }

  query(
    // tslint:disable-next-line:no-any
    conditions?: any,
    // tslint:disable-next-line:no-any
    projection?: any | null,
    // tslint:disable-next-line:no-any
    options?: any | null
  ) {
    return this.model.find(conditions, projection, options)
  }

  // tslint:disable-next-line:no-any
  async count(conditions?: any): Promise<number> {
    return this.model.count(conditions)
  }

  // tslint:disable-next-line:no-any
  async any(conditions?: any): Promise<boolean> {
    return (await this.count(conditions)) > 0
  }

  async list(
    // tslint:disable-next-line:no-any
    conditions?: any,
    // tslint:disable-next-line:no-any
    projection?: any | null,
    // tslint:disable-next-line:no-any
    options?: any | null
  ): Promise<T[]> {
    return this.query(conditions, projection, options)
  }

  async single(
    // tslint:disable-next-line:no-any
    conditions: any,
    // tslint:disable-next-line:no-any
    projection?: any | null,
    // tslint:disable-next-line:no-any
    options?: any | null
  ): Promise<T | null> {
    return this.model.findOne(conditions, projection, options)
  }

  async insertMany(docs: T[]) {
    return this.model.insertMany(docs)
  }
}

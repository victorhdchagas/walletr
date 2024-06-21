export default abstract class SerializableEntity<T extends object> {
  toJSON(): T {
    if ('props' in this) return JSON.parse(JSON.stringify(this.props))
    return JSON.parse(JSON.stringify({ ...this, toJSON: undefined }))
  }
}

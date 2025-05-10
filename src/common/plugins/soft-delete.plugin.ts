import { Schema } from 'mongoose';

export function softDeletePlugin(schema: Schema) {
  schema.add({ deleted: { type: Boolean, default: false } });

  schema.pre('find', function () {
    this.where({ deleted: false });
  });

  schema.pre('findOne', function () {
    this.where({ deleted: false });
  });

  schema.pre('findOneAndUpdate', function () {
    this.where({ deleted: false });
  });

  schema.pre('countDocuments', function () {
    this.where({ deleted: false });
  });

  schema.methods.softDelete = async function () {
    this.deleted = true;
    await this.save();
  };

  schema.post('find', function (docs) {
    docs.forEach((doc) => {
      if (doc.populate && typeof doc.populated === 'function') {
        const populatedPaths = doc.populated();
        if (populatedPaths) {
          const paths = Object.keys(populatedPaths);
          paths.forEach((path) => {
            const related = doc[path];
            if (Array.isArray(related)) {
              doc[path] = related.filter((item) => !item.deleted);
            } else if (related?.deleted) {
              doc[path] = null;
            }
          });
        }
      }
    });
  });

}
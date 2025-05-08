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
      if (doc.populate) {
        const paths = Object.keys(doc.populated());
        paths.forEach((path) => {
          if (Array.isArray(doc[path])) {
            doc[path] = doc[path].filter((item) => !item.deleted);
          } else if (doc[path]?.deleted) {
            doc[path] = null;
          }
        });
      }
    });
  });
}
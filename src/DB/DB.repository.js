export const findOne = async ({
  model,
  filter = {},
  select = "",
  options = {},
}) => {
  let doc = model.findOne(filter);
  if (select.length) doc = doc.select(select);
  if (options.populate) doc = doc.populate(options.populate);
  if (options.lean) doc = doc.lean(options.lean);

  return await doc.exec();
};

export const findById = async ({ model, id, select = "", options = {} }) => {
  let doc = model.findById(id);
  if (select.length) doc = doc.select(select);
  if (options.populate) doc = doc.populate(options.populate);
  if (options.lean) doc = doc.lean(options.lean);

  return await doc.exec();
};
export const find = async ({
  model,
  filter = {},
  select = "",
  options = {},
}) => {
  let doc = model.find(filter);
  if (select.length) doc = doc.select(select);
  if (options.populate) doc = doc.populate(options.populate);
  if (options.lean) doc = doc.lean(options.lean);
  if (options.limit) doc = doc.limit(options.limit);
  if (options.skip) doc = doc.skip(options.skip);
  return await doc.exec();
};

export const create = async ({
  model,
  data,
  options = { validatorbeforeSave: true },
}) => {
  return await model.create(data);
};

export const updateOne = async ({ model, filter = {}, data, options }) => {
  await model.updateOne(
    filter,
    { ...data, $inc: { __v: 1 } },
    { ...options, runValidators: true },
  );
};
export const updateMany = async ({ model, filter = {}, data, options }) => {
  await model.updateMany(
    filter,
    { ...data, $inc: { __v: 1 } },
    { ...options, runValidators: true },
  );
};
export const findOneAndUpdate = async ({
  model,
  filter = {},
  data,
  options = {},
}) => {
  await model.findOneAndUpdate(
    filter,
    { ...data, $inc: { __va: 1 } },
    { ...options, runValidators: true, new: true },
  );
};
export const findByIdAndUpdate = async ({ model, id, data, options = {} }) => {
  await model.findOneAndUpdate(
    id,
    { ...data, $inc: { __va: 1 } },
    { ...options, runValidators: true, new: true },
  );
};
export const findOneAndReplace = async ({
  model,
  filter = {},
  data,
  options = {},
}) => {
  await model.findOneAndReplace(
    filter,
    { ...data, $inc: { __va: 1 } },
    { ...options, runValidators: true, new: true },
  );
};

export const deleteOne = async ({ model, filter = {} }) => {
  await model.deleteOne(filter);
};

export const deleteMany = async ({ model, filter = {} }) => {
  await model.deleteMany(filter);
};

export const findOneAndDelete = async ({ model, filter = {} }) => {
  await model.findOneAndDelete(filter);
};
export const findByIdAndDelete = async ({ model, id }) => {
  await model.findByIdAndDelete(id);
};

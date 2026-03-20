export const findOne = async (data) => {
  const { model, filter } = data;
  const result = await model.findOne(filter);

  return result;
};

export const find = async (data) => {
  const { model, filter } = data;
  const result = await model.find(filter);

  return result;
};

export const insertOne = async (data) => {
  const { model, filter } = data;
  const result = await model.insertOne(filter);

  return result;
};

export const findByIdAndDelete = async (data) => {
  const { model, filter } = data;
  const result = await model.findByIdAndDelete(filter);

  return result;
};

export const findByIdAndUpdate = async (data) => {
  const {model, id, filter, option} = data;
  const result = await model.findByIdAndUpdate(id, filter, option);

  return result;
}
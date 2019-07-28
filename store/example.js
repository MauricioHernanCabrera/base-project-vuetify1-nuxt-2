const basePath = 'type_of_jobs';

export const actions = {
  getAll({ queryParams }) {
    return this.$axios.$get(`/${basePath}/`);
  },

  getOne({}, { queryParams, pathParams }) {
    return this.$axios.$get(`/${basePath}/${pathParams._id}/`);
  },

  createOne({}, { bodyData, pathParams }) {
    return this.$axios.$post(`/${basePath}/`, bodyData);
  },

  deleteOne({}, { pathParams }) {
    return this.$axios.$delete(`/${basePath}/${pathParams._id}/`);
  },

  updateOne({}, { bodyData, pathParams }) {
    return this.$axios.$patch(`/${basePath}/${pathParams._id}/`, bodyData);
  }
};

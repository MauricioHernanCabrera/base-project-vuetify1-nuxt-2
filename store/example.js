const basePath = 'type_of_jobs';

export const actions = {
  getAll({ queryParams }) {
    return this.$axios.$get(`/${basePath}/`);
  },

  getOne({}, { queryParams, pathParams }) {
    return this.$axios.$get(`/${basePath}/${pathParams._id}/`);
  },

  createOne({}, { body, pathParams }) {
    return this.$axios.$post(`/${basePath}/`, body);
  },

  deleteOne({}, { pathParams }) {
    return this.$axios.$delete(`/${basePath}/${pathParams._id}/`);
  },

  updateOne({}, { body, pathParams }) {
    return this.$axios.$patch(`/${basePath}/${pathParams._id}/`, body);
  }
};

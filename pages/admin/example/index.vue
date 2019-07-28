<template>
  <v-container>
    <core-toolbar-admin title="Examples">
      <v-toolbar-items>
        <v-btn
          flat
          @click="
            setDialog({
              title: 'Create example',
              active: 'create-or-update'
            })
          "
        >
          <v-icon :left="!$vuetify.breakpoint.xs">mdi-plus</v-icon>
          <span class="hidden-xs-only">Example</span>
        </v-btn>
      </v-toolbar-items>
    </core-toolbar-admin>

    <v-layout>
      <v-flex xs12>
        <v-list two-line>
          <v-list-tile v-if="array.length == 0">
            <v-list-tile-content>
              <v-list-tile-title>Items not yet loaded</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-else v-for="item in array" :key="item._id">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-layout>
                <v-btn
                  icon
                  ripple
                  @click="
                    setDialog({
                      title: 'Delete example',
                      data: item,
                      nameBtnSubmit: 'delete',
                      active: 'delete'
                    })
                  "
                >
                  <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                </v-btn>
                <div class="mx-1"></div>
                <v-btn
                  icon
                  ripple
                  @click="
                    setDialog({
                      title: 'Update example',
                      data: item,
                      nameBtnSubmit: 'update',
                      active: 'create-or-update'
                    })
                  "
                >
                  <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <form-type-of-country
      :data="dialog.data"
      :active="dialog.active == 'create-or-update'"
      :title="dialog.title"
      :loading="loading"
      :nameBtnSubmit="dialog.nameBtnSubmit"
      @cancel-form="cancelDialog"
      @submit-form="submitForm"
    />

    <form-delete
      :data="dialog.data"
      :active="dialog.active == 'delete'"
      :title="dialog.title"
      :loading="loading"
      :nameBtnSubmit="dialog.nameBtnSubmit"
      @cancel-form="cancelDialog"
      @submit-form="deleteItem"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import sendRequest from '@/mixins/sendRequest';
import handleForm from '@/mixins/handleForm';

export default {
  mixins: [sendRequest, handleForm],

  async asyncData({ store }) {
    let array = [];
    try {
      const res = await store.dispatch('example/getAll');
      array = res.data;
    } catch (error) {
      store.dispatch('notification/handleError', error);
    } finally {
      return {
        array
      };
    }
  },

  methods: {
    ...mapActions('example', ['createOne', 'deleteOne', 'updateOne']),

    async submitForm({ newValue, updateValue }) {
      const callbackTry = async () => {
        if (newValue) {
          const { data, message } = await this.createOne({
            body: newValue
          });
          this.array.push(data);
          return { message };
        } else {
          const { data, message } = await this.updateOne({
            body: {
              name: updateValue.name
            },
            pathParams: { _id: updateValue._id }
          });
          const index = this.array.findIndex(({ _id }) => _id === data._id);
          this.array.splice(index, 1, data);
          return { message };
        }
      };

      await this.sendRequest({ callbackTry });
    },

    async deleteItem(dataDelete) {
      const callbackTry = async () => {
        const { data, message } = await this.deleteOne({
          pathParams: dataDelete
        });
        const index = this.array.findIndex(({ _id }) => _id === data._id);

        this.array.splice(index, 1);

        return { message };
      };

      await this.sendRequest({ callbackTry });
    }
  }
};
</script>

<style></style>

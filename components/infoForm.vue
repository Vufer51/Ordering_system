<template>
  <v-form>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <v-text-field label="ФИО" :rules="[rules.required]"/>
            <v-text-field label="Должность" :rules="[rules.required]"/>
            <v-text-field label="Отдел/участок"/>
            <v-text-field label="Контактный телефон"/>
            <v-text-field label="E-mail" :rules="[rules.required, rules.email]"/>
          </v-col>
          <v-col>
            <v-select
              label="Тип техники"
              :items="techTypes"
              :rules="[rules.required]"
            />
            <v-select
              label="Характер работ"
              :items="['Техническое обслуживание','Диагностика', 'Ремонт']"
              multiple
              v-model="dataWorks"
              :rules="[rules.notEmptyArray]"

            />
            <v-row>
              <v-col>
                <v-text-field label="Модель"/>
                <v-text-field label="Заводской №"/>
              </v-col>
              <v-col>
                <v-combobox
                  label="Год выпуска"
                  :items="years"
                  :rules="[rules.notFuture]"
                />
                <v-file-input
                  @change="previewImages"
                  v-model="images"
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Фотографии"
                >
                </v-file-input>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(image, n) in imageUrls"
            :key="n"
            class="d-flex child-flex"
            cols="3"
          >
            <v-img
              aspect-ratio="1"
              :src="image"
            >
              <v-btn
                class="mt-2" small
                elevation="2"
                @click="removeImage(n)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'infoForm',
  data () {
    return {
      images: null,
      imageUrls: [],
      dataWorks: [],
      currentYear: new Date().getFullYear(),
      techTypes: [
        'Кран',
        'КМУ',
        'Другое'
      ],
      years: [],
      rules: {
        required: value => !!value || 'Поле обязательно.',
        notEmptyArray: value => value.length > 0 || 'Должны быть выбраны работы',
        notFuture: value => value <= this.currentYear || 'Вы из будущего?',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail.'
        },
      },
    }
  },
  created () {

    for (let x = this.currentYear; x > 1950; x--) {
      this.years.push(x)
    }

  },
  methods: {
    removeImage(n) {
      this.images.splice(n,1)
      this.imageUrls.splice(n,1)
    },
    previewImages () {
      this.images.forEach(image => {
        this.imageUrls.push(URL.createObjectURL(image))
      })
    }
  }
}
</script>

<style scoped>

</style>

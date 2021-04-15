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
              </v-col>
              <v-col>
                <v-combobox
                  label="Год выпуска"
                  :items="years"
                  :rules="[rules.notFuture]"
                ></v-combobox>
                {{dataWorks}}
              </v-col>
            </v-row>

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'infoForm',
  data() {
    return {
      dataWorks:[],
      currentYear: new Date().getFullYear(),
      techTypes: [
        'Кран',
        'КМУ',
        'Другое'
      ],
      years: [],
      rules: {
        required: value => !!value || 'Поле обязательно.',
        notEmptyArray: value => value.length>0 || 'Должны быть выбраны работы',
        notFuture: value => value <= this.currentYear || 'Вы из будущего?',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail.'
        },
      },
    }
  },
  created() {

    for (let x = this.currentYear; x > 1950; x--) {
      this.years.push(x)
    }


  }
}
</script>

<style scoped>

</style>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="text-center">
      <h3>Заявка на проведение работ</h3>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="selected"
            :search-input.sync="clientName"
            :items="suggestions"
            item-text="value"
            item-value="data.inn"
            label="Название организации"
            hide-no-data
            :loading="loading"
            autofocus
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" order="2" order-md="1">
          <info-form/>
        </v-col>
        <v-col cols=12 md="6" order="1" order-md="2" v-if="selected!=''">
          <v-card>
            <v-card-title>
              {{selectedInfo.data.name.full_with_opf}}
            </v-card-title>
            <v-card-subtitle align="left">ИНН: {{selectedInfo.data.inn}}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>Адрес: {{selectedInfo.data.address.value}}</v-col>
                <v-col v-if="selectedInfo.data.management">Руководитель: {{selectedInfo.data.management.name}}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {

  data () {
    return {
      counter: 0,
      clientName: '',
      selected: '',
      selectedInfo: null,
      suggestions: [],
      loading: false
    }
  },
  watch: {
    clientName (val) {
      if (this.clientName && this.clientName.length > 4) {
        this.GetSuggestions()
      }
    },
    selected () {
      this.selectedInfo = this.suggestions.find((item) => {
        return item.data.inn === this.selected
      })
    }
  },
  methods: {
    async GetSuggestions () {
      this.loading = true
      await this.$axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
        {
          query: this.clientName,
          count: 5
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token 8119523ffc6f97f59bff4243be6fc7a9656c14ce'
          }
        }
      ).then((response) => {
        this.loading = false
        this.suggestions = response.data.suggestions
      })
    },
    suggStatus (sugg) {
      let status = ''
      switch (sugg.data.state.status) {
        case 'ACTIVE':
          status = 'Действует'
          break
        case 'LIQUIDATING':
          status = 'Ликвидируется'
          break
        case 'LIQUIDATED':
          status = 'Ликвидировано'
          break
        case 'REORGANIZING':
          status = 'Реорганизация с ликвидацией'
          break
      }
      return status
    }
  }
}
</script>

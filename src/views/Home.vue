<template>
  <div class="pt-5 text-center">
    <h2>Предзапись на учебный проект для новичков в PHP</h2>
    <p class="lead">
      Оставьте ваш контакт и напишите немного о своем опыте.<br>
      В ближайшие пару недель я свяжусь с вами и расскажу о подробностях учебного проекта.
    </p>
  </div>

  <form>
    <div class="row g-3 mb-3">

      <div class="col-12">
        <label for="telegram" class="form-label">
          Telegram <span class="text-muted">*</span>
        </label>
        <input type="text" class="form-control" id="telegram" placeholder="@никнейм или номер телефона" required
               v-model="telegram">
      </div>

      <div class="col-12">
        <label for="about" class="form-label">
          Расскажите о вашем опыте в PHP <span class="text-muted">*</span>
        </label>
        <textarea class="form-control" id="about" rows="3" v-model="about"></textarea>
      </div>
    </div>

    <div role="alert"
         v-if="alert !== null"
         v-bind:class="['alert', alertClass]">
      {{ alert }}
    </div>

    <button class="w-100 btn btn-primary btn-lg" @click.prevent="submit" :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Записаться
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isError: false,
      alert: null,
      isLoading: false,
      telegram: '',
      about: ''
    }
  },
  computed: {
    alertClass() {
      return this.isError ? 'alert-danger' : 'alert-success'
    }
  },
  methods: {
    clearAlert() {
      this.alert = null;
    },
    success(message) {
      this.alert = message;
      this.isError = false;
    },
    error(message) {
      this.alert = message;
      this.isError = true;
    },
    submit() {
      if (this.isLoading) {
        return;
      }

      this.clearAlert();
      if (!this.telegram) {
        this.error('Укажите ваш Telegram для связи');
        return;
      }

      if (!this.about) {
        this.error('Опишите ваш опыт в двух словах');
        return;
      }

      this.isLoading = true;
      this.axios.post(
          '/api/v1/submitForm',
          {
            telegram: this.telegram,
            about: this.about
          }
      )
          .then((response) => {
            if (!response.data.success) {
              throw new Error();
            }

            this.success('Ваши контакты сохранены, спасибо!')
          })
          .catch(() => {
            this.error('Что-то пошло не так, повторите позже :(');
          })
          .finally(() => {
            this.isLoading = false;
          });
    }
  }
}
</script>
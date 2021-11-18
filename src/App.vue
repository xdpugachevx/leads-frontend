<template>
  <div class="container">
    <main>
      <Home/>
    </main>
  </div>
</template>

<script>
import Home from './views/Home';

export default {
  components: {Home}
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

.container {
  max-width: 660px;
}
</style>
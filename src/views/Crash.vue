<template>
  <div class="crash">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 crash-block">
          <div class="element-container">
            <div class="crash-element">

            </div>
            <div class="crash-navigation">
              <div class="form-row">
                <div class="form-group col-md-4 m0">
                  <input class="form-control input-stake" type="number" placeholder="Ваша ставка">
                </div>
                <div class="form-group col-md-8 m0">
                  <div class="buttons-right">
                    <button @click="prevent.default(toggleGame)" type="button" class="btn btn-success" v-if="!gameInProcess">Ставка</button>&nbsp
                    <button @click="prevent.default(toggleGame)" type="button" class="btn btn-danger" v-if="gameInProcess">Выход</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 crash-block">
          <div class="element-container">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      gameInProcess: false,
    }),
    methods: {
      toggleGame() {
        this.gameInProcess = !this.gameInProcess;
      },
    },
  }
</script>

<style scoped>
  .crash-block {
    padding: 5px;
  }

  .element-container {
    background-color: #faf6f2;
    width: 100%;
    height: 500px;
    padding: 10px;
  }

  .crash-element {
    background-color: #c4f2d5;
    width: 100%;
    height: 420px;
    margin-bottom: 10px;
  }

  .crash-navigation {
    background-color: #c4f2d5;
    width: 100%;
    padding: 7px;
  }

  .buttons-right {
    float: right;
  }

  .m0 {
    margin: 0;
  }
</style>

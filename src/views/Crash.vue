<template>
  <div class="crash">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 crash-block">
          <div class="element-container">
            <div class="element-header">
              <p class="font3">Crash - график</p>
            </div>
            <div class="crash-element">
              <div class="crash-number-container">
                <span class="crash-number">{{counter}}</span>
              </div>
            </div>
            <div class="crash-navigation">
              <div class="form-row">
                <div class="form-group col-md-4 m0">
                  <input
                    class="form-control input-stake"
                    type="number"
                    placeholder="Ваша ставка"
                    v-model="stake"
                    min="0"
                  >
                </div>
                <div class="form-group col-md-8 m0">
                  <div class="buttons-right">
                    <div v-if="!gameInProcess && !inGame">
                      <button
                        v-if="!afterGame"
                        @click="makeStake"
                        type="button"
                        class="btn btn-success"
                      >Ставка</button>
                    </div>
                    <div v-else-if="!gameInProcess && inGame">
                    </div>
                    <div v-else-if="gameInProcess && inGame">
                      <button
                        v-if="inGame"
                        @click="stopGame"
                        type="button"
                        class="btn btn-danger"
                      >Выход</button>
                    </div>
                    <div v-else>
                      <span>Идет игра</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4 crash-block">
          <div class="element-container">
            <div class="element-header">
              <p>В игре:</p>
            </div>
            <div class="o-y-s">
              <ul>
                <li
                  v-for="player in in_game"
                  v-bind:key="player.email"
                  class="last-game-entity"
                >
                  <span>{{player.email}} - {{player.rub}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-2 crash-block">
          <div class="element-container">
            <div class="element-header">
              <p>Последние игры:</p>
            </div>
            <div class="o-y-s">
              <ul>
                <li
                  v-for="game in last_games"
                  :key="game._id"
                  class="last-game-entity"
                >
                  <span v-if="game.last > 1.99" style="color: green;">{{game.last}}</span>
                  <span v-else style="color: red;">{{game.last}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  props: ['user'],
  data: () => ({
    gameInProcess: true,
    counter: 'Ждем...',
    last_games: [],
    in_game: [],
    socket: io('localhost:3001'),
    stake: 0,
    inGame: false,
    afterGame: false,
  }),
  methods: {
    toggleGame() {
      // this.gameInProcess = !this.gameInProcess;
    },
    makeStake() {
      if (!this.gameInProcess) {
        if (this.stake === 0) {
          this.toggleAlert('Ставка должна быть больше 0');
        } else {
          const { stake } = this;
          this.inGame = !this.inGame;
          this.socket.emit('stake', { id: this.socket.id, stake: parseInt(stake, 10), email: this.$props.user.email });
        }
      } else {
        this.toggleAlert('Игра уже идет!');
      }
    },
    toggleAlert(message) {
      alert(message);
    },
    stopGame() {
      this.socket.emit('stopGame', {
        id: this.socket.id,
        email: this.$props.user.email,
      });
    },
  },
  mounted() {
    this.socket.on('connection', () => {
      this.counter = 'Ожидаем...';
    });
    this.socket.on('tick', (ticker) => {
      if (ticker.crash) {
        this.inGame = false;
      }
      if (ticker.failed) {
        this.afterGame = true;
      }
      if (ticker.waiting) {
        this.afterGame = false;
      }
      this.counter = ticker.current;
      this.gameInProcess = ticker.inProcess;
    });
    this.socket.on('succeedStake', () => {

    });
    this.socket.on('ingamerefresh', (obj) => {
      this.in_game = obj;
    });
    this.socket.on('lastgamesupdate', (games) => {
      this.last_games = games;
    });
  },
};
</script>

<style scoped>
  .crash-block {
    padding: 5px;
  }

  .element-header {
    background-color: #c4f2d5;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    position: relative;
  }

  .element-container {
    background-color: #faf6f2;
    width: 100%;
    height: 450px;
    padding: 10px;
  }

  .crash-element {
    background-color: #c4f2d5;
    width: 100%;
    height: 310px;
    margin-bottom: 10px;
    position: relative;
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

  .crash-number-container {
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 20%;
    margin: auto;
  }

  .crash-number-container {
    font-size: 35px;
  }

  .last-game-entity {
    margin: 0;
  }

  .crash-header {

  }

  .o-y-s {
    overflow-y: scroll;
  }

</style>

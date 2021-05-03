const attackNumRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMasseges: [],
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth <= 0) {
                return { width: "0%" };
            } else {
                return { width: this.monsterHealth + "%" };
            }
        },
        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return { width: "0%" };
            } else {
                return { width: this.playerHealth + "%" };
            }
        },
        maySpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value < 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        },
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMasseges = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackvalue = attackNumRandom(5, 12);
            this.monsterHealth -= attackvalue;
            this.addlogMassege("player", "attack", attackvalue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackvalue = attackNumRandom(8, 15);
            this.playerHealth -= attackvalue;
            this.addlogMassege("monster", "attack", attackvalue);
        },
        specialAttack() {
            this.currentRound++;
            const attackvalue = attackNumRandom(10, 20);
            this.monsterHealth -= attackvalue;
            this.addlogMassege("player", "attack", attackvalue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = attackNumRandom(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addlogMassege("player", "heal", healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = "monster";
        },
        addlogMassege(who, what, value) {
            this.logMasseges.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        },
    },
});
app.mount("#game");